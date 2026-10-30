import type { NextRequest } from "next/server";
import {
  empreinteIp,
  ipDeLaRequete,
  origineAcceptable,
  secretConfigure,
  verifierCode,
} from "@/lib/clients/securite";
import { blocageEnCours, effacerEchecs, noterEchec } from "@/lib/clients/journal";
import { CHEMIN_ADMIN, empreinteAdmin, ouvrirSessionAdmin, rediriger } from "@/lib/clients/session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!origineAcceptable(request)) return new Response("Origine refusée", { status: 403 });
  if (!secretConfigure() || !empreinteAdmin()) return rediriger(`${CHEMIN_ADMIN}?erreur=indisponible`);

  let code = "";
  try {
    code = String((await request.formData()).get("code") ?? "").trim();
  } catch {
    return rediriger(`${CHEMIN_ADMIN}?erreur=formulaire`);
  }

  const ip = empreinteIp(ipDeLaRequete(request.headers));
  if (await blocageEnCours("admin", ip)) return rediriger(`${CHEMIN_ADMIN}?erreur=limite`);

  const valide = code.length > 0 && (await verifierCode(code, empreinteAdmin()));
  if (!valide) {
    const restants = await noterEchec("admin", ip);
    return rediriger(
      restants > 0 ? `${CHEMIN_ADMIN}?erreur=code&restants=${restants}` : `${CHEMIN_ADMIN}?erreur=limite`,
    );
  }
  await effacerEchecs("admin", ip);
  return rediriger(CHEMIN_ADMIN, 303, [ouvrirSessionAdmin()]);
}
