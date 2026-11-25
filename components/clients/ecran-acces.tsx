import { Separator } from "@/components/ui/separator";
import { FormulaireAcces } from "@/components/clients/formulaire-acces";
import { cheminProjet, type ProjetClient } from "@/lib/clients/projets";

type Requete = Record<string, string | string[] | undefined>;

const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function messageAcces(q: Requete, suite?: string) {
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
  if (suite === "questions")
    return { ton: "info" as const, texte: "Connectez-vous pour répondre aux questions." };
  return undefined;
}

/** Formulaire Prénom + Code d'un projet. `suite` ramène sur la page demandée après connexion. */
export function EcranAcces({ projet, q, suite }: { projet: ProjetClient; q: Requete; suite?: "questions" }) {
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
          action={`${cheminProjet(projet.slug)}/acces`}
          avecPrenom
          message={messageAcces(q, suite)}
          suite={suite}
        />
        <p className="text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          La connexion dépose un seul cookie, strictement nécessaire, valable 30 jours. Il garde votre
          prénom et se supprime à la déconnexion.
        </p>
      </div>
    </div>
  );
}
