/**
 * Questionnaires de l'espace clients : types du fichier de contenu et des réponses, et fonctions
 * pures partagées par la page (navigateur), l'API et l'administration. Aucune dépendance Node ici.
 * Format complet : CLIENTS.md, section « Questionnaires ».
 */

/* Contenu ------------------------------------------------------------------------- */

/** Blocs simples : ceux qu'un dépliant peut contenir. */
export type BlocSimple =
  | { type: "paragraphe"; texte: string }
  | { type: "liste"; items: string[] }
  | { type: "image"; src: string; alt: string; legende?: string }
  | { type: "tableau"; colonnes: string[]; lignes: string[][] }
  | { type: "encadre"; titre?: string; texte: string };

/** Dépliant : fermé par défaut, sans dépliant imbriqué. */
export type BlocDepliant = { type: "depliant"; titre: string; blocs: BlocSimple[] };

export type Bloc = BlocSimple | BlocDepliant;

export type OptionChoix = { id: string; libelle: string };
export type OptionVariante = { id: string; libelle: string; image: string; legende?: string };
export type ColonneSaisie = {
  id: string;
  libelle: string;
  type: "texte" | "tel" | "choix";
  options?: string[];
};

type BaseQuestion = {
  id: string;
  intitule: string;
  aide?: string;
  /** illustration facultative, relative à private/clients/<projet>/ */
  image?: string;
  /** légende de l'illustration */
  legende?: string;
};

export type QuestionChoix = BaseQuestion & {
  type: "choix-unique" | "choix-multiple";
  options: OptionChoix[];
  autre?: boolean;
  commentaire?: boolean;
};
export type QuestionTexte = BaseQuestion & { type: "texte-court" | "texte-long"; exemple?: string };
export type QuestionValidation = BaseQuestion & { type: "validation" };
export type QuestionVariantes = BaseQuestion & {
  type: "variantes";
  options: OptionVariante[];
  aucune?: boolean;
  commentaire?: boolean;
};
export type QuestionTableau = BaseQuestion & {
  type: "tableau-saisie";
  colonnes: ColonneSaisie[];
  lignesInitiales?: number;
};

export type Question =
  | QuestionChoix
  | QuestionTexte
  | QuestionValidation
  | QuestionVariantes
  | QuestionTableau;

/** Groupe d'une section : intertitre, puis ses blocs et ses questions. */
export type Groupe = {
  id: string;
  titre: string;
  intro?: string;
  blocs?: Bloc[];
  questions?: Question[];
};

export type Section = {
  id: string;
  titre: string;
  intro?: string;
  blocs?: Bloc[];
  questions?: Question[];
  /** rendus après les blocs et les questions propres de la section */
  groupes?: Groupe[];
};

export type Questionnaire = {
  id: string;
  projet: string;
  titre: string;
  sousTitre?: string;
  /** AAAA-MM-JJ, affiché « si possible avant le … » */
  dateSouhaitee?: string;
  intro?: string[];
  sections: Section[];
};

/* Réponses ------------------------------------------------------------------------ */

/** Valeur réservée au choix « Autre » (choix unique ou multiple). */
export const AUTRE = "autre";
/** Valeur réservée à « Aucune ne me convient » (variantes). */
export const AUCUNE = "aucune";

export type ReponseChoixUnique = { choix?: string; autre?: string; commentaire?: string };
export type ReponseChoixMultiple = { choix: string[]; autre?: string; commentaire?: string };
export type ReponseTexte = { texte: string };
export type ReponseValidation = { decision?: "garder" | "changer"; precision?: string };
export type ReponseVariantes = { choix?: string; commentaire?: string };
export type ReponseTableau = { lignes: Record<string, string>[] };

export type Reponse =
  | ReponseChoixUnique
  | ReponseChoixMultiple
  | ReponseTexte
  | ReponseValidation
  | ReponseVariantes
  | ReponseTableau;

export type Reponses = Record<string, Reponse>;

/** Document stocké pour une personne : clé questionnaires/<projet>/<id>/<prénom normalisé>. */
export type DossierReponses = {
  prenom: string;
  reponses: Reponses;
  /** ISO, dernière modification */
  majLe: string;
  /** ISO, chaque clic sur « Envoyer mes réponses » */
  envois: string[];
};

/* Bornes, partagées par le formulaire et l'API ---------------------------------------- */

export const BORNES = {
  texte: 4000,
  texteCourt: 500,
  cellule: 500,
  tel: 30,
  lignes: 40,
  corps: 64 * 1024,
} as const;

/* Fonctions pures ----------------------------------------------------------------- */

/** Questions d'une section, dans l'ordre d'affichage : les siennes, puis celles de chaque groupe. */
export function questionsDeSection(section: Section): { groupe?: Groupe; question: Question }[] {
  return [
    ...(section.questions ?? []).map((question) => ({ question })),
    ...(section.groupes ?? []).flatMap((groupe) =>
      (groupe.questions ?? []).map((question) => ({ groupe, question })),
    ),
  ];
}

export function toutesLesQuestions(q: Questionnaire): { section: Section; groupe?: Groupe; question: Question }[] {
  return q.sections.flatMap((section) => questionsDeSection(section).map((x) => ({ section, ...x })));
}

const plein = (s: unknown) => typeof s === "string" && s.trim().length > 0;

/** Vrai si la réponse dit quelque chose (un choix, un texte, une ligne remplie…). */
export function estRepondue(question: Question, reponse: Reponse | undefined): boolean {
  if (!reponse) return false;
  switch (question.type) {
    case "choix-unique": {
      const r = reponse as ReponseChoixUnique;
      return plein(r.choix) || plein(r.commentaire);
    }
    case "choix-multiple": {
      const r = reponse as ReponseChoixMultiple;
      return (Array.isArray(r.choix) && r.choix.length > 0) || plein(r.commentaire);
    }
    case "texte-court":
    case "texte-long":
      return plein((reponse as ReponseTexte).texte);
    case "validation":
      return Boolean((reponse as ReponseValidation).decision);
    case "variantes": {
      const r = reponse as ReponseVariantes;
      return plein(r.choix) || plein(r.commentaire);
    }
    case "tableau-saisie":
      return ((reponse as ReponseTableau).lignes ?? []).some((l) => Object.values(l).some(plein));
  }
}

export function compterRepondues(q: Questionnaire, reponses: Reponses): number {
  return toutesLesQuestions(q).filter(({ question }) => estRepondue(question, reponses[question.id]))
    .length;
}

export type ReponseLisible = { reponse: string; autre: string; commentaire: string };

/** Réponse mise en mots, pour l'administration et l'export CSV. */
export function reponseLisible(question: Question, reponse: Reponse | undefined): ReponseLisible {
  const vide = { reponse: "", autre: "", commentaire: "" };
  if (!reponse || !estRepondue(question, reponse)) return vide;
  switch (question.type) {
    case "choix-unique": {
      const r = reponse as ReponseChoixUnique;
      const autre = Boolean(question.autre) && r.choix === AUTRE;
      const libelle = autre ? "Autre" : (question.options.find((o) => o.id === r.choix)?.libelle ?? "");
      return { reponse: libelle, autre: autre ? (r.autre ?? "") : "", commentaire: r.commentaire ?? "" };
    }
    case "choix-multiple": {
      const r = reponse as ReponseChoixMultiple;
      const libelles = question.options.filter((o) => r.choix.includes(o.id)).map((o) => o.libelle);
      const autre = Boolean(question.autre) && r.choix.includes(AUTRE);
      if (autre) libelles.push("Autre");
      return {
        reponse: libelles.join(" | "),
        autre: autre ? (r.autre ?? "") : "",
        commentaire: r.commentaire ?? "",
      };
    }
    case "texte-court":
    case "texte-long":
      return { ...vide, reponse: (reponse as ReponseTexte).texte };
    case "validation": {
      const r = reponse as ReponseValidation;
      return {
        reponse: r.decision === "garder" ? "Je garde" : "Je change",
        autre: "",
        commentaire: r.decision === "changer" ? (r.precision ?? "") : "",
      };
    }
    case "variantes": {
      const r = reponse as ReponseVariantes;
      const libelle =
        question.aucune && r.choix === AUCUNE
          ? "Aucune ne me convient"
          : (question.options.find((o) => o.id === r.choix)?.libelle ?? "");
      return { reponse: libelle, autre: "", commentaire: r.commentaire ?? "" };
    }
    case "tableau-saisie": {
      const lignes = (reponse as ReponseTableau).lignes
        .filter((l) => Object.values(l).some(plein))
        .map((l) =>
          question.colonnes
            .filter((c) => plein(l[c.id]))
            .map((c) => `${c.libelle} : ${l[c.id].trim()}`)
            .join(" ; "),
        );
      return { ...vide, reponse: lignes.join("\n") };
    }
  }
}

/** « 2026-11-30 » → « 30 novembre 2026 ». */
export function dateLongue(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso.slice(0, 10)}T12:00:00Z`));
}
