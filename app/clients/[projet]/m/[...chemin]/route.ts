import { promises as fs } from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";
import {
  RACINE_PROTOTYPES,
  chargerProjet,
  cheminApiProjet,
  cheminProjet,
  versionDuChemin,
} from "@/lib/clients/projets";
import { empreinteIp, ipDeLaRequete, navigateurAbrege } from "@/lib/clients/securite";
import { journaliserAcces } from "@/lib/clients/journal";
import { nomCookie, rediriger, sessionProjet } from "@/lib/clients/session";
import { injecterWidget } from "@/lib/clients/widget";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

const ENTETES_COMMUNES = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "X-Frame-Options": "SAMEORIGIN",
};

function refus(statut: number, message: string) {
  return new Response(message, {
    status: statut,
    headers: { ...ENTETES_COMMUNES, "Content-Type": "text/plain; charset=utf-8" },
  });
}

/** Segment sûr : ni vide, ni « . » / « .. », ni séparateur, ni caractère de contrôle, ni fichier caché. */
function segmentSur(s: string) {
  return (
    s.length > 0 &&
    s.length <= 200 &&
    s !== "." &&
    s !== ".." &&
    !s.startsWith(".") &&
    !/[\\/\u0000-\u001f\u007f:]/.test(s)
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projet: string; chemin: string[] }> },
) {
  const { projet: slug, chemin } = await params;
  const projet = chargerProjet(slug);
  if (!projet) return refus(404, "Introuvable");

  // Next décode déjà les segments ; on refuse tout segment douteux, y compris « .. » encodé.
  let segments: string[];
  try {
    segments = chemin.map((s) => (s.includes("%") ? decodeURIComponent(s) : s));
  } catch {
    return refus(400, "Chemin invalide");
  }
  if (segments.length === 0 || !segments.every(segmentSur)) return refus(400, "Chemin invalide");

  const session = sessionProjet(slug, request.cookies.get(nomCookie(slug))?.value);
  if (!session) {
    return rediriger(`${cheminProjet(slug)}?suite=maquette`, 307);
  }

  const racine = path.join(RACINE_PROTOTYPES, slug);
  const cible = path.resolve(racine, ...segments);
  if (!cible.startsWith(racine + path.sep)) return refus(400, "Chemin invalide");

  let stat;
  try {
    // lstat : un lien symbolique n'est jamais suivi.
    stat = await fs.lstat(cible);
  } catch {
    return refus(404, "Fichier introuvable");
  }
  const relatif = segments.join("/");

  if (stat.isDirectory()) {
    // Les liens de version (« ../maquette-v2/ ») arrivent ici : on renvoie vers l'index du dossier.
    return rediriger(`/clients/${slug}/m/${segments.map(encodeURIComponent).join("/")}/index.html`, 307);
  }
  if (!stat.isFile()) return refus(404, "Fichier introuvable");

  const ext = path.extname(cible).toLowerCase();
  const type = TYPES[ext];
  if (!type) return refus(415, "Type de fichier non servi");

  if (ext === ".html" || ext === ".htm") {
    const version = versionDuChemin(projet, relatif);
    const html = await fs.readFile(cible, "utf8");
    await journaliserAcces({
      projet: slug,
      prenom: session.n,
      page: `maquette : ${relatif}`,
      navigateur: navigateurAbrege(request.headers.get("user-agent")),
      empreinteIp: empreinteIp(ipDeLaRequete(request.headers)),
    });
    const corps = injecterWidget(html, {
      api: `${cheminApiProjet(slug)}/retours`,
      base: `/clients/${slug}/m/`,
      version: version?.libelle ?? "",
      projet: projet.nom,
    });
    return new Response(corps, { headers: { ...ENTETES_COMMUNES, "Content-Type": type } });
  }

  const contenu = await fs.readFile(cible);
  return new Response(new Uint8Array(contenu), {
    headers: { ...ENTETES_COMMUNES, "Content-Type": type, "Content-Length": String(contenu.length) },
  });
}
