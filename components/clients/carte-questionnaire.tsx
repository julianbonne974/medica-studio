import { ArrowRight } from "lucide-react";
import {
  compterRepondues,
  dateLongue,
  toutesLesQuestions,
  type DossierReponses,
  type Questionnaire,
} from "@/lib/clients/questionnaire-modele";

const jourParis = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(iso));

/** Carte d'appel en tête de l'accueil d'un projet, avec l'état des réponses de la personne connectée. */
export function CarteQuestionnaire({
  questionnaire,
  dossier,
  href,
}: {
  questionnaire: Questionnaire;
  dossier: DossierReponses | null;
  href: string;
}) {
  const total = toutesLesQuestions(questionnaire).length;
  const repondues = dossier ? compterRepondues(questionnaire, dossier.reponses) : 0;
  const dernierEnvoi = dossier?.envois.at(-1);

  let etat: string;
  let action: string;
  if (dernierEnvoi) {
    etat = `Réponses envoyées le ${jourParis(dernierEnvoi)}. Vous pouvez encore les modifier.`;
    action = "Revoir mes réponses";
  } else if (repondues > 0) {
    etat = `En cours : ${repondues} ${repondues > 1 ? "réponses" : "réponse"} sur ${total}, enregistrées. Pas encore envoyées.`;
    action = "Reprendre";
  } else {
    etat = `Pas encore commencé · ${total} questions, aucune obligatoire.`;
    action = "Répondre aux questions";
  }

  return (
    <section
      aria-labelledby="titre-questionnaire"
      className="mt-10 grid gap-6 border border-zinc-900 bg-zinc-50 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 dark:border-zinc-100 dark:bg-zinc-900"
    >
      <div className="space-y-2.5">
        <h2
          id="titre-questionnaire"
          className="text-2xl font-medium tracking-tight text-balance text-zinc-900 md:text-3xl dark:text-zinc-100"
        >
          {questionnaire.titre}
        </h2>
        {questionnaire.sousTitre && (
          <p className="max-w-[62ch] text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
            {questionnaire.sousTitre}
          </p>
        )}
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-700 tabular-nums dark:text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <span
              className={`size-1.5 shrink-0 ${dernierEnvoi ? "bg-emerald-600 dark:bg-emerald-400" : repondues > 0 ? "bg-amber-500" : "bg-zinc-400 dark:bg-zinc-500"}`}
              aria-hidden="true"
            />
            {etat}
          </span>
          {questionnaire.dateSouhaitee && !dernierEnvoi && (
            <span className="text-zinc-500 dark:text-zinc-400">
              Si possible avant le {dateLongue(questionnaire.dateSouhaitee)}.
            </span>
          )}
        </p>
      </div>
      <a
        href={href}
        className="group inline-flex h-12 items-center justify-center gap-2 border border-zinc-900 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {action}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </section>
  );
}
