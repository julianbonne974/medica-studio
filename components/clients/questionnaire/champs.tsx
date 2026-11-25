"use client";

import { useId, useRef } from "react";
import { Check, Maximize2, Plus, Trash2, X } from "lucide-react";
import {
  AUCUNE,
  AUTRE,
  BORNES,
  estRepondue,
  type Question,
  type QuestionChoix,
  type QuestionTableau,
  type QuestionTexte,
  type QuestionValidation,
  type QuestionVariantes,
  type Reponse,
  type ReponseChoixMultiple,
  type ReponseChoixUnique,
  type ReponseTableau,
  type ReponseTexte,
  type ReponseValidation,
  type ReponseVariantes,
} from "@/lib/clients/questionnaire-modele";

/* Vocabulaire visuel commun ------------------------------------------------------- */

export const CHAMP =
  "w-full border border-zinc-300 bg-white px-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-500 hover:border-zinc-400 focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-emerald-600/40 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:[color-scheme:dark] dark:hover:border-zinc-600 dark:focus-visible:border-zinc-300";

const CASE =
  "group/case flex cursor-pointer items-start gap-3 border border-zinc-200 bg-white px-4 py-3 text-zinc-800 transition-colors hover:border-zinc-400 has-[:checked]:border-zinc-900 has-[:checked]:bg-zinc-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:has-[:checked]:border-zinc-200 dark:has-[:checked]:bg-zinc-900";

const MARQUE = "mt-0.5 size-[1.125rem] shrink-0 accent-emerald-600 dark:accent-emerald-500";

const BOUTON_DISCRET =
  "inline-flex h-9 items-center gap-2 border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100";

type Maj<R> = (r: R) => void;

function Commentaire({
  valeur,
  onChange,
  libelle = "Commentaire (facultatif)",
}: {
  valeur: string;
  onChange: (v: string) => void;
  libelle?: string;
}) {
  const id = useId();
  return (
    <div className="mt-4 grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {libelle}
      </label>
      <textarea
        id={id}
        value={valeur}
        maxLength={BORNES.texte}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className={`${CHAMP} min-h-24 resize-y py-2.5 leading-relaxed`}
      />
    </div>
  );
}

/* Cadre d'une question ------------------------------------------------------------ */

export function CadreQuestion({
  question,
  numero,
  reponse,
  urlImage,
  agrandir,
  children,
}: {
  question: Question;
  numero: number;
  reponse: Reponse | undefined;
  urlImage: (src: string) => string;
  agrandir: Agrandir;
  children: React.ReactNode;
}) {
  const idAide = useId();
  const repondue = estRepondue(question, reponse);
  const aide = question.aide || ("exemple" in question && question.exemple);
  return (
    <fieldset
      id={`q-${question.id}`}
      aria-describedby={aide ? idAide : undefined}
      className="min-w-0 scroll-mt-32 border-t border-zinc-200 pt-8 dark:border-zinc-800"
    >
      <legend className="float-left mb-3 grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-2">
        <span className="text-xl font-medium leading-none text-emerald-600 tabular-nums dark:text-emerald-400">
          {numero}
        </span>
        <span className="text-lg font-medium leading-snug text-balance text-zinc-900 dark:text-zinc-100">
          {question.intitule}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium transition-opacity ${repondue ? "text-emerald-700 opacity-100 dark:text-emerald-400" : "opacity-0"}`}
        >
          <Check className="size-3.5" aria-hidden="true" />
          <span>{repondue ? "Répondu" : ""}</span>
        </span>
      </legend>
      <div className="clear-left sm:pl-[2.75rem]">
        {aide && (
          <div id={idAide} className="mb-4 max-w-[68ch] space-y-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {question.aide && <p className="text-pretty">{question.aide}</p>}
            {"exemple" in question && question.exemple && (
              <p className="text-pretty">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Exemple : </span>
                {question.exemple}
              </p>
            )}
          </div>
        )}
        {question.image && (
          <figure className="mb-5 space-y-2">
            <button
              type="button"
              onClick={() =>
                agrandir({ src: urlImage(question.image as string), alt: question.intitule, legende: question.legende })
              }
              className="group/image relative block w-full cursor-zoom-in border border-zinc-200 bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-900"
              aria-label={`Agrandir l'image : ${question.legende ?? question.intitule}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlImage(question.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[28rem] w-auto object-contain transition-transform duration-300 ease-out group-hover/image:scale-[1.01]"
              />
              <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 border border-zinc-200 bg-white/95 px-2 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200">
                <Maximize2 className="size-3.5" aria-hidden="true" />
                Agrandir
              </span>
            </button>
            {question.legende && (
              <figcaption className="text-sm text-pretty text-zinc-600 dark:text-zinc-400">{question.legende}</figcaption>
            )}
          </figure>
        )}
        {children}
      </div>
    </fieldset>
  );
}

/* Choix unique et multiple -------------------------------------------------------- */

export function ChampChoix({
  question,
  reponse,
  onChange,
}: {
  question: QuestionChoix;
  reponse: Reponse | undefined;
  onChange: Maj<Reponse>;
}) {
  const multiple = question.type === "choix-multiple";
  const nom = useId();
  const idAutre = useId();
  const choisis: string[] = multiple
    ? ((reponse as ReponseChoixMultiple | undefined)?.choix ?? [])
    : [(reponse as ReponseChoixUnique | undefined)?.choix ?? ""].filter(Boolean);
  const autre = (reponse as ReponseChoixUnique | undefined)?.autre ?? "";
  const commentaire = (reponse as ReponseChoixUnique | undefined)?.commentaire ?? "";

  // N'envoie que les champs que le fichier de contenu prévoit (l'API refuse les autres).
  const emettre = (choix: string[], a = autre, c = commentaire) => {
    const r: Record<string, unknown> = multiple ? { choix } : { choix: choix[0] ?? "" };
    if (question.autre) r.autre = a;
    if (question.commentaire) r.commentaire = c;
    onChange(r as Reponse);
  };
  const basculer = (id: string, coche: boolean) => {
    if (!multiple) return emettre(coche ? [id] : []);
    emettre(coche ? [...choisis.filter((x) => x !== id), id] : choisis.filter((x) => x !== id));
  };
  const options = [...question.options, ...(question.autre ? [{ id: AUTRE, libelle: "Autre" }] : [])];

  return (
    <>
      {multiple && <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">Plusieurs réponses possibles.</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label key={o.id} className={CASE}>
            <input
              type={multiple ? "checkbox" : "radio"}
              name={nom}
              value={o.id}
              checked={choisis.includes(o.id)}
              onChange={(e) => basculer(o.id, e.target.checked)}
              className={MARQUE}
            />
            <span className="text-pretty leading-snug">{o.libelle}</span>
          </label>
        ))}
      </div>
      {question.autre && choisis.includes(AUTRE) && (
        <div className="mt-3 grid gap-1.5">
          <label htmlFor={idAutre} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Précisez « Autre »
          </label>
          <input
            id={idAutre}
            type="text"
            value={autre}
            maxLength={BORNES.texteCourt}
            onChange={(e) => emettre(choisis, e.target.value)}
            className={`${CHAMP} h-11`}
          />
        </div>
      )}
      {!multiple && choisis.length > 0 && (
        <button type="button" onClick={() => emettre([])} className={`${BOUTON_DISCRET} mt-3`}>
          <X className="size-4" aria-hidden="true" />
          Retirer mon choix
        </button>
      )}
      {question.commentaire && <Commentaire valeur={commentaire} onChange={(c) => emettre(choisis, autre, c)} />}
    </>
  );
}

/* Textes -------------------------------------------------------------------------- */

export function ChampTexte({
  question,
  reponse,
  onChange,
}: {
  question: QuestionTexte;
  reponse: Reponse | undefined;
  onChange: Maj<Reponse>;
}) {
  const texte = (reponse as ReponseTexte | undefined)?.texte ?? "";
  if (question.type === "texte-court") {
    return (
      <input
        type="text"
        aria-label={question.intitule}
        value={texte}
        maxLength={BORNES.texteCourt}
        onChange={(e) => onChange({ texte: e.target.value })}
        className={`${CHAMP} h-11 max-w-xl`}
      />
    );
  }
  return (
    <div className="grid gap-1.5">
      <textarea
        aria-label={question.intitule}
        value={texte}
        maxLength={BORNES.texte}
        rows={5}
        onChange={(e) => onChange({ texte: e.target.value })}
        className={`${CHAMP} min-h-36 resize-y py-2.5 leading-relaxed`}
      />
      <p className="text-right text-xs text-zinc-500 tabular-nums dark:text-zinc-400" aria-hidden="true">
        {texte.length} / {BORNES.texte}
      </p>
    </div>
  );
}

/* Validation : je garde / je change ----------------------------------------------- */

const SEGMENT =
  "flex h-12 cursor-pointer items-center justify-center gap-2 border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 has-[:checked]:border-zinc-900 has-[:checked]:bg-zinc-900 has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-300 dark:has-[:checked]:border-zinc-100 dark:has-[:checked]:bg-zinc-100 dark:has-[:checked]:text-zinc-900";

export function ChampValidation({
  question,
  reponse,
  onChange,
}: {
  question: QuestionValidation;
  reponse: Reponse | undefined;
  onChange: Maj<Reponse>;
}) {
  const nom = useId();
  const idPrecision = useId();
  const r = (reponse as ReponseValidation | undefined) ?? {};
  return (
    <>
      <div className="grid max-w-md grid-cols-2 gap-2">
        {(
          [
            ["garder", "Je garde"],
            ["changer", "Je change"],
          ] as const
        ).map(([valeur, libelle]) => (
          <label key={valeur} className={SEGMENT}>
            <input
              type="radio"
              name={nom}
              value={valeur}
              checked={r.decision === valeur}
              onChange={() => onChange({ decision: valeur, precision: r.precision ?? "" })}
              className="sr-only"
            />
            {libelle}
          </label>
        ))}
      </div>
      {r.decision === "changer" && (
        <div className="mt-4 grid gap-1.5">
          <label htmlFor={idPrecision} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Ce que vous voulez à la place
          </label>
          <textarea
            id={idPrecision}
            value={r.precision ?? ""}
            maxLength={BORNES.texte}
            rows={3}
            onChange={(e) => onChange({ decision: "changer", precision: e.target.value })}
            className={`${CHAMP} min-h-24 resize-y py-2.5 leading-relaxed`}
          />
        </div>
      )}
      {r.decision && (
        <button
          type="button"
          onClick={() => onChange({})}
          className={`${BOUTON_DISCRET} mt-3`}
        >
          <X className="size-4" aria-hidden="true" />
          Retirer ma réponse
        </button>
      )}
    </>
  );
}

/* Variantes visuelles ------------------------------------------------------------- */

export type Agrandir = (image: { src: string; alt: string; legende?: string }) => void;

export function ChampVariantes({
  question,
  reponse,
  onChange,
  urlImage,
  agrandir,
}: {
  question: QuestionVariantes;
  reponse: Reponse | undefined;
  onChange: Maj<Reponse>;
  urlImage: (src: string) => string;
  agrandir: Agrandir;
}) {
  const nom = useId();
  const r = (reponse as ReponseVariantes | undefined) ?? {};
  const emettre = (choix: string, commentaire = r.commentaire ?? "") =>
    onChange(question.commentaire ? { choix, commentaire } : { choix });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {question.options.map((o) => {
          const choisie = r.choix === o.id;
          return (
            <div
              key={o.id}
              className={`flex flex-col border bg-white transition-colors dark:bg-zinc-950 ${choisie ? "border-zinc-900 ring-1 ring-zinc-900 dark:border-zinc-100 dark:ring-zinc-100" : "border-zinc-200 dark:border-zinc-800"}`}
            >
              <button
                type="button"
                onClick={() => agrandir({ src: urlImage(o.image), alt: `${o.libelle}${o.legende ? ` : ${o.legende}` : ""}`, legende: o.legende })}
                className="group/image relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border-b border-zinc-200 bg-zinc-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-900"
                aria-label={`Agrandir l'image : ${o.libelle}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlImage(o.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain transition-transform duration-300 ease-out group-hover/image:scale-[1.02]"
                />
                <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 border border-zinc-200 bg-white/95 px-2 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200">
                  <Maximize2 className="size-3.5" aria-hidden="true" />
                  Agrandir
                </span>
              </button>
              <label className="flex flex-1 cursor-pointer items-start gap-3 px-4 py-3.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-emerald-600">
                <input
                  type="radio"
                  name={nom}
                  value={o.id}
                  checked={choisie}
                  onChange={() => emettre(o.id)}
                  className={MARQUE}
                />
                <span className="grid gap-1">
                  <span className="font-medium leading-snug text-zinc-900 dark:text-zinc-100">{o.libelle}</span>
                  {o.legende && (
                    <span className="text-sm leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">{o.legende}</span>
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {question.aucune && (
          <label className={`${CASE} min-w-0 sm:w-auto`}>
            <input
              type="radio"
              name={nom}
              value={AUCUNE}
              checked={r.choix === AUCUNE}
              onChange={() => emettre(AUCUNE)}
              className={MARQUE}
            />
            <span>Aucune ne me convient</span>
          </label>
        )}
        {r.choix && (
          <button type="button" onClick={() => emettre("")} className={BOUTON_DISCRET}>
            <X className="size-4" aria-hidden="true" />
            Retirer mon choix
          </button>
        )}
      </div>
      {question.commentaire && (
        <Commentaire
          valeur={r.commentaire ?? ""}
          onChange={(c) => onChange({ choix: r.choix ?? "", commentaire: c })}
          libelle={question.aucune && r.choix === AUCUNE ? "Ce qui ne vous convient pas (facultatif)" : "Commentaire (facultatif)"}
        />
      )}
    </>
  );
}

/* Tableau à remplir --------------------------------------------------------------- */

export function ChampTableau({
  question,
  reponse,
  onChange,
}: {
  question: QuestionTableau;
  reponse: Reponse | undefined;
  onChange: Maj<Reponse>;
}) {
  const initiales = question.lignesInitiales ?? 3;
  const enregistrees = (reponse as ReponseTableau | undefined)?.lignes ?? [];
  const lignes: Record<string, string>[] = [
    ...enregistrees,
    ...Array.from({ length: Math.max(0, initiales - enregistrees.length) }, () => ({})),
  ];
  // Clés stables pour React : supprimer une ligne du milieu ne décale pas le focus des autres.
  const cles = useRef<number[]>([]);
  const suivante = useRef(0);
  while (cles.current.length < lignes.length) cles.current.push(suivante.current++);
  cles.current.length = lignes.length;

  const emettre = (nouvelles: Record<string, string>[]) => onChange({ lignes: nouvelles });
  const modifier = (i: number, col: string, v: string) =>
    emettre(lignes.map((l, j) => (j === i ? { ...l, [col]: v } : l)));
  const supprimer = (i: number) => {
    cles.current.splice(i, 1);
    emettre(lignes.filter((_, j) => j !== i));
  };
  const ajouter = () => emettre([...lignes, {}]);
  const n = question.colonnes.length;
  // Grille des colonnes sur grand écran ; sur téléphone, chaque ligne s'empile en carte.
  const gabarit = { "--colonnes": `repeat(${n}, minmax(0, 1fr)) 2.75rem` } as React.CSSProperties;

  return (
    <div>
      <div
        className="hidden gap-2 border-b border-zinc-200 pb-2 text-xs font-medium uppercase tracking-wider text-zinc-500 md:grid md:grid-cols-[var(--colonnes)] dark:border-zinc-800 dark:text-zinc-400"
        style={gabarit}
        aria-hidden="true"
      >
        {question.colonnes.map((c) => (
          <span key={c.id}>{c.libelle}</span>
        ))}
        <span />
      </div>
      <ol className="mt-2 grid gap-3 md:gap-2">
        {lignes.map((l, i) => (
          <li
            key={cles.current[i]}
            className="grid gap-3 border border-zinc-200 p-3 md:grid-cols-[var(--colonnes)] md:gap-2 md:border-0 md:p-0 dark:border-zinc-800"
            style={gabarit}
          >
            <span className="text-xs font-medium text-zinc-500 md:sr-only dark:text-zinc-400">Ligne {i + 1}</span>
            {question.colonnes.map((c) => (
              <label key={c.id} className="grid gap-1">
                <span className="text-sm font-medium text-zinc-700 md:sr-only dark:text-zinc-300">
                  {c.libelle}
                  <span className="sr-only">, ligne {i + 1}</span>
                </span>
                {c.type === "choix" ? (
                  <select
                    value={l[c.id] ?? ""}
                    onChange={(e) => modifier(i, c.id, e.target.value)}
                    className={`${CHAMP} h-11`}
                  >
                    <option value="">Choisir…</option>
                    {(c.options ?? []).map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={c.type === "tel" ? "tel" : "text"}
                    inputMode={c.type === "tel" ? "tel" : undefined}
                    autoComplete="off"
                    value={l[c.id] ?? ""}
                    maxLength={c.type === "tel" ? BORNES.tel : BORNES.cellule}
                    onChange={(e) => modifier(i, c.id, e.target.value)}
                    className={`${CHAMP} h-11`}
                  />
                )}
              </label>
            ))}
            <button
              type="button"
              onClick={() => supprimer(i)}
              aria-label={`Supprimer la ligne ${i + 1}`}
              className="inline-flex h-11 items-center justify-center gap-2 border border-zinc-200 text-zinc-500 transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 max-md:justify-self-start max-md:px-3 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-red-900 dark:hover:text-red-300"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              <span className="text-sm md:hidden">Supprimer la ligne</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={ajouter} disabled={lignes.length >= BORNES.lignes} className={BOUTON_DISCRET}>
          <Plus className="size-4" aria-hidden="true" />
          Ajouter une ligne
        </button>
        {lignes.length >= BORNES.lignes && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{BORNES.lignes} lignes au plus.</span>
        )}
      </div>
    </div>
  );
}
