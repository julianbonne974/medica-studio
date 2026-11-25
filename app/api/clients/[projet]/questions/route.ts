import type { NextRequest } from "next/server";
import { chargerProjet } from "@/lib/clients/projets";
import { empreinteIp, ipDeLaRequete, origineAcceptable } from "@/lib/clients/securite";
import { nomCookie, sessionProjet } from "@/lib/clients/session";
import {
  ReponseRefusee,
  chargerQuestionnaire,
  ecrireDossier,
  lireDossier,
  validerReponses,
} from "@/lib/clients/questionnaires";
import { BORNES, type DossierReponses } from "@/lib/clients/questionnaire-modele";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Envois gardés par personne : au-delà, les plus anciens sont oubliés. */
const ENVOIS_MAX = 50;

function json(statut: number, corps: Record<string, unknown>) {
  return Response.json(corps, {
    status: statut,
    headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}

// Anti-rafale par instance de fonction : l'enregistrement automatique part au plus toutes les
// 1,5 s pendant la saisie, d'où une limite large (90 écritures par minute et par IP et prénom).
const rafales = new Map<string, number[]>();
const RAFALE_MAX = 90;

function rafale(cle: string) {
  const maintenant = Date.now();
  const recents = (rafales.get(cle) ?? []).filter((t) => maintenant - t < 60_000);
  if (recents.length >= RAFALE_MAX) return true;
  recents.push(maintenant);
  rafales.set(cle, recents);
  if (rafales.size > 5000) rafales.clear();
  return false;
}

async function contexte(request: NextRequest, params: Promise<{ projet: string }>) {
  const { projet: slug } = await params;
  if (!chargerProjet(slug)) return { erreur: json(404, { erreur: "introuvable" }) };
  const session = sessionProjet(slug, request.cookies.get(nomCookie(slug))?.value);
  if (!session) return { erreur: json(401, { erreur: "session" }) };
  const chargement = chargerQuestionnaire(slug);
  if (chargement.etat === "absent") return { erreur: json(404, { erreur: "questionnaire" }) };
  if (chargement.etat === "invalide") return { erreur: json(503, { erreur: "contenu" }) };
  return { erreur: null, slug, session, questionnaire: chargement.questionnaire };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ projet: string }> }) {
  const c = await contexte(request, params);
  if (c.erreur) return c.erreur;
  const dossier = await lireDossier(c.slug, c.questionnaire, c.session.n);
  return json(200, {
    questionnaire: c.questionnaire.id,
    reponses: dossier?.reponses ?? {},
    majLe: dossier?.majLe ?? null,
    envois: dossier?.envois ?? [],
  });
}

/**
 * Remplace les réponses de la personne connectée. Corps : { reponses, envoyer? }.
 * « envoyer: true » ajoute la date du jour aux envois (on peut renvoyer autant de fois qu'on veut).
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ projet: string }> }) {
  if (!origineAcceptable(request)) return json(403, { erreur: "origine" });
  const c = await contexte(request, params);
  if (c.erreur) return c.erreur;

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json(415, { erreur: "type" });
  }
  if (Number(request.headers.get("content-length") ?? "0") > BORNES.corps) return json(413, { erreur: "taille" });
  const brut = await request.text();
  if (Buffer.byteLength(brut, "utf8") > BORNES.corps) return json(413, { erreur: "taille" });

  if (rafale(`${empreinteIp(ipDeLaRequete(request.headers))}:${c.session.n.toLocaleLowerCase("fr")}`)) {
    return json(429, { erreur: "rafale" });
  }

  let donnees: Record<string, unknown>;
  try {
    donnees = JSON.parse(brut);
  } catch {
    return json(400, { erreur: "json" });
  }
  if (!donnees || typeof donnees !== "object" || Array.isArray(donnees)) return json(400, { erreur: "json" });
  if (donnees.envoyer !== undefined && typeof donnees.envoyer !== "boolean") {
    return json(400, { erreur: "reponse", detail: "envoyer : true ou false attendu" });
  }

  let reponses;
  try {
    reponses = validerReponses(c.questionnaire, donnees.reponses ?? {});
  } catch (err) {
    if (err instanceof ReponseRefusee) return json(400, { erreur: "reponse", detail: err.message });
    throw err;
  }

  const precedent = await lireDossier(c.slug, c.questionnaire, c.session.n);
  const maintenant = new Date().toISOString();
  const envois = [...(precedent?.envois ?? []), ...(donnees.envoyer ? [maintenant] : [])].slice(-ENVOIS_MAX);
  const dossier: DossierReponses = {
    prenom: c.session.n,
    reponses,
    majLe: maintenant,
    envois,
  };
  await ecrireDossier(c.slug, c.questionnaire, dossier);
  return json(200, { ok: true, majLe: dossier.majLe, envois: dossier.envois });
}
