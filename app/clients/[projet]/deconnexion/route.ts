import type { NextRequest } from "next/server";
import { chargerProjet, cheminProjet } from "@/lib/clients/projets";
import { origineAcceptable } from "@/lib/clients/securite";
import { fermerSessionProjet, rediriger } from "@/lib/clients/session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ projet: string }> }) {
  const { projet: slug } = await params;
  if (!chargerProjet(slug)) return new Response("Introuvable", { status: 404 });
  if (!origineAcceptable(request)) return new Response("Origine refusée", { status: 403 });
  return rediriger(`${cheminProjet(slug)}?deconnecte=1`, 303, fermerSessionProjet(slug));
}
