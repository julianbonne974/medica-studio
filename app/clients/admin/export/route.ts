import type { NextRequest } from "next/server";
import { chargerProjet } from "@/lib/clients/projets";
import { listerAcces, listerRetours } from "@/lib/clients/journal";
import { chargerQuestionnaire, listerDossiers } from "@/lib/clients/questionnaires";
import { reponseLisible, toutesLesQuestions } from "@/lib/clients/questionnaire-modele";
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
  const demande = q.get("type");
  const type = demande === "retours" || demande === "questionnaire" ? demande : "acces";
  const projet = chargerProjet(slug);
  if (!projet) return new Response("Projet inconnu", { status: 404 });
  const filtre = { du: q.get("du") ?? undefined, au: q.get("au") ?? undefined, limite: 10000 };

  let lignes: string[][];
  if (type === "questionnaire") {
    // Une ligne par répondant et par question, réponses vides comprises ; pas de filtre de dates.
    const chargement = chargerQuestionnaire(slug);
    if (chargement.etat !== "ok") return new Response("Questionnaire absent ou invalide", { status: 404 });
    const questionnaire = chargement.questionnaire;
    const dossiers = await listerDossiers(slug, questionnaire);
    lignes = [
      ["Répondant", "Section", "Question", "Réponse", "Autre", "Commentaire", "Modifié le (Paris)", "Dernier envoi (Paris)"],
      ...dossiers.flatMap((d) =>
        toutesLesQuestions(questionnaire).map(({ section, groupe, question }) => {
          const l = reponseLisible(question, d.reponses[question.id]);
          const envoi = d.envois.at(-1);
          return [
            d.prenom,
            groupe ? `${section.titre} › ${groupe.titre}` : section.titre,
            question.intitule,
            l.reponse,
            l.autre,
            l.commentaire,
            dateParis(d.majLe),
            envoi ? dateParis(envoi) : "",
          ];
        }),
      ),
    ];
    return csv(lignes, `${slug}-questionnaire-${questionnaire.id}.csv`);
  }
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

  const periode =
    [filtre.du, filtre.au].filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d)).join("_") || "tout";
  return csv(lignes, `${slug}-${type}-${periode}.csv`);
}

function csv(lignes: string[][], fichier: string) {
  // Point-virgule et BOM : le fichier s'ouvre tel quel dans Excel en français.
  const corps = "﻿" + lignes.map((l) => l.map(cellule).join(";")).join("\r\n") + "\r\n";
  return new Response(corps, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fichier}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
