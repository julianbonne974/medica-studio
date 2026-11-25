"use client";

import { ChevronDown, Maximize2 } from "lucide-react";
import type { Bloc } from "@/lib/clients/questionnaire-modele";
import type { Agrandir } from "./champs";

/** Contenu à lire d'une section : paragraphes, listes, images, tableaux, encadrés, dépliants. */
export function Blocs({
  blocs,
  urlImage,
  agrandir,
}: {
  blocs: Bloc[];
  urlImage: (src: string) => string;
  agrandir: Agrandir;
}) {
  return (
    <div className="space-y-5">
      {blocs.map((b, i) => {
        switch (b.type) {
          case "depliant":
            return (
              <details
                key={i}
                className="group/depliant border border-zinc-200 bg-white open:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:open:border-zinc-700"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-100 dark:hover:bg-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span className="text-pretty">{b.titre}</span>
                  <ChevronDown
                    className="size-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open/depliant:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-zinc-200 px-4 py-5 dark:border-zinc-800">
                  <Blocs blocs={b.blocs} urlImage={urlImage} agrandir={agrandir} />
                </div>
              </details>
            );
          case "paragraphe":
            return (
              <p key={i} className="max-w-[68ch] whitespace-pre-line text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
                {b.texte}
              </p>
            );
          case "liste":
            return (
              <ul key={i} className="max-w-[68ch] space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 bg-zinc-400 dark:bg-zinc-600" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={i} className="space-y-2">
                <button
                  type="button"
                  onClick={() => agrandir({ src: urlImage(b.src), alt: b.alt, legende: b.legende })}
                  className="group/image relative block w-full cursor-zoom-in border border-zinc-200 bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-900"
                  aria-label={`Agrandir l'image : ${b.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={urlImage(b.src)} alt={b.alt} loading="lazy" decoding="async" className="mx-auto max-h-[32rem] w-auto object-contain" />
                  <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 border border-zinc-200 bg-white/95 px-2 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200">
                    <Maximize2 className="size-3.5" aria-hidden="true" />
                    Agrandir
                  </span>
                </button>
                {b.legende && (
                  <figcaption className="text-sm text-pretty text-zinc-600 dark:text-zinc-400">{b.legende}</figcaption>
                )}
              </figure>
            );
          case "tableau":
            return (
              // Largeur minimale par colonne : sur téléphone, le tableau défile dans son cadre.
              <div
                key={i}
                role="region"
                aria-label={`Tableau : ${b.colonnes.join(", ")}`}
                tabIndex={0}
                className="overflow-x-auto overscroll-x-contain border border-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800"
              >
                <table className="w-full border-collapse text-sm" style={{ minWidth: `${b.colonnes.length * 9}rem` }}>
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      {b.colonnes.map((c, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {b.lignes.map((l, j) => (
                      <tr key={j}>
                        {l.map((cellule, k) => (
                          <td
                            key={k}
                            className={`px-3 py-2.5 align-top text-pretty break-words whitespace-pre-line ${k === 0 ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300"}${k === 0 && cellule.length <= 12 ? " whitespace-nowrap" : ""}`}
                          >
                            {cellule}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "encadre":
            return (
              <div
                key={i}
                role="note"
                className="max-w-[68ch] border border-emerald-600/30 bg-emerald-50 px-5 py-4 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-50"
              >
                {b.titre && (
                  <p className="mb-1.5 flex items-center gap-2.5 font-medium">
                    <span className="size-1.5 shrink-0 bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
                    {b.titre}
                  </p>
                )}
                <p className="whitespace-pre-line text-pretty leading-relaxed">{b.texte}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
