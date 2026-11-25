import { promises as fs } from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";
import { chargerProjet, racinePrototypes } from "@/lib/clients/projets";
import { chargerQuestionnaire, imagesDuQuestionnaire } from "@/lib/clients/questionnaires";
import { COOKIE_ADMIN, sessionAdmin } from "@/lib/clients/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

const ENTETES = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
};

function refus(statut: number, message: string) {
  return new Response(message, { status: statut, headers: { ...ENTETES, "Content-Type": "text/plain; charset=utf-8" } });
}

/**
 * Images d'un questionnaire pour l'administration (la session admin n'ouvre pas /clients/<projet>/m/).
 * Seules les images citées par le fichier de contenu sont servies : ?projet=<slug>&src=<chemin>.
 */
export async function GET(request: NextRequest) {
  if (!sessionAdmin(request.cookies.get(COOKIE_ADMIN)?.value)) return refus(401, "Session requise");
  const slug = request.nextUrl.searchParams.get("projet") ?? "";
  const src = request.nextUrl.searchParams.get("src") ?? "";
  if (!chargerProjet(slug)) return refus(404, "Projet inconnu");
  const chargement = chargerQuestionnaire(slug);
  if (chargement.etat !== "ok" || !imagesDuQuestionnaire(chargement.questionnaire).has(src)) {
    return refus(404, "Image inconnue");
  }
  const racine = racinePrototypes(slug);
  const cible = path.resolve(racine, ...src.split("/"));
  if (!cible.startsWith(racine + path.sep)) return refus(400, "Chemin invalide");
  const type = TYPES[path.extname(cible).toLowerCase()];
  if (!type) return refus(415, "Type non servi");
  try {
    const stat = await fs.lstat(cible);
    if (!stat.isFile()) return refus(404, "Image introuvable");
    const contenu = await fs.readFile(cible);
    return new Response(new Uint8Array(contenu), {
      headers: { ...ENTETES, "Content-Type": type, "Content-Length": String(contenu.length) },
    });
  } catch {
    return refus(404, "Image introuvable");
  }
}
