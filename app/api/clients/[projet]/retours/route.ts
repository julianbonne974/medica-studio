import type { NextRequest } from "next/server";
import { chargerProjet } from "@/lib/clients/projets";
import { empreinteIp, ipDeLaRequete, navigateurAbrege, origineAcceptable } from "@/lib/clients/securite";
import { enregistrerRetour } from "@/lib/clients/journal";
import { nomCookie, sessionProjet } from "@/lib/clients/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TAILLE_MAX = 8 * 1024;
const TEXTE_MAX = 4000;

function json(statut: number, corps: Record<string, unknown>) {
  return Response.json(corps, {
    status: statut,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}

/** Retire les caractères de contrôle (sauf retours à la ligne et tabulations) et borne la longueur. */
function propre(valeur: unknown, max: number): string {
  if (typeof valeur !== "string") return "";
  return valeur
    .normalize("NFC")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, "")
    .trim()
    .slice(0, max);
}

// Anti-rafale très simple, par instance de fonction : 10 retours par minute et par IP.
const rafales = new Map<string, number[]>();

export async function POST(request: NextRequest, { params }: { params: Promise<{ projet: string }> }) {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  if (!projet) return json(404, { erreur: "introuvable" });
  if (!origineAcceptable(request)) return json(403, { erreur: "origine" });

  const session = sessionProjet(slug, request.cookies.get(nomCookie(slug))?.value);
  if (!session) return json(401, { erreur: "session" });

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json(415, { erreur: "type" });
  }
  const longueur = Number(request.headers.get("content-length") ?? "0");
  if (longueur > TAILLE_MAX) return json(413, { erreur: "taille" });

  const brut = await request.text();
  if (Buffer.byteLength(brut, "utf8") > TAILLE_MAX) return json(413, { erreur: "taille" });

  let donnees: Record<string, unknown>;
  try {
    donnees = JSON.parse(brut);
  } catch {
    return json(400, { erreur: "json" });
  }
  if (typeof donnees.texte === "string" && donnees.texte.trim().length > TEXTE_MAX) {
    return json(413, { erreur: "taille" });
  }
  const texte = propre(donnees.texte, TEXTE_MAX);
  if (!texte) return json(400, { erreur: "texte" });

  const ip = empreinteIp(ipDeLaRequete(request.headers));
  const maintenant = Date.now();
  const recents = (rafales.get(ip) ?? []).filter((t) => maintenant - t < 60_000);
  if (recents.length >= 10) return json(429, { erreur: "rafale" });
  rafales.set(ip, [...recents, maintenant]);

  const versions = new Set(projet.versions.map((v) => v.libelle));
  const version = propre(donnees.version, 20);

  await enregistrerRetour({
    projet: slug,
    prenom: session.n,
    page: propre(donnees.page, 300) || "non précisée",
    version: versions.has(version) ? version : "",
    texte,
    navigateur: navigateurAbrege(request.headers.get("user-agent")),
    empreinteIp: ip,
  });
  return json(201, { ok: true });
}
