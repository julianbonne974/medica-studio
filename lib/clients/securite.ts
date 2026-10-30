import {
  createHmac,
  randomBytes,
  scrypt as scryptCb,
  timingSafeEqual,
  type ScryptOptions,
} from "node:crypto";

/**
 * Sécurité de l'espace clients : empreintes de codes (scrypt), sessions
 * signées (HMAC-SHA256), empreinte d'IP. Aucun code ni aucune IP en clair.
 *
 * Format d'empreinte (sans « $ » pour ne pas être développé par dotenv) :
 *   scrypt:<N>:<r>:<p>:<sel base64url>:<empreinte base64url>
 * Produit par `node scripts/hash-code.mjs <code>`.
 */

const SCRYPT_KEYLEN = 32;

function scrypt(code: string, sel: Buffer, keylen: number, options: ScryptOptions) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCb(code.normalize("NFKC"), sel, keylen, options, (err, cle) =>
      err ? reject(err) : resolve(cle),
    );
  });
}

function b64url(buf: Buffer) {
  return buf.toString("base64url");
}

/** Empreinte factice, utilisée pour garder un temps de réponse constant quand aucun code n'est configuré. */
const EMPREINTE_FACTICE = `scrypt:16384:8:1:${b64url(randomBytes(16))}:${b64url(randomBytes(32))}`;

/** Vérifie un code contre son empreinte, en temps constant. */
export async function verifierCode(code: string, empreinte: string | undefined): Promise<boolean> {
  const configuree = typeof empreinte === "string" && empreinte.startsWith("scrypt:");
  const valeur = configuree ? empreinte.trim() : EMPREINTE_FACTICE;
  const parties = valeur.split(":");
  if (parties.length !== 6) return false;
  const [, nStr, rStr, pStr, selB64, attenduB64] = parties;
  const N = Number(nStr);
  const r = Number(rStr);
  const p = Number(pStr);
  if (![N, r, p].every((x) => Number.isInteger(x) && x > 0) || N > 2 ** 20) return false;
  const sel = Buffer.from(selB64, "base64url");
  const attendu = Buffer.from(attenduB64, "base64url");
  if (sel.length < 16 || attendu.length !== SCRYPT_KEYLEN) return false;
  const obtenu = await scrypt(code.slice(0, 200), sel, SCRYPT_KEYLEN, {
    N,
    r,
    p,
    maxmem: 128 * N * r * 2,
  });
  return timingSafeEqual(obtenu, attendu) && configuree;
}

function secret(): string {
  const s = process.env.CLIENT_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "CLIENT_SESSION_SECRET absent ou trop court (32 caractères au moins). Voir CLIENTS.md.",
    );
  }
  return s;
}

export function secretConfigure(): boolean {
  const s = process.env.CLIENT_SESSION_SECRET;
  return Boolean(s && s.length >= 32);
}

function hmac(donnee: string, contexte: string): Buffer {
  return createHmac("sha256", secret()).update(`${contexte}\u0000${donnee}`).digest();
}

/** Empreinte courte et stable d'une IP (HMAC avec le secret de session) : jamais l'IP en clair. */
export function empreinteIp(ip: string): string {
  return hmac(ip || "inconnue", "ip").toString("hex").slice(0, 16);
}

/** Empreinte courte du code configuré : changer le code révoque les sessions ouvertes. */
export function empreinteCode(empreinte: string | undefined): string {
  return hmac(empreinte ?? "", "code").toString("base64url").slice(0, 10);
}

export type Session = {
  /** projet (slug) ou « admin » */
  p: string;
  /** prénom saisi */
  n: string;
  /** empreinte du code au moment de la connexion */
  k: string;
  /** émise le (secondes) */
  iat: number;
  /** expire le (secondes) */
  exp: number;
};

export const DUREE_SESSION_S = 30 * 24 * 60 * 60;

export function signerSession(session: Session): string {
  const corps = b64url(Buffer.from(JSON.stringify(session), "utf8"));
  const sig = b64url(hmac(corps, "session"));
  return `${corps}.${sig}`;
}

export function lireSession(valeur: string | undefined): Session | null {
  if (!valeur || valeur.length > 2000 || !secretConfigure()) return null;
  const [corps, sig] = valeur.split(".");
  if (!corps || !sig) return null;
  const attendu = hmac(corps, "session");
  const recu = Buffer.from(sig, "base64url");
  if (recu.length !== attendu.length || !timingSafeEqual(recu, attendu)) return null;
  try {
    const s = JSON.parse(Buffer.from(corps, "base64url").toString("utf8")) as Session;
    if (typeof s.p !== "string" || typeof s.n !== "string" || typeof s.exp !== "number") return null;
    if (s.exp * 1000 < Date.now()) return null;
    return s;
  } catch {
    return null;
  }
}

/** Nettoie le prénom saisi : lettres, espaces, tirets, apostrophes ; 40 caractères au plus. */
export function nettoyerPrenom(brut: unknown): string {
  if (typeof brut !== "string") return "";
  return brut
    .normalize("NFC")
    .replace(/[^\p{L}\p{M}' \-’.]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

/** Sérialise un Set-Cookie (plusieurs cookies de même nom sur des chemins différents). */
export function cookieSession(
  nom: string,
  valeur: string,
  chemin: string,
  maxAge: number,
): string {
  const parties = [
    `${nom}=${valeur}`,
    `Path=${chemin}`,
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (maxAge <= 0) parties.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  if (process.env.NODE_ENV === "production") parties.push("Secure");
  return parties.join("; ");
}

/** IP du client derrière Netlify (en-tête posé par le CDN), sinon x-forwarded-for. */
export function ipDeLaRequete(headers: Headers): string {
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    ""
  );
}

/** Refuse une requête modifiante venue d'une autre origine (en plus de SameSite=Lax). */
export function origineAcceptable(request: Request): boolean {
  const origine = request.headers.get("origin");
  if (!origine) return true;
  try {
    const o = new URL(origine);
    const hote = request.headers.get("x-forwarded-host") || request.headers.get("host");
    return Boolean(hote) && o.host === hote;
  } catch {
    return false;
  }
}

/** Agent utilisateur abrégé : « Chrome 130 · macOS », « Safari · iOS (mobile) ». */
export function navigateurAbrege(ua: string | null): string {
  if (!ua) return "inconnu";
  const nav =
    (/Edg\/(\d+)/.exec(ua) && `Edge ${/Edg\/(\d+)/.exec(ua)![1]}`) ||
    (/OPR\/(\d+)/.exec(ua) && `Opera ${/OPR\/(\d+)/.exec(ua)![1]}`) ||
    (/Firefox\/(\d+)/.exec(ua) && `Firefox ${/Firefox\/(\d+)/.exec(ua)![1]}`) ||
    (/CriOS\/(\d+)/.exec(ua) && `Chrome ${/CriOS\/(\d+)/.exec(ua)![1]}`) ||
    (/Chrome\/(\d+)/.exec(ua) && `Chrome ${/Chrome\/(\d+)/.exec(ua)![1]}`) ||
    (/Version\/(\d+).*Safari/.exec(ua) && `Safari ${/Version\/(\d+)/.exec(ua)![1]}`) ||
    "autre";
  const os = /iPhone|iPad|iPod/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Windows/.test(ua)
        ? "Windows"
        : /Mac OS X|Macintosh/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "autre";
  const mobile = /Mobile|Android|iPhone/.test(ua) ? " (mobile)" : "";
  const robot = /Headless/.test(ua) ? " [headless]" : "";
  return `${nav} · ${os}${mobile}${robot}`;
}
