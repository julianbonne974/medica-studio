import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BarreSession } from "@/components/clients/barre-session";
import { EcranAcces } from "@/components/clients/ecran-acces";
import { FormulaireQuestionnaire } from "@/components/clients/questionnaire/formulaire";
import { chargerProjet, cheminApiProjet, cheminProjet } from "@/lib/clients/projets";
import { nomCookie, sessionProjet } from "@/lib/clients/session";
import { journaliserAcces } from "@/lib/clients/journal";
import { empreinteIp, ipDeLaRequete, navigateurAbrege } from "@/lib/clients/securite";
import { chargerQuestionnaire, lireDossier } from "@/lib/clients/questionnaires";
import { dateLongue } from "@/lib/clients/questionnaire-modele";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ projet: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  return {
    title: projet ? `Questions · ${projet.nom} · Espace client` : "Espace client",
    robots: { index: false, follow: false },
  };
}

export default async function PageQuestions({ params, searchParams }: Props) {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  if (!projet) notFound();

  // Session d'abord : sans elle, rien ne dit si un questionnaire existe.
  const session = sessionProjet(slug, (await cookies()).get(nomCookie(slug))?.value);
  if (!session) return <EcranAcces projet={projet} q={await searchParams} suite="questions" />;

  const chargement = chargerQuestionnaire(slug);
  if (chargement.etat === "absent") notFound();

  const h = await headers();
  await journaliserAcces({
    projet: slug,
    prenom: session.n,
    page: "questions",
    navigateur: navigateurAbrege(h.get("user-agent")),
    empreinteIp: empreinteIp(ipDeLaRequete(h)),
  });

  const accueil = cheminProjet(slug);
  const barre = (
    <BarreSession
      deconnexion={`${accueil}/deconnexion`}
      libelle={
        <>
          Connecté en tant que <strong className="font-medium text-zinc-900 dark:text-zinc-100">{session.n}</strong>
        </>
      }
    >
      <a
        href={accueil}
        className="inline-flex h-9 items-center gap-2 px-1 font-medium text-zinc-700 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {projet.nom}
      </a>
    </BarreSession>
  );

  if (chargement.etat === "invalide") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        {barre}
        <div role="alert" className="mt-14 max-w-[62ch] space-y-3">
          <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
            Questionnaire indisponible
          </h1>
          <p className="text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
            Le questionnaire est en cours de correction. Revenez un peu plus tard ou prévenez Julian Bonne.
          </p>
          {process.env.NODE_ENV === "development" && (
            <pre className="overflow-x-auto border border-red-200 bg-red-50 p-4 text-xs whitespace-pre-wrap text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {chargement.erreur}
            </pre>
          )}
        </div>
      </div>
    );
  }

  const questionnaire = chargement.questionnaire;
  const dossier = await lireDossier(slug, questionnaire, session.n);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-8 sm:pt-16 lg:pb-24">
      {barre}

      <header className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium tracking-tight text-balance text-zinc-900 md:text-6xl dark:text-zinc-100">
            {questionnaire.titre}
          </h1>
          {questionnaire.sousTitre && (
            <p className="text-lg text-pretty text-zinc-600 dark:text-zinc-400">{questionnaire.sousTitre}</p>
          )}
        </div>
        <div className="space-y-4">
          {(questionnaire.intro ?? []).map((p, i) => (
            <p key={i} className="max-w-[62ch] text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
              {p}
            </p>
          ))}
          <p className="flex max-w-[62ch] items-start gap-3 border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100">
            <span className="mt-[0.45rem] size-1.5 shrink-0 bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
            <span>
              Aucune question n&apos;est obligatoire. Vos réponses s&apos;enregistrent au fil de la saisie et vous
              retrouvez les mêmes sur un autre appareil en vous connectant avec le même prénom.
              {questionnaire.dateSouhaitee && (
                <> Si possible avant le {dateLongue(questionnaire.dateSouhaitee)}.</>
              )}
            </span>
          </p>
        </div>
      </header>

      <FormulaireQuestionnaire
        questionnaire={questionnaire}
        api={`${cheminApiProjet(slug)}/questions`}
        base={`${accueil}/m/`}
        accueil={accueil}
        initiales={dossier?.reponses ?? {}}
        majLeInitial={dossier?.majLe ?? null}
        envoisInitiaux={dossier?.envois ?? []}
      />
    </div>
  );
}
