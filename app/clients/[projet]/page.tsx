import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FormulaireAcces } from "@/components/clients/formulaire-acces";
import { BarreSession } from "@/components/clients/barre-session";
import { chargerProjet, cheminProjet, urlMaquette } from "@/lib/clients/projets";
import { nomCookie, sessionProjet } from "@/lib/clients/session";
import { journaliserAcces } from "@/lib/clients/journal";
import { empreinteIp, ipDeLaRequete, navigateurAbrege } from "@/lib/clients/securite";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ projet: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  return {
    title: projet ? `${projet.nom} · Espace client` : "Espace client",
    robots: { index: false, follow: false },
  };
}

function un(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function messageAcces(q: Record<string, string | string[] | undefined>) {
  const erreur = un(q.erreur);
  const restants = Number(un(q.restants) ?? "0");
  switch (erreur) {
    case "code":
      return {
        ton: "erreur" as const,
        texte:
          restants > 1
            ? `Code incorrect. Encore ${restants} essais avant un blocage de 15 minutes.`
            : "Code incorrect. Dernier essai avant un blocage de 15 minutes.",
      };
    case "limite":
      return {
        ton: "erreur" as const,
        texte:
          "Trop d'essais depuis cette connexion. Réessayez dans 15 minutes, ou demandez le code à Julian Bonne.",
      };
    case "prenom":
      return { ton: "erreur" as const, texte: "Indiquez votre prénom." };
    case "indisponible":
      return {
        ton: "erreur" as const,
        texte: "L'accès à ce projet n'est pas encore ouvert. Contactez Julian Bonne.",
      };
    case "formulaire":
      return { ton: "erreur" as const, texte: "Le formulaire n'a pas pu être lu. Réessayez." };
  }
  if (un(q.deconnecte)) return { ton: "info" as const, texte: "Vous êtes déconnecté." };
  if (un(q.suite) === "maquette")
    return { ton: "info" as const, texte: "Connectez-vous pour ouvrir la maquette." };
  return undefined;
}

const dateLongue = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

export default async function PageProjet({ params, searchParams }: Props) {
  const { projet: slug } = await params;
  const projet = chargerProjet(slug);
  if (!projet) notFound();

  const q = await searchParams;
  const session = sessionProjet(slug, (await cookies()).get(nomCookie(slug))?.value);

  if (!session) {
    const message = messageAcces(q);
    return (
      <div className="mx-auto max-w-md px-4 py-20 sm:px-8 sm:py-28">
        <div className="space-y-10">
          <div className="space-y-5 text-center">
            <h1 className="text-5xl font-medium tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-100">
              {projet.nom}
            </h1>
            <Separator className="mx-auto w-24 bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-pretty text-zinc-600 dark:text-zinc-400">
              Espace client Medica Studio. Saisissez votre prénom et le code d&apos;accès que Julian Bonne
              vous a transmis.
            </p>
          </div>
          <FormulaireAcces
            action={`${cheminProjet(slug)}/acces`}
            avecPrenom
            message={message}
          />
          <p className="text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            La connexion dépose un seul cookie, strictement nécessaire, valable 30 jours. Il garde votre
            prénom et se supprime à la déconnexion.
          </p>
        </div>
      </div>
    );
  }

  const h = await headers();
  await journaliserAcces({
    projet: slug,
    prenom: session.n,
    page: "accueil",
    navigateur: navigateurAbrege(h.get("user-agent")),
    empreinteIp: empreinteIp(ipDeLaRequete(h)),
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
      <BarreSession
        deconnexion={`${cheminProjet(slug)}/deconnexion`}
        libelle={
          <>
            Connecté en tant que <strong className="font-medium text-zinc-900 dark:text-zinc-100">{session.n}</strong>
          </>
        }
      />

      <header className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
        <div className="space-y-4">
          <h1 className="text-5xl font-medium tracking-tight text-zinc-900 md:text-7xl dark:text-zinc-100">
            {projet.nom}
          </h1>
          {projet.sousTitre && (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{projet.sousTitre}</p>
          )}
        </div>
        <div className="space-y-5">
          <p className="max-w-[62ch] text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
            {projet.description}
          </p>
          <p className="flex max-w-[62ch] items-start gap-3 border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100">
            <span className="mt-[0.45rem] size-1.5 shrink-0 bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
            {projet.mentionDonnees}
          </p>
        </div>
      </header>

      <section aria-labelledby="titre-versions" className="mt-16 sm:mt-24">
        <h2
          id="titre-versions"
          className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
        >
          Versions
        </h2>
        <ul className="mt-6 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
          {projet.versions.map((v) => (
            <li key={v.id} className="flex flex-col bg-white p-6 sm:p-8 dark:bg-zinc-950">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  {v.libelle}
                </span>
                <span className="text-right text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
                  Mise à jour le <time dateTime={v.miseAJour}>{dateLongue(v.miseAJour)}</time>
                </span>
              </div>
              <h3 className="mt-6 text-xl font-medium text-zinc-900 dark:text-zinc-100">{v.titre}</h3>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
                {v.description}
              </p>
              <a
                href={urlMaquette(slug, v.entree)}
                className="group mt-8 inline-flex h-12 items-center justify-center gap-2 border border-zinc-900 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:self-start dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Ouvrir la {v.libelle}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-2 lg:gap-16">
        <section aria-labelledby="titre-scenarios">
          <h2
            id="titre-scenarios"
            className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
          >
            Scénarios de test
          </h2>
          <ol className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {projet.scenarios.map((s, i) => (
              <li key={s.titre} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-5">
                <span className="text-2xl font-medium leading-none text-emerald-600 tabular-nums dark:text-emerald-400">
                  {i + 1}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-medium leading-snug text-zinc-900 dark:text-zinc-100">{s.titre}</h3>
                  {s.objectif && (
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.objectif}</p>
                  )}
                  {s.etapes && s.etapes.length > 0 && (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                      {s.etapes.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {projet.consignes && projet.consignes.length > 0 && (
          <section aria-labelledby="titre-consignes">
            <h2
              id="titre-consignes"
              className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
            >
              Mode d&apos;emploi
            </h2>
            <ul className="mt-6 space-y-4">
              {projet.consignes.map((c) => (
                <li key={c} className="flex gap-3 text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <span className="mt-[0.6rem] size-1.5 shrink-0 bg-zinc-400 dark:bg-zinc-600" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
