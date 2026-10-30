import { cheminApiProjet, cheminProjet, empreinteConfiguree } from "./projets";
import {
  DUREE_SESSION_S,
  cookieSession,
  empreinteCode,
  lireSession,
  signerSession,
  type Session,
} from "./securite";

/**
 * Cookies de session.
 * Projet : `msc_<slug>`, posé deux fois avec la même valeur, sur `/clients/<slug>` (pages et
 * maquettes) et sur `/api/clients/<slug>` (envoi des retours). Rien n'est envoyé ailleurs.
 * Administration : `msc_admin`, sur `/clients/admin`.
 */

export const CHEMIN_ADMIN = "/clients/admin";
export const COOKIE_ADMIN = "msc_admin";

export function nomCookie(slug: string) {
  return `msc_${slug.replace(/-/g, "_")}`;
}

function cheminsProjet(slug: string) {
  return [cheminProjet(slug), cheminApiProjet(slug)];
}

export function ouvrirSessionProjet(slug: string, prenom: string): string[] {
  const maintenant = Math.floor(Date.now() / 1000);
  const valeur = signerSession({
    p: slug,
    n: prenom,
    k: empreinteCode(empreinteConfiguree(slug)),
    iat: maintenant,
    exp: maintenant + DUREE_SESSION_S,
  });
  return cheminsProjet(slug).map((c) => cookieSession(nomCookie(slug), valeur, c, DUREE_SESSION_S));
}

export function fermerSessionProjet(slug: string): string[] {
  return cheminsProjet(slug).map((c) => cookieSession(nomCookie(slug), "", c, 0));
}

export function sessionProjet(slug: string, valeur: string | undefined): Session | null {
  const s = lireSession(valeur);
  if (!s || s.p !== slug) return null;
  const empreinte = empreinteConfiguree(slug);
  if (!empreinte || s.k !== empreinteCode(empreinte)) return null;
  return s;
}

export function empreinteAdmin(): string | undefined {
  const v = process.env.CLIENT_ADMIN_CODE;
  return v && v.startsWith("scrypt:") ? v.trim() : undefined;
}

export function ouvrirSessionAdmin(): string {
  const maintenant = Math.floor(Date.now() / 1000);
  const duree = 12 * 60 * 60;
  const valeur = signerSession({
    p: "admin",
    n: "admin",
    k: empreinteCode(empreinteAdmin()),
    iat: maintenant,
    exp: maintenant + duree,
  });
  return cookieSession(COOKIE_ADMIN, valeur, CHEMIN_ADMIN, duree);
}

export function fermerSessionAdmin(): string {
  return cookieSession(COOKIE_ADMIN, "", CHEMIN_ADMIN, 0);
}

export function sessionAdmin(valeur: string | undefined): Session | null {
  const s = lireSession(valeur);
  if (!s || s.p !== "admin") return null;
  const empreinte = empreinteAdmin();
  if (!empreinte || s.k !== empreinteCode(empreinte)) return null;
  return s;
}

/** Réponse de redirection relative (303 après un POST, 307 sinon). */
export function rediriger(chemin: string, statut = 303, cookies: string[] = []) {
  const headers = new Headers({
    Location: chemin,
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  });
  for (const c of cookies) headers.append("Set-Cookie", c);
  return new Response(null, { status: statut, headers });
}
