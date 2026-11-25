import type { NextRequest } from "next/server";
import { chargerProjet, cheminProjet, empreinteConfiguree } from "@/lib/clients/projets";
import {
  empreinteIp,
  ipDeLaRequete,
  nettoyerPrenom,
  origineAcceptable,
  secretConfigure,
  verifierCode,
} from "@/lib/clients/securite";
import { blocageEnCours, effacerEchecs, noterEchec } from "@/lib/clients/journal";
import { ouvrirSessionProjet, rediriger } from "@/lib/clients/session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ projet: string }> }) {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  if (!projet) return new Response("Introuvable", { status: 404 });
  const accueil = cheminProjet(slug);
  // Pages où l'on revient après la connexion : liste fermée, jamais une adresse reçue telle quelle.
  let base = accueil;

  if (!origineAcceptable(request)) return new Response("Origine refusée", { status: 403 });
  if (!secretConfigure() || !empreinteConfiguree(slug)) return rediriger(`${accueil}?erreur=indisponible`);

  let prenom = "";
  let code = "";
  try {
    const form = await request.formData();
    if (form.get("suite") === "questions") base = `${accueil}/questions`;
    prenom = nettoyerPrenom(form.get("prenom"));
    code = String(form.get("code") ?? "").trim();
  } catch {
    return rediriger(`${accueil}?erreur=formulaire`);
  }

  const ip = empreinteIp(ipDeLaRequete(request.headers));
  if (await blocageEnCours(slug, ip)) return rediriger(`${base}?erreur=limite`);
  if (!prenom) return rediriger(`${base}?erreur=prenom`);

  const valide = code.length > 0 && (await verifierCode(code, empreinteConfiguree(slug)));
  if (!valide) {
    const restants = await noterEchec(slug, ip);
    return rediriger(restants > 0 ? `${base}?erreur=code&restants=${restants}` : `${base}?erreur=limite`);
  }

  await effacerEchecs(slug, ip);
  return rediriger(base, 303, ouvrirSessionProjet(slug, prenom));
}
