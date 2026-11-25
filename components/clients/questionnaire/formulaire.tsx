"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CircleAlert, CircleCheck, Send, X } from "lucide-react";
import {
  compterRepondues,
  estRepondue,
  toutesLesQuestions,
  type Question,
  type Questionnaire,
  type Reponse,
  type Reponses,
} from "@/lib/clients/questionnaire-modele";
import { Blocs } from "./blocs";
import {
  CadreQuestion,
  ChampChoix,
  ChampTableau,
  ChampTexte,
  ChampValidation,
  ChampVariantes,
} from "./champs";

/** Délai d'enregistrement automatique après la dernière frappe. */
const ANTI_REBOND_MS = 1500;

type Etat =
  | { type: "repos" }
  | { type: "enregistrement" }
  | { type: "enregistre" }
  | { type: "erreur"; message: string; session?: boolean };

const heure = (iso: string) => {
  const d = new Date(iso);
  return `${d.getHours()} h ${String(d.getMinutes()).padStart(2, "0")}`;
};
const jour = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(new Date(iso));
const memeJour = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();
const quand = (iso: string) => (memeJour(iso) ? `à ${heure(iso)}` : `le ${jour(iso)} à ${heure(iso)}`);

function messageErreur(statut: number, detail?: string): { message: string; session?: boolean } {
  switch (statut) {
    case 401:
      return { message: "Votre session a expiré. Reconnectez-vous pour enregistrer la suite.", session: true };
    case 413:
      return { message: "Réponses trop longues pour être enregistrées. Raccourcissez le dernier texte saisi." };
    case 429:
      return { message: "Trop d'enregistrements rapprochés. Patientez une minute, puis réessayez." };
    case 400:
      return {
        message: `Une réponse n'a pas pu être enregistrée${detail ? ` (${detail})` : ""}. Réessayez ; si cela continue, prévenez Julian Bonne.`,
      };
    default:
      return { message: "Enregistrement impossible pour le moment. Gardez cette page ouverte et réessayez dans un instant." };
  }
}

export function FormulaireQuestionnaire({
  questionnaire,
  api,
  base,
  accueil,
  initiales,
  majLeInitial,
  envoisInitiaux,
}: {
  questionnaire: Questionnaire;
  /** /api/clients/<projet>/questions */
  api: string;
  /** /clients/<projet>/m/ : préfixe des images */
  base: string;
  /** /clients/<projet> : pour se reconnecter */
  accueil: string;
  initiales: Reponses;
  majLeInitial: string | null;
  envoisInitiaux: string[];
}) {
  const [reponses, setReponses] = useState<Reponses>(initiales);
  const [etat, setEtat] = useState<Etat>({ type: "repos" });
  const [majLe, setMajLe] = useState<string | null>(majLeInitial);
  const [envois, setEnvois] = useState<string[]>(envoisInitiaux);
  const [envoi, setEnvoi] = useState<"repos" | "en-cours" | "fait" | "erreur">("repos");
  const [monte, setMonte] = useState(false);
  const [image, setImage] = useState<{ src: string; alt: string; legende?: string } | null>(null);

  // Le moteur d'enregistrement vit dans des refs : une écriture à la fois, toujours la dernière version.
  const courant = useRef(initiales);
  const version = useRef(0);
  const enregistree = useRef(0);
  const file = useRef<Promise<unknown>>(Promise.resolve());
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMonte(true), []);

  const ecrire = useCallback(
    async (envoyer: boolean): Promise<boolean> => {
      const v = version.current;
      if (!envoyer && v === enregistree.current) return true;
      setEtat({ type: "enregistrement" });
      try {
        const r = await fetch(api, {
          method: "PUT",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reponses: courant.current, ...(envoyer && { envoyer: true }) }),
        });
        if (!r.ok) {
          const corps = (await r.json().catch(() => ({}))) as { detail?: string };
          setEtat({ type: "erreur", ...messageErreur(r.status, corps.detail) });
          return false;
        }
        const corps = (await r.json()) as { majLe: string; envois: string[] };
        enregistree.current = Math.max(enregistree.current, v);
        setMajLe(corps.majLe);
        setEnvois(corps.envois);
        setEtat(version.current === enregistree.current ? { type: "enregistre" } : { type: "enregistrement" });
        return true;
      } catch {
        setEtat({
          type: "erreur",
          message: "Pas de connexion : vos dernières réponses ne sont pas enregistrées. Gardez cette page ouverte et réessayez.",
        });
        return false;
      }
    },
    [api],
  );

  const enregistrer = useCallback(
    (envoyer = false) => {
      if (minuteur.current) clearTimeout(minuteur.current);
      minuteur.current = null;
      const suite = file.current.then(() => ecrire(envoyer));
      file.current = suite;
      return suite;
    },
    [ecrire],
  );

  const maj = useCallback(
    (id: string, r: Reponse) => {
      const suivantes = { ...courant.current, [id]: r };
      courant.current = suivantes;
      version.current += 1;
      setReponses(suivantes);
      setEtat({ type: "enregistrement" });
      if (minuteur.current) clearTimeout(minuteur.current);
      minuteur.current = setTimeout(() => enregistrer(), ANTI_REBOND_MS);
    },
    [enregistrer],
  );

  // Perte de focus d'un champ : on enregistre sans attendre la fin du délai.
  const surSortie = () => {
    if (version.current !== enregistree.current) enregistrer();
  };

  // Page fermée ou mise en arrière-plan : dernier envoi, qui survit à la fermeture.
  useEffect(() => {
    const quitter = () => {
      if (version.current === enregistree.current) return;
      if (minuteur.current) clearTimeout(minuteur.current);
      fetch(api, {
        method: "PUT",
        credentials: "same-origin",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reponses: courant.current }),
      }).catch(() => {});
    };
    const masquee = () => document.visibilityState === "hidden" && enregistrer();
    window.addEventListener("pagehide", quitter);
    document.addEventListener("visibilitychange", masquee);
    return () => {
      window.removeEventListener("pagehide", quitter);
      document.removeEventListener("visibilitychange", masquee);
    };
  }, [api, enregistrer]);

  const envoyer = async () => {
    setEnvoi("en-cours");
    const ok = await enregistrer(true);
    setEnvoi(ok ? "fait" : "erreur");
  };

  const toutes = useMemo(() => toutesLesQuestions(questionnaire), [questionnaire]);
  const numeros = useMemo(() => new Map(toutes.map(({ question }, i) => [question.id, i + 1])), [toutes]);
  const total = toutes.length;
  const repondues = compterRepondues(questionnaire, reponses);
  const urlImage = useCallback(
    (src: string) => base + src.split("/").map(encodeURIComponent).join("/"),
    [base],
  );

  // Sommaire : section visible à l'écran.
  const [active, setActive] = useState(questionnaire.sections[0]?.id);
  useEffect(() => {
    const cibles = questionnaire.sections
      .map((s) => document.getElementById(`s-${s.id}`))
      .filter((e): e is HTMLElement => Boolean(e));
    const obs = new IntersectionObserver(
      (entrees) => {
        const visible = entrees.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.slice(2));
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    cibles.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [questionnaire]);

  const dernierEnvoi = envois.at(-1);

  const texteEtat = (() => {
    if (etat.type === "erreur") return etat.message;
    if (etat.type === "enregistrement") return "Enregistrement…";
    if (majLe && monte) return `Enregistré ${quand(majLe)}`;
    if (majLe) return "Enregistré";
    return "Vos réponses s'enregistrent au fil de la saisie.";
  })();

  const ligneEtat = (compact = false) => (
    <p
      className={`flex items-start gap-2 text-sm ${etat.type === "erreur" ? "text-red-700 dark:text-red-300" : "text-zinc-600 dark:text-zinc-400"}`}
    >
      {etat.type === "erreur" ? (
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      ) : (
        <span
          className={`mt-[0.45rem] size-1.5 shrink-0 ${etat.type === "enregistrement" ? "animate-pulse bg-amber-500" : majLe ? "bg-emerald-600 dark:bg-emerald-400" : "bg-zinc-400"}`}
          aria-hidden="true"
        />
      )}
      <span className={compact && etat.type !== "erreur" ? "truncate" : "text-pretty"}>{texteEtat}</span>
    </p>
  );

  const reprise = () =>
    etat.type === "erreur" ? (
      etat.session ? (
        <a
          href={`${accueil}/questions`}
          className="inline-flex h-9 items-center border border-red-300 px-3 text-sm font-medium text-red-800 hover:border-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-red-900 dark:text-red-200"
        >
          Se reconnecter
        </a>
      ) : (
        <button
          type="button"
          onClick={() => enregistrer()}
          className="inline-flex h-9 items-center border border-red-300 px-3 text-sm font-medium text-red-800 hover:border-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-red-900 dark:text-red-200"
        >
          Réessayer
        </button>
      )
    ) : null;

  const champ = (question: Question) => {
    const r = reponses[question.id];
    const onChange = (x: Reponse) => maj(question.id, x);
    switch (question.type) {
      case "choix-unique":
      case "choix-multiple":
        return <ChampChoix question={question} reponse={r} onChange={onChange} />;
      case "texte-court":
      case "texte-long":
        return <ChampTexte question={question} reponse={r} onChange={onChange} />;
      case "validation":
        return <ChampValidation question={question} reponse={r} onChange={onChange} />;
      case "variantes":
        return (
          <ChampVariantes question={question} reponse={r} onChange={onChange} urlImage={urlImage} agrandir={setImage} />
        );
      case "tableau-saisie":
        return <ChampTableau question={question} reponse={r} onChange={onChange} />;
    }
  };

  return (
    <>
      <div className="mt-14 grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-8">
            <nav aria-label="Sommaire">
              <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Sommaire</h2>
              <ol className="mt-4 border-l border-zinc-200 dark:border-zinc-800">
                {questionnaire.sections.map((s) => {
                  const qs = s.questions ?? [];
                  const faites = qs.filter((q) => estRepondue(q, reponses[q.id])).length;
                  const ici = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#s-${s.id}`}
                        aria-current={ici ? "location" : undefined}
                        className={`-ml-px flex items-baseline justify-between gap-3 border-l py-2 pr-1 pl-4 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${ici ? "border-zinc-900 font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100" : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}
                      >
                        <span>{s.titre}</span>
                        {qs.length > 0 && (
                          <span
                            className={`shrink-0 text-xs tabular-nums ${faites === qs.length ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-500"}`}
                          >
                            {faites}/{qs.length}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href="#envoi"
                    className="-ml-px flex border-l border-transparent py-2 pl-4 text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Envoi
                  </a>
                </li>
              </ol>
            </nav>
            <div className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <p className="text-sm text-zinc-900 tabular-nums dark:text-zinc-100">
                <strong className="text-2xl font-medium">{repondues}</strong>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {" "}
                  {repondues > 1 ? "questions répondues" : "question répondue"} sur {total}
                </span>
              </p>
              <div className="h-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true">
                <div
                  className="h-full bg-emerald-600 transition-[width] duration-300 ease-out dark:bg-emerald-400"
                  style={{ width: `${total ? (repondues / total) * 100 : 0}%` }}
                />
              </div>
              {ligneEtat()}
              {reprise()}
              {dernierEnvoi && monte && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Envoyé {quand(dernierEnvoi)}.</p>
              )}
            </div>
          </div>
        </aside>

        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          onBlur={surSortie}
          className="min-w-0 space-y-20"
          aria-label={questionnaire.titre}
        >
          {questionnaire.sections.map((s) => (
            <section key={s.id} id={`s-${s.id}`} aria-labelledby={`t-${s.id}`} className="scroll-mt-32 space-y-8">
              <div className="space-y-3">
                <h2
                  id={`t-${s.id}`}
                  className="text-3xl font-medium tracking-tight text-balance text-zinc-900 md:text-4xl dark:text-zinc-100"
                >
                  {s.titre}
                </h2>
                {s.intro && (
                  <p className="max-w-[68ch] text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">{s.intro}</p>
                )}
              </div>
              {s.blocs && s.blocs.length > 0 && <Blocs blocs={s.blocs} urlImage={urlImage} agrandir={setImage} />}
              {(s.questions ?? []).map((q) => (
                <CadreQuestion
                  key={q.id}
                  question={q}
                  numero={numeros.get(q.id) ?? 0}
                  reponse={reponses[q.id]}
                  urlImage={urlImage}
                  agrandir={setImage}
                >
                  {champ(q)}
                </CadreQuestion>
              ))}
            </section>
          ))}

          <section id="envoi" aria-labelledby="t-envoi" className="scroll-mt-32 border border-zinc-900 bg-zinc-50 p-6 sm:p-8 dark:border-zinc-100 dark:bg-zinc-900">
            <h2 id="t-envoi" className="text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl dark:text-zinc-100">
              Envoi
            </h2>
            <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
              Vos réponses sont enregistrées au fil de la saisie. Le bouton prévient Julian Bonne qu&apos;elles sont
              prêtes à lire. Vous pourrez encore les modifier et les renvoyer.
            </p>
            <p className="mt-4 text-sm text-zinc-600 tabular-nums dark:text-zinc-400">
              {repondues} {repondues > 1 ? "questions répondues" : "question répondue"} sur {total}
              {repondues < total && " · aucune n'est obligatoire"}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={envoyer}
                disabled={envoi === "en-cours"}
                className="group inline-flex h-12 items-center justify-center gap-2 border border-zinc-900 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-progress disabled:opacity-60 max-sm:w-full dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {envoi === "en-cours" ? "Envoi…" : dernierEnvoi ? "Renvoyer mes réponses" : "Envoyer mes réponses"}
                {envoi !== "en-cours" && (
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                )}
              </button>
            </div>
            <div role="status" aria-live="polite" className="mt-4 min-h-6">
              {envoi === "fait" && dernierEnvoi && (
                <p className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300">
                  <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Réponses envoyées {quand(dernierEnvoi)}. Merci.
                </p>
              )}
              {envoi !== "fait" && dernierEnvoi && monte && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Dernier envoi {quand(dernierEnvoi)}.</p>
              )}
            </div>
            {envoi === "erreur" && etat.type === "erreur" && (
              <div role="alert" className="mt-2 flex flex-wrap items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
                <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                <span className="flex-1 text-pretty">Envoi non fait. {etat.message}</span>
                {reprise()}
              </div>
            )}
          </section>
        </form>
      </div>

      {/* Une seule annonce pour les lecteurs d'écran, sur les erreurs d'enregistrement. */}
      <p role="alert" className="sr-only">
        {etat.type === "erreur" && envoi !== "erreur" ? etat.message : ""}
      </p>

      {/* Barre d'état sur téléphone et tablette. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-2.5 backdrop-blur-md lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="shrink-0 text-sm font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
            {repondues}/{total} <span className="font-normal text-zinc-600 dark:text-zinc-400">répondues</span>
          </p>
          <div className="flex min-w-0 items-center gap-3">
            {ligneEtat(true)}
            {reprise()}
          </div>
        </div>
      </div>

      <Loupe image={image} fermer={() => setImage(null)} />
    </>
  );
}

/** Image en plein écran : <dialog> natif (Échap ferme, focus gardé dans la fenêtre). */
function Loupe({
  image,
  fermer,
}: {
  image: { src: string; alt: string; legende?: string } | null;
  fermer: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (image && !d.open) d.showModal();
    if (!image && d.open) d.close();
  }, [image]);
  return (
    <dialog
      ref={ref}
      onClose={fermer}
      onClick={(e) => e.target === e.currentTarget && fermer()}
      aria-label={image ? image.alt : "Image"}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-zinc-950/85 backdrop:backdrop-blur-sm open:flex"
    >
      {image && (
        <figure className="flex max-h-[100dvh] w-screen flex-col items-center justify-center gap-3 p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && fermer()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="max-h-[calc(100dvh-8rem)] max-w-full bg-white object-contain shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)]" />
          {image.legende && <figcaption className="max-w-[68ch] text-center text-sm text-pretty text-zinc-200">{image.legende}</figcaption>}
          <button
            type="button"
            onClick={fermer}
            autoFocus
            className="fixed top-4 right-4 inline-flex h-10 items-center gap-2 border border-zinc-600 bg-zinc-900 px-3 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <X className="size-4" aria-hidden="true" />
            Fermer
          </button>
        </figure>
      )}
    </dialog>
  );
}
