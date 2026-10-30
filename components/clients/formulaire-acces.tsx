"use client";

import { useState } from "react";
import { ArrowRight, CircleAlert, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = { ton: "erreur" | "info"; texte: string };

const CHAMP =
  "h-11 rounded-none border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800";

export function FormulaireAcces({
  action,
  avecPrenom,
  message,
  bloque,
}: {
  action: string;
  avecPrenom: boolean;
  message?: Message;
  bloque?: boolean;
}) {
  const [envoi, setEnvoi] = useState(false);
  const idMessage = "acces-message";

  return (
    <form
      action={action}
      method="post"
      className="space-y-6"
      onSubmit={() => setEnvoi(true)}
      aria-describedby={message ? idMessage : undefined}
    >
      {message && (
        <p
          id={idMessage}
          role={message.ton === "erreur" ? "alert" : "status"}
          className={
            message.ton === "erreur"
              ? "flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
              : "flex items-start gap-3 border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          }
        >
          {message.ton === "erreur" ? (
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          ) : (
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{message.texte}</span>
        </p>
      )}

      {avecPrenom && (
        <div className="space-y-2">
          <label htmlFor="prenom" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Prénom
          </label>
          <Input
            id="prenom"
            name="prenom"
            type="text"
            autoComplete="given-name"
            maxLength={40}
            required
            disabled={bloque}
            className={CHAMP}
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="code" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Code d&apos;accès
        </label>
        <Input
          id="code"
          name="code"
          type="password"
          autoComplete="current-password"
          maxLength={200}
          required
          disabled={bloque}
          aria-invalid={message?.ton === "erreur" && !bloque ? true : undefined}
          className={CHAMP}
        />
      </div>

      <Button
        type="submit"
        disabled={envoi || bloque}
        className="group h-12 w-full rounded-none border border-zinc-900 bg-zinc-900 font-medium text-white shadow-none transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {envoi ? (
          "Vérification…"
        ) : (
          <>
            Entrer
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
