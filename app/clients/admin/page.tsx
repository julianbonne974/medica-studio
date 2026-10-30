import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FormulaireAcces } from "@/components/clients/formulaire-acces";
import { BarreSession } from "@/components/clients/barre-session";
import { listerProjets } from "@/lib/clients/projets";
import { listerAcces, listerRetours, type EntreeAcces, type Retour } from "@/lib/clients/journal";
import { modeStockage } from "@/lib/clients/stockage";
import { CHEMIN_ADMIN, COOKIE_ADMIN, sessionAdmin } from "@/lib/clients/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration · Espace client",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const LIGNES_AFFICHEES = 200;

const dateHeure = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

function messageAdmin(q: Record<string, string | string[] | undefined>) {
  const restants = Number(un(q.restants) ?? "0");
  switch (un(q.erreur)) {
    case "code":
      return {
        ton: "erreur" as const,
        texte:
          restants > 1
            ? `Code incorrect. Encore ${restants} essais avant un blocage de 15 minutes.`
            : "Code incorrect. Dernier essai avant un blocage de 15 minutes.",
      };
    case "limite":
      return { ton: "erreur" as const, texte: "Trop d'essais depuis cette connexion. Réessayez dans 15 minutes." };
    case "indisponible":
      return {
        ton: "erreur" as const,
        texte: "Administration non configurée : CLIENT_ADMIN_CODE ou CLIENT_SESSION_SECRET manque.",
      };
    case "formulaire":
      return { ton: "erreur" as const, texte: "Le formulaire n'a pas pu être lu. Réessayez." };
  }
  if (un(q.deconnecte)) return { ton: "info" as const, texte: "Vous êtes déconnecté." };
  return undefined;
}

const TH = "whitespace-nowrap px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400";
const TD = "px-3 py-2.5 align-top";

function TableRetours({ retours }: { retours: Retour[] }) {
  if (retours.length === 0) {
    return (
      <p className="border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Aucun retour sur la période. Les clients en laissent depuis le bouton « Laisser un retour » des maquettes.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th scope="col" className={`${TH} w-36`}>Date</th>
            <th scope="col" className={`${TH} w-28`}>Prénom</th>
            <th scope="col" className={`${TH} w-16`}>Version</th>
            <th scope="col" className={`${TH} w-56`}>Page</th>
            <th scope="col" className={TH}>Retour</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {retours.slice(0, LIGNES_AFFICHEES).map((r) => (
            <tr key={`${r.date}-${r.empreinteIp}-${r.texte.length}`}>
              <td className={`${TD} whitespace-nowrap tabular-nums text-zinc-600 dark:text-zinc-400`}>{dateHeure(r.date)}</td>
              <td className={`${TD} font-medium text-zinc-900 dark:text-zinc-100`}>{r.prenom}</td>
              <td className={`${TD} text-zinc-700 dark:text-zinc-300`}>{r.version || "–"}</td>
              <td className={`${TD} break-words text-zinc-600 dark:text-zinc-400`}>{r.page}</td>
              <td className={`${TD} whitespace-pre-wrap break-words text-zinc-900 dark:text-zinc-100`}>{r.texte}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableAcces({ acces }: { acces: EntreeAcces[] }) {
  if (acces.length === 0) {
    return (
      <p className="border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Aucun accès sur la période.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th scope="col" className={`${TH} w-36`}>Date</th>
            <th scope="col" className={`${TH} w-28`}>Prénom</th>
            <th scope="col" className={TH}>Page</th>
            <th scope="col" className={TH}>Navigateur</th>
            <th scope="col" className={`${TH} w-28`}>Empreinte IP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {acces.slice(0, LIGNES_AFFICHEES).map((a, i) => (
            <tr key={`${a.date}-${i}`}>
              <td className={`${TD} whitespace-nowrap tabular-nums text-zinc-600 dark:text-zinc-400`}>{dateHeure(a.date)}</td>
              <td className={`${TD} font-medium text-zinc-900 dark:text-zinc-100`}>{a.prenom}</td>
              <td className={`${TD} break-words text-zinc-700 dark:text-zinc-300`}>{a.page}</td>
              <td className={`${TD} text-zinc-600 dark:text-zinc-400`}>{a.navigateur}</td>
              <td className={`${TD} font-mono text-xs text-zinc-500 dark:text-zinc-500`}>{a.empreinteIp.slice(0, 8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LienCsv({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-9 items-center gap-2 border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
    >
      <Download className="size-4" aria-hidden="true" />
      {children}
    </a>
  );
}

const CHAMP_FILTRE =
  "h-10 w-full border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-emerald-600/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] dark:focus-visible:border-zinc-500";

export default async function PageAdmin({ searchParams }: Props) {
  const q = await searchParams;
  const session = sessionAdmin((await cookies()).get(COOKIE_ADMIN)?.value);

  if (!session) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 sm:px-8 sm:py-28">
        <div className="space-y-10">
          <div className="space-y-5 text-center">
            <h1 className="text-5xl font-medium tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-100">
              Administration
            </h1>
            <Separator className="mx-auto w-24 bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-zinc-600 dark:text-zinc-400">Journal des accès et retours des espaces clients.</p>
          </div>
          <FormulaireAcces action={`${CHEMIN_ADMIN}/acces`} avecPrenom={false} message={messageAdmin(q)} />
        </div>
      </div>
    );
  }

  const projets = listerProjets();
  const projetFiltre = un(q.projet) ?? "";
  const du = DATE.test(un(q.du) ?? "") ? un(q.du) : undefined;
  const au = DATE.test(un(q.au) ?? "") ? un(q.au) : undefined;
  const visibles = projetFiltre ? projets.filter((p) => p.slug === projetFiltre) : projets;

  const donnees = await Promise.all(
    visibles.map(async (p) => ({
      projet: p,
      acces: await listerAcces(p.slug, { du, au }),
      retours: await listerRetours(p.slug, { du, au }),
    })),
  );

  const filtreCsv = (slug: string, type: string) => {
    const u = new URLSearchParams({ projet: slug, type });
    if (du) u.set("du", du);
    if (au) u.set("au", au);
    return `${CHEMIN_ADMIN}/export?${u.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
      <BarreSession
        deconnexion={`${CHEMIN_ADMIN}/deconnexion`}
        libelle={
          <>
            Administration · stockage{" "}
            <strong className="font-medium text-zinc-900 dark:text-zinc-100">
              {modeStockage() === "blobs" ? "Netlify Blobs" : "fichiers locaux (.data)"}
            </strong>
          </>
        }
      />

      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-100">
          Espaces clients
        </h1>
        <form method="get" className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(10rem,1fr)_auto_auto_auto] sm:items-end">
          <label className="col-span-2 grid gap-1.5 text-xs font-medium text-zinc-600 sm:col-span-1 dark:text-zinc-400">
            Projet
            <select name="projet" defaultValue={projetFiltre} className={CHAMP_FILTRE}>
              <option value="">Tous les projets</option>
              {projets.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.nom}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Du
            <input type="date" name="du" defaultValue={du} className={CHAMP_FILTRE} />
          </label>
          <label className="grid gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Au
            <input type="date" name="au" defaultValue={au} className={CHAMP_FILTRE} />
          </label>
          <div className="col-span-2 flex gap-2 sm:col-span-1">
            <button
              type="submit"
              className="h-10 flex-1 border border-zinc-900 bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:flex-none dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Filtrer
            </button>
            {(projetFiltre || du || au) && (
              <a
                href={CHEMIN_ADMIN}
                className="inline-flex h-10 items-center border border-zinc-200 px-3 text-sm text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
              >
                Effacer
              </a>
            )}
          </div>
        </form>
      </div>

      {donnees.length === 0 && (
        <p className="mt-12 text-zinc-600 dark:text-zinc-400">
          Aucun projet. Ajoutez un fichier dans content/clients/ (voir CLIENTS.md).
        </p>
      )}

      {donnees.map(({ projet, acces, retours }) => {
        const personnes = new Set(acces.map((a) => a.prenom.toLocaleLowerCase("fr"))).size;
        return (
          <section
            key={projet.slug}
            aria-labelledby={`projet-${projet.slug}`}
            className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1.5">
                <h2
                  id={`projet-${projet.slug}`}
                  className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  {projet.nom}
                </h2>
                <p className="text-sm text-zinc-600 tabular-nums dark:text-zinc-400">
                  {acces.length} {acces.length > 1 ? "ouvertures" : "ouverture"} de page · {personnes}{" "}
                  {personnes > 1 ? "prénoms" : "prénom"} · {retours.length} {retours.length > 1 ? "retours" : "retour"}
                  {acces[0] && <> · dernier accès le {dateHeure(acces[0].date)}</>}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <LienCsv href={filtreCsv(projet.slug, "retours")}>Retours (CSV)</LienCsv>
                <LienCsv href={filtreCsv(projet.slug, "acces")}>Accès (CSV)</LienCsv>
              </div>
            </div>

            <h3 className="mt-8 mb-3 text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Retours
            </h3>
            <TableRetours retours={retours} />

            <h3 className="mt-10 mb-3 text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Journal des accès
            </h3>
            <TableAcces acces={acces} />
            {acces.length > LIGNES_AFFICHEES && (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {LIGNES_AFFICHEES} lignes affichées sur {acces.length}. L&apos;export CSV contient tout.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
