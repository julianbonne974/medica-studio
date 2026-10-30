import type { NextRequest } from "next/server";
import { origineAcceptable } from "@/lib/clients/securite";
import { CHEMIN_ADMIN, fermerSessionAdmin, rediriger } from "@/lib/clients/session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!origineAcceptable(request)) return new Response("Origine refusée", { status: 403 });
  return rediriger(`${CHEMIN_ADMIN}?deconnecte=1`, 303, [fermerSessionAdmin()]);
}
