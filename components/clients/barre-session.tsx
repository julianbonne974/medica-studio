import { LogOut } from "lucide-react";

/** Bandeau du haut d'un espace connecté : qui est connecté, et le bouton de déconnexion. */
export function BarreSession({
  libelle,
  deconnexion,
  children,
}: {
  libelle: React.ReactNode;
  deconnexion: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-zinc-200 pb-5 text-sm dark:border-zinc-800">
      <p className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400">
        <span className="size-1.5 shrink-0 bg-emerald-600" aria-hidden="true" />
        {libelle}
      </p>
      <div className="flex items-center gap-3">
        {children}
        <form action={deconnexion} method="post">
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 border border-zinc-200 bg-zinc-50 px-3 font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
