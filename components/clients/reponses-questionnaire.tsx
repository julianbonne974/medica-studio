import { ChevronDown } from "lucide-react";
import {
  AUCUNE,
  compterRepondues,
  reponseLisible,
  toutesLesQuestions,
  type DossierReponses,
  type Questionnaire,
  type ReponseVariantes,
} from "@/lib/clients/questionnaire-modele";

const dateHeure = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const TH = "whitespace-nowrap px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400";
const TD = "px-3 py-2.5 align-top";

/** Administration : répondants d'un questionnaire et lecture de leurs réponses (lecture seule). */
export function ReponsesQuestionnaire({
  questionnaire,
  dossiers,
  urlImage,
}: {
  questionnaire: Questionnaire;
  dossiers: DossierReponses[];
  urlImage: (src: string) => string;
}) {
  const total = toutesLesQuestions(questionnaire).length;
  if (dossiers.length === 0) {
    return (
      <p className="border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Personne n&apos;a encore répondu. Le lien est sur l&apos;accueil du projet, carte « {questionnaire.titre} ».
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th scope="col" className={TH}>Prénom</th>
              <th scope="col" className={TH}>Dernière modification</th>
              <th scope="col" className={TH}>Envoi</th>
              <th scope="col" className={TH}>Réponses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {dossiers.map((d) => {
              const dernier = d.envois.at(-1);
              return (
                <tr key={d.prenom}>
                  <td className={`${TD} font-medium text-zinc-900 dark:text-zinc-100`}>{d.prenom}</td>
                  <td className={`${TD} whitespace-nowrap tabular-nums text-zinc-600 dark:text-zinc-400`}>{dateHeure(d.majLe)}</td>
                  <td className={`${TD} tabular-nums text-zinc-700 dark:text-zinc-300`}>
                    {dernier ? (
                      <>
                        Envoyé le {dateHeure(dernier)}
                        {d.envois.length > 1 && <span className="text-zinc-500"> ({d.envois.length} envois)</span>}
                        {d.majLe > dernier && <span className="block text-xs text-amber-700 dark:text-amber-400">modifié depuis</span>}
                      </>
                    ) : (
                      <span className="text-zinc-500">Pas encore envoyé</span>
                    )}
                  </td>
                  <td className={`${TD} tabular-nums text-zinc-700 dark:text-zinc-300`}>
                    {compterRepondues(questionnaire, d.reponses)} / {total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {dossiers.map((d) => (
        <details key={d.prenom} className="group border border-zinc-200 dark:border-zinc-800">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-100 dark:hover:bg-zinc-900 [&::-webkit-details-marker]:hidden">
            Réponses de {d.prenom}
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="space-y-8 border-t border-zinc-200 px-4 py-6 sm:px-6 dark:border-zinc-800">
            {questionnaire.sections
              .filter((s) => (s.questions ?? []).length > 0)
              .map((s) => (
                <section key={s.id} className="space-y-4">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">{s.titre}</h4>
                  <dl className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                    {(s.questions ?? []).map((q) => {
                      const l = reponseLisible(q, d.reponses[q.id]);
                      const variante =
                        q.type === "variantes"
                          ? q.options.find((o) => o.id === (d.reponses[q.id] as ReponseVariantes | undefined)?.choix)
                          : undefined;
                      const aucune = q.type === "variantes" && q.aucune && (d.reponses[q.id] as ReponseVariantes | undefined)?.choix === AUCUNE;
                      return (
                        <div key={q.id} className="grid gap-1.5 py-3 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-6">
                          <dt className="text-sm text-pretty text-zinc-600 dark:text-zinc-400">{q.intitule}</dt>
                          <dd className="space-y-2 text-sm text-zinc-900 dark:text-zinc-100">
                            {l.reponse ? (
                              <p className={`whitespace-pre-wrap break-words ${aucune ? "text-amber-800 dark:text-amber-300" : ""}`}>{l.reponse}</p>
                            ) : (
                              <p className="text-zinc-400 dark:text-zinc-600">Sans réponse</p>
                            )}
                            {variante && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={urlImage(variante.image)}
                                alt={variante.libelle}
                                loading="lazy"
                                className="max-h-56 w-auto border border-zinc-200 bg-zinc-100 object-contain dark:border-zinc-800 dark:bg-zinc-900"
                              />
                            )}
                            {l.autre && (
                              <p className="whitespace-pre-wrap break-words">
                                <span className="text-zinc-500">Autre : </span>
                                {l.autre}
                              </p>
                            )}
                            {l.commentaire && (
                              <p className="whitespace-pre-wrap break-words border-l border-zinc-300 pl-3 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                                {l.commentaire}
                              </p>
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </section>
              ))}
          </div>
        </details>
      ))}
    </div>
  );
}
