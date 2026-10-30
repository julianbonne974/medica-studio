import type { NextRequest } from "next/server";
import { chargerProjet } from "@/lib/clients/projets";
import { listerAcces, listerRetours } from "@/lib/clients/journal";
import { COOKIE_ADMIN, CHEMIN_ADMIN, rediriger, sessionAdmin } from "@/lib/clients/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Cellule CSV : guillemets doublés, et neutralisation des formules (=, +, -, @) pour Excel. */
function cellule(valeur: unknown): string {
  let s = String(valeur ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

function dateParis(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(iso));
}

export async function GET(request: NextRequest) {
  if (!sessionAdmin(request.cookies.get(COOKIE_ADMIN)?.value)) return rediriger(CHEMIN_ADMIN, 307);

  const q = request.nextUrl.searchParams;
  const slug = q.get("projet") ?? "";
  const type = q.get("type") === "retours" ? "retours" : "acces";
  const projet = chargerProjet(slug);
  if (!projet) return new Response("Projet inconnu", { status: 404 });
  const filtre = { du: q.get("du") ?? undefined, au: q.get("au") ?? undefined, limite: 10000 };

  let lignes: string[][];
  if (type === "acces") {
    const acces = await listerAcces(slug, filtre);
    lignes = [
      ["Date (Paris)", "Date ISO", "Projet", "Prénom", "Page", "Navigateur", "Empreinte IP"],
      ...acces.map((a) => [dateParis(a.date), a.date, a.projet, a.prenom, a.page, a.navigateur, a.empreinteIp]),
    ];
  } else {
    const retours = await listerRetours(slug, filtre);
    lignes = [
      ["Date (Paris)", "Date ISO", "Projet", "Prénom", "Version", "Page", "Retour", "Navigateur", "Empreinte IP"],
      ...retours.map((r) => [
        dateParis(r.date),
        r.date,
        r.projet,
        r.prenom,
        r.version,
        r.page,
        r.texte,
        r.navigateur,
        r.empreinteIp,
      ]),
    ];
  }

  // Point-virgule et BOM : le fichier s'ouvre tel quel dans Excel en français.
  const csv = "﻿" + lignes.map((l) => l.map(cellule).join(";")).join("\r\n") + "\r\n";
  const periode =
    [filtre.du, filtre.au].filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d)).join("_") || "tout";
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}-${type}-${periode}.csv"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
