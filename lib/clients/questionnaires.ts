import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { RACINE_CONTENU, nomFichierProjet, racinePrototypes, slugValide } from "./projets";
import { stockage } from "./stockage";
import {
  AUCUNE,
  AUTRE,
  BORNES,
  questionsDeSection,
  toutesLesQuestions,
  type Bloc,
  type DossierReponses,
  type Question,
  type Questionnaire,
  type Reponse,
  type Reponses,
} from "./questionnaire-modele";

/**
 * Questionnaires : un fichier `content/clients/questionnaires/<slug>.json` par projet, validé à
 * chaque chargement ; réponses d'une personne dans le stockage de l'espace clients, clé
 * `questionnaires/<projet>/<id du questionnaire>/<prénom normalisé>`.
 */

export const RACINE_QUESTIONNAIRES = path.join(RACINE_CONTENU, "questionnaires");

export class QuestionnaireInvalide extends Error {
  constructor(fichier: string, chemin: string, message: string) {
    super(`${fichier} : ${chemin ? `${chemin} : ` : ""}${message}`);
    this.name = "QuestionnaireInvalide";
  }
}

export type Chargement =
  | { etat: "absent" }
  | { etat: "invalide"; erreur: string }
  | { etat: "ok"; questionnaire: Questionnaire };

/* Validation du fichier de contenu ------------------------------------------------- */

const ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const ID_QUESTIONNAIRE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const EXT_IMAGES = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const TYPES_QUESTIONS = new Set([
  "choix-unique",
  "choix-multiple",
  "texte-court",
  "texte-long",
  "validation",
  "variantes",
  "tableau-saisie",
]);

type Obj = Record<string, unknown>;

function validateur(fichier: string, slug: string) {
  const echec = (chemin: string, message: string): never => {
    throw new QuestionnaireInvalide(fichier, chemin, message);
  };
  const objet = (v: unknown, chemin: string, cles: string[]): Obj => {
    if (!v || typeof v !== "object" || Array.isArray(v)) echec(chemin, "objet attendu");
    // Les clés qui commencent par « _ » ou « $ » sont des notes de rédaction, ignorées.
    for (const k of Object.keys(v as Obj)) {
      if (!cles.includes(k) && !/^[_$]/.test(k)) {
        echec(chemin, `clé inconnue « ${k} » (clés possibles : ${cles.join(", ")})`);
      }
    }
    return v as Obj;
  };
  const texte = (o: Obj, cle: string, chemin: string, facultatif = false): string | undefined => {
    const v = o[cle];
    if (v === undefined && facultatif) return undefined;
    if (typeof v !== "string" || !v.trim()) echec(`${chemin}.${cle}`, "texte non vide attendu");
    return v as string;
  };
  const booleen = (o: Obj, cle: string, chemin: string) => {
    if (o[cle] !== undefined && typeof o[cle] !== "boolean") echec(`${chemin}.${cle}`, "true ou false attendu");
  };
  const tableau = (o: Obj, cle: string, chemin: string, facultatif = false): unknown[] | undefined => {
    const v = o[cle];
    if (v === undefined && facultatif) return undefined;
    if (!Array.isArray(v) || v.length === 0) echec(`${chemin}.${cle}`, "liste non vide attendue");
    return v as unknown[];
  };
  const identifiant = (o: Obj, cle: string, chemin: string, vus: Set<string>) => {
    const v = o[cle];
    if (typeof v !== "string" || !ID.test(v)) {
      echec(`${chemin}.${cle}`, "identifiant attendu (lettres, chiffres, - et _, 64 caractères au plus)");
    }
    if (vus.has(v as string)) echec(`${chemin}.${cle}`, `identifiant « ${v} » déjà employé`);
    vus.add(v as string);
    return v as string;
  };
  const image = (o: Obj, cle: string, chemin: string) => {
    const src = texte(o, cle, chemin) as string;
    const segments = src.split("/");
    if (
      src.startsWith("/") ||
      !segments.every((s) => s && s !== "." && s !== ".." && !s.startsWith(".") && !/[\\\u0000-\u001f:]/.test(s))
    ) {
      echec(`${chemin}.${cle}`, `chemin relatif à private/clients/${slug}/ attendu, sans « .. » : « ${src} »`);
    }
    if (!EXT_IMAGES.has(path.extname(src).toLowerCase())) {
      echec(`${chemin}.${cle}`, `format d'image non servi : « ${src} » (png, jpg, webp, gif, avif ou svg)`);
    }
    const fichierImage = path.join(racinePrototypes(slug), ...segments);
    if (!fs.existsSync(fichierImage)) echec(`${chemin}.${cle}`, `image introuvable : private/clients/${slug}/${src}`);
  };
  return { echec, objet, texte, booleen, tableau, identifiant, image };
}

function validerQuestionnaire(brut: unknown, slug: string, fichier: string): Questionnaire {
  const v = validateur(fichier, slug);
  const racine = v.objet(brut, "", ["id", "projet", "titre", "sousTitre", "dateSouhaitee", "intro", "sections"]);
  if (typeof racine.id !== "string" || !ID_QUESTIONNAIRE.test(racine.id)) {
    v.echec("id", "identifiant attendu en minuscules, chiffres et tirets (sert aux clés de stockage)");
  }
  if (racine.projet !== slug) v.echec("projet", `« ${slug} » attendu (nom du fichier)`);
  v.texte(racine, "titre", "");
  v.texte(racine, "sousTitre", "", true);
  if (racine.dateSouhaitee !== undefined) {
    if (typeof racine.dateSouhaitee !== "string" || !DATE.test(racine.dateSouhaitee)) {
      v.echec("dateSouhaitee", "date AAAA-MM-JJ attendue");
    }
  }
  (v.tableau(racine, "intro", "", true) ?? []).forEach((p, i) => {
    if (typeof p !== "string" || !p.trim()) v.echec(`intro[${i}]`, "texte non vide attendu");
  });

  const idsSections = new Set<string>();
  const idsQuestions = new Set<string>();
  (v.tableau(racine, "sections", "") as unknown[]).forEach((s, i) => {
    const cs = `sections[${i}]`;
    const section = v.objet(s, cs, ["id", "titre", "intro", "blocs", "questions", "groupes"]);
    v.identifiant(section, "id", cs, idsSections);
    v.texte(section, "titre", cs);
    v.texte(section, "intro", cs, true);
    (v.tableau(section, "blocs", cs, true) ?? []).forEach((b, j) => validerBloc(v, b, `${cs}.blocs[${j}]`));
    (v.tableau(section, "questions", cs, true) ?? []).forEach((q, j) =>
      validerQuestion(v, q, `${cs}.questions[${j}]`, idsQuestions),
    );
    // Groupes : identifiants uniques dans la section ; questions uniques dans tout le fichier.
    const idsGroupes = new Set<string>();
    (v.tableau(section, "groupes", cs, true) ?? []).forEach((g, j) => {
      const cg = `${cs}.groupes[${j}]`;
      const groupe = v.objet(g, cg, ["id", "titre", "intro", "blocs", "questions"]);
      v.identifiant(groupe, "id", cg, idsGroupes);
      v.texte(groupe, "titre", cg);
      v.texte(groupe, "intro", cg, true);
      (v.tableau(groupe, "blocs", cg, true) ?? []).forEach((b, k) => validerBloc(v, b, `${cg}.blocs[${k}]`));
      (v.tableau(groupe, "questions", cg, true) ?? []).forEach((q, k) =>
        validerQuestion(v, q, `${cg}.questions[${k}]`, idsQuestions),
      );
    });
  });
  return brut as Questionnaire;
}

type V = ReturnType<typeof validateur>;

function validerBloc(v: V, brut: unknown, c: string, dansDepliant = false) {
  const type = (brut as Obj)?.type;
  switch (type) {
    case "depliant": {
      if (dansDepliant) v.echec(`${c}.type`, "un dépliant ne peut pas contenir de dépliant");
      const b = v.objet(brut, c, ["type", "titre", "blocs"]);
      v.texte(b, "titre", c);
      (v.tableau(b, "blocs", c) as unknown[]).forEach((x, i) => validerBloc(v, x, `${c}.blocs[${i}]`, true));
      return;
    }
    case "paragraphe": {
      v.texte(v.objet(brut, c, ["type", "texte"]), "texte", c);
      return;
    }
    case "liste": {
      const b = v.objet(brut, c, ["type", "items"]);
      (v.tableau(b, "items", c) as unknown[]).forEach((it, i) => {
        if (typeof it !== "string" || !it.trim()) v.echec(`${c}.items[${i}]`, "texte non vide attendu");
      });
      return;
    }
    case "image": {
      const b = v.objet(brut, c, ["type", "src", "alt", "legende"]);
      v.image(b, "src", c);
      v.texte(b, "alt", c);
      v.texte(b, "legende", c, true);
      return;
    }
    case "tableau": {
      const b = v.objet(brut, c, ["type", "colonnes", "lignes"]);
      const colonnes = v.tableau(b, "colonnes", c) as unknown[];
      colonnes.forEach((col, i) => {
        if (typeof col !== "string") v.echec(`${c}.colonnes[${i}]`, "texte attendu");
      });
      (v.tableau(b, "lignes", c) as unknown[]).forEach((l, i) => {
        if (!Array.isArray(l) || l.length !== colonnes.length || !l.every((x) => typeof x === "string")) {
          v.echec(`${c}.lignes[${i}]`, `liste de ${colonnes.length} textes attendue (une par colonne)`);
        }
      });
      return;
    }
    case "encadre": {
      const b = v.objet(brut, c, ["type", "titre", "texte"]);
      v.texte(b, "titre", c, true);
      v.texte(b, "texte", c);
      return;
    }
    default:
      v.echec(`${c}.type`, `type de bloc inconnu « ${String(type)} » (paragraphe, liste, image, tableau, encadre, depliant)`);
  }
}

function validerQuestion(v: V, brut: unknown, c: string, ids: Set<string>) {
  const type = (brut as Obj)?.type;
  if (typeof type !== "string" || !TYPES_QUESTIONS.has(type)) {
    v.echec(`${c}.type`, `type de question inconnu « ${String(type)} » (${[...TYPES_QUESTIONS].join(", ")})`);
  }
  const base = ["id", "type", "intitule", "aide", "image", "legende"];
  const cles: Record<string, string[]> = {
    "choix-unique": [...base, "options", "autre", "commentaire"],
    "choix-multiple": [...base, "options", "autre", "commentaire"],
    "texte-court": [...base, "exemple"],
    "texte-long": [...base, "exemple"],
    validation: base,
    variantes: [...base, "options", "aucune", "commentaire"],
    "tableau-saisie": [...base, "colonnes", "lignesInitiales"],
  };
  const q = v.objet(brut, c, cles[type as string]);
  v.identifiant(q, "id", c, ids);
  v.texte(q, "intitule", c);
  v.texte(q, "aide", c, true);
  if (q.image !== undefined) v.image(q, "image", c);
  v.texte(q, "legende", c, true);
  if (q.legende !== undefined && q.image === undefined) v.echec(`${c}.legende`, "légende sans image");

  if (type === "choix-unique" || type === "choix-multiple" || type === "variantes") {
    // « autre » et « aucune » ne sont réservés que si le choix correspondant est activé.
    const reserve = type === "variantes" ? (q.aucune === true ? AUCUNE : "") : q.autre === true ? AUTRE : "";
    const idsOptions = new Set<string>();
    (v.tableau(q, "options", c) as unknown[]).forEach((o, i) => {
      const co = `${c}.options[${i}]`;
      const opt = v.objet(o, co, type === "variantes" ? ["id", "libelle", "image", "legende"] : ["id", "libelle"]);
      const id = (opt as Obj).id;
      if (reserve && id === reserve) {
        v.echec(`${co}.id`, `« ${id} » est réservé quand « ${type === "variantes" ? "aucune" : "autre"} » vaut true, choisissez un autre identifiant`);
      }
      v.identifiant(opt, "id", co, idsOptions);
      v.texte(opt, "libelle", co);
      if (type === "variantes") {
        v.image(opt, "image", co);
        v.texte(opt, "legende", co, true);
      }
    });
    v.booleen(q, type === "variantes" ? "aucune" : "autre", c);
    v.booleen(q, "commentaire", c);
  }
  if (type === "texte-court" || type === "texte-long") v.texte(q, "exemple", c, true);
  if (type === "tableau-saisie") {
    const idsColonnes = new Set<string>();
    (v.tableau(q, "colonnes", c) as unknown[]).forEach((col, i) => {
      const cc = `${c}.colonnes[${i}]`;
      const colonne = v.objet(col, cc, ["id", "libelle", "type", "options"]);
      v.identifiant(colonne, "id", cc, idsColonnes);
      v.texte(colonne, "libelle", cc);
      if (!["texte", "tel", "choix"].includes(colonne.type as string)) {
        v.echec(`${cc}.type`, "« texte », « tel » ou « choix » attendu");
      }
      if (colonne.type === "choix") {
        const options = v.tableau(colonne, "options", cc) as unknown[];
        options.forEach((o, j) => {
          if (typeof o !== "string" || !o.trim()) v.echec(`${cc}.options[${j}]`, "texte non vide attendu");
        });
        if (new Set(options).size !== options.length) v.echec(`${cc}.options`, "options en double");
      } else if (colonne.options !== undefined) {
        v.echec(`${cc}.options`, "réservé aux colonnes de type « choix »");
      }
    });
    const n = q.lignesInitiales;
    if (n !== undefined && (!Number.isInteger(n) || (n as number) < 0 || (n as number) > BORNES.lignes)) {
      v.echec(`${c}.lignesInitiales`, `entier de 0 à ${BORNES.lignes} attendu`);
    }
  }
}

/* Chargement ---------------------------------------------------------------------- */

export function fichierQuestionnaire(slug: string) {
  return path.join(RACINE_QUESTIONNAIRES, `${nomFichierProjet(slug)}.json`);
}

export function chargerQuestionnaire(slug: string): Chargement {
  if (!slugValide(slug)) return { etat: "absent" };
  const fichier = fichierQuestionnaire(slug);
  const affiche = path.relative(process.cwd(), fichier);
  let brut: string;
  try {
    brut = fs.readFileSync(fichier, "utf8");
  } catch {
    return { etat: "absent" };
  }
  try {
    let donnees: unknown;
    try {
      donnees = JSON.parse(brut);
    } catch (err) {
      throw new QuestionnaireInvalide(affiche, "", `JSON illisible (${(err as Error).message})`);
    }
    return { etat: "ok", questionnaire: validerQuestionnaire(donnees, slug, affiche) };
  } catch (err) {
    const erreur = (err as Error).message;
    console.error("[espace-clients] questionnaire invalide :", erreur);
    return { etat: "invalide", erreur };
  }
}

/** Chemins d'images cités par le questionnaire (blocs et variantes) : seuls servis à l'administration. */
export function imagesDuQuestionnaire(q: Questionnaire): Set<string> {
  const images = new Set<string>();
  const blocs = (liste: Bloc[] = []) => {
    for (const b of liste) {
      if (b.type === "image") images.add(b.src);
      if (b.type === "depliant") blocs(b.blocs);
    }
  };
  for (const s of q.sections) {
    blocs(s.blocs);
    for (const g of s.groupes ?? []) blocs(g.blocs);
    for (const { question } of questionsDeSection(s)) {
      if (question.image) images.add(question.image);
      if (question.type === "variantes") for (const o of question.options) images.add(o.image);
    }
  }
  return images;
}

/* Validation des réponses --------------------------------------------------------- */

export class ReponseRefusee extends Error {}

/** Retire les caractères de contrôle et de direction (sauf retours à la ligne et tabulations). */
export function propre(valeur: string): string {
  return valeur
    .normalize("NFC")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f‪-‮⁦-⁩]/g, "")
    .trim();
}

function chaine(v: unknown, max: number, ou: string, uneLigne = false): string {
  if (v === undefined || v === null) return "";
  if (typeof v !== "string") throw new ReponseRefusee(`${ou} : texte attendu`);
  let s = propre(v);
  if (uneLigne) s = s.replace(/[\r\n\t]+/g, " ");
  if (s.length > max) throw new ReponseRefusee(`${ou} : ${max} caractères au plus`);
  return s;
}

function objetReponse(v: unknown, ou: string, cles: string[]): Obj {
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new ReponseRefusee(`${ou} : objet attendu`);
  for (const k of Object.keys(v)) if (!cles.includes(k)) throw new ReponseRefusee(`${ou} : champ inconnu « ${k} »`);
  return v as Obj;
}

const TEL = /^[0-9+().\s/-]*$/;

/**
 * Contrôle et nettoie la réponse à une question. Renvoie null si elle est vide.
 * Lève ReponseRefusee pour toute valeur que le fichier de contenu ne prévoit pas.
 */
function validerReponse(question: Question, brut: unknown): Reponse | null {
  const ou = question.id;
  switch (question.type) {
    case "choix-unique": {
      const r = objetReponse(brut, ou, ["choix", "autre", "commentaire"]);
      const choix = chaine(r.choix, 64, ou);
      const autreChoisi = Boolean(question.autre) && choix === AUTRE;
      if (choix && !autreChoisi && !question.options.some((o) => o.id === choix)) {
        throw new ReponseRefusee(`${ou} : option inconnue « ${choix} »`);
      }
      if (r.autre !== undefined && !question.autre) throw new ReponseRefusee(`${ou} : « Autre » non prévu`);
      if (r.commentaire !== undefined && !question.commentaire) throw new ReponseRefusee(`${ou} : commentaire non prévu`);
      const autre = autreChoisi ? chaine(r.autre, BORNES.texteCourt, ou, true) : "";
      const commentaire = chaine(r.commentaire, BORNES.texte, ou);
      if (!choix && !commentaire) return null;
      return { ...(choix && { choix }), ...(autre && { autre }), ...(commentaire && { commentaire }) };
    }
    case "choix-multiple": {
      const r = objetReponse(brut, ou, ["choix", "autre", "commentaire"]);
      const liste = r.choix ?? [];
      if (!Array.isArray(liste) || liste.length > question.options.length + 1) {
        throw new ReponseRefusee(`${ou} : liste de choix attendue`);
      }
      const choix: string[] = [];
      for (const c of liste) {
        if (typeof c !== "string") throw new ReponseRefusee(`${ou} : choix invalide`);
        if (!(question.options.some((o) => o.id === c) || (c === AUTRE && question.autre))) {
          throw new ReponseRefusee(`${ou} : option inconnue « ${c} »`);
        }
        if (!choix.includes(c)) choix.push(c);
      }
      if (r.autre !== undefined && !question.autre) throw new ReponseRefusee(`${ou} : « Autre » non prévu`);
      if (r.commentaire !== undefined && !question.commentaire) throw new ReponseRefusee(`${ou} : commentaire non prévu`);
      const autre = question.autre && choix.includes(AUTRE) ? chaine(r.autre, BORNES.texteCourt, ou, true) : "";
      const commentaire = chaine(r.commentaire, BORNES.texte, ou);
      if (choix.length === 0 && !commentaire) return null;
      return { choix, ...(autre && { autre }), ...(commentaire && { commentaire }) };
    }
    case "texte-court":
    case "texte-long": {
      const r = objetReponse(brut, ou, ["texte"]);
      const court = question.type === "texte-court";
      const texte = chaine(r.texte, court ? BORNES.texteCourt : BORNES.texte, ou, court);
      return texte ? { texte } : null;
    }
    case "validation": {
      const r = objetReponse(brut, ou, ["decision", "precision"]);
      const decision = r.decision ?? "";
      if (decision !== "" && decision !== "garder" && decision !== "changer") {
        throw new ReponseRefusee(`${ou} : « garder » ou « changer » attendu`);
      }
      const precision = decision === "changer" ? chaine(r.precision, BORNES.texte, ou) : "";
      if (!decision) return null;
      return { decision, ...(precision && { precision }) };
    }
    case "variantes": {
      const r = objetReponse(brut, ou, ["choix", "commentaire"]);
      const choix = chaine(r.choix, 64, ou);
      if (choix && !(question.options.some((o) => o.id === choix) || (choix === AUCUNE && question.aucune))) {
        throw new ReponseRefusee(`${ou} : variante inconnue « ${choix} »`);
      }
      if (r.commentaire !== undefined && !question.commentaire) throw new ReponseRefusee(`${ou} : commentaire non prévu`);
      const commentaire = chaine(r.commentaire, BORNES.texte, ou);
      if (!choix && !commentaire) return null;
      return { ...(choix && { choix }), ...(commentaire && { commentaire }) };
    }
    case "tableau-saisie": {
      const r = objetReponse(brut, ou, ["lignes"]);
      const lignes = r.lignes ?? [];
      if (!Array.isArray(lignes)) throw new ReponseRefusee(`${ou} : liste de lignes attendue`);
      if (lignes.length > BORNES.lignes) throw new ReponseRefusee(`${ou} : ${BORNES.lignes} lignes au plus`);
      const ids = question.colonnes.map((c) => c.id);
      const propres = lignes.map((l, i) => {
        const ligne = objetReponse(l, `${ou}, ligne ${i + 1}`, ids);
        const sortie: Record<string, string> = {};
        for (const col of question.colonnes) {
          const lieu = `${ou}, ligne ${i + 1}, ${col.libelle}`;
          const val = chaine(ligne[col.id], col.type === "tel" ? BORNES.tel : BORNES.cellule, lieu, true);
          if (!val) continue;
          if (col.type === "tel" && !TEL.test(val)) throw new ReponseRefusee(`${lieu} : numéro de téléphone attendu`);
          if (col.type === "choix" && !(col.options ?? []).includes(val)) {
            throw new ReponseRefusee(`${lieu} : valeur non prévue`);
          }
          sortie[col.id] = val;
        }
        return sortie;
      });
      // Les lignes vides du milieu sont gardées (l'ordre compte), celles de la fin retirées.
      while (propres.length && Object.keys(propres[propres.length - 1]).length === 0) propres.pop();
      return propres.length ? { lignes: propres } : null;
    }
  }
}

/** Contrôle strict d'un envoi : la moindre valeur non prévue fait refuser l'ensemble. */
export function validerReponses(q: Questionnaire, brut: unknown): Reponses {
  if (!brut || typeof brut !== "object" || Array.isArray(brut)) throw new ReponseRefusee("réponses : objet attendu");
  const parId = new Map(toutesLesQuestions(q).map(({ question }) => [question.id, question]));
  const sortie: Reponses = {};
  for (const [id, valeur] of Object.entries(brut)) {
    const question = parId.get(id);
    if (!question) throw new ReponseRefusee(`question inconnue « ${id} »`);
    const r = validerReponse(question, valeur);
    if (r) sortie[id] = r;
  }
  return sortie;
}

/**
 * Lecture tolérante d'un dossier stocké : si le fichier de contenu a changé depuis (question
 * retirée, option renommée), seules les réponses encore valides sont rendues.
 */
export function reponsesEncoreValides(q: Questionnaire, reponses: Reponses | undefined): Reponses {
  const parId = new Map(toutesLesQuestions(q).map(({ question }) => [question.id, question]));
  const sortie: Reponses = {};
  for (const [id, valeur] of Object.entries(reponses ?? {})) {
    const question = parId.get(id);
    if (!question) continue;
    try {
      const r = validerReponse(question, valeur);
      if (r) sortie[id] = r;
    } catch {
      // réponse devenue invalide : ignorée
    }
  }
  return sortie;
}

/* Stockage ------------------------------------------------------------------------ */

/** « Éloïse » → « eloise » ; un prénom sans lettre latine prend une empreinte courte. */
export function prenomNormalise(prenom: string): string {
  const bas = prenom.normalize("NFC").toLocaleLowerCase("fr").trim();
  const ascii = bas
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return ascii || `p-${createHash("sha256").update(bas).digest("hex").slice(0, 12)}`;
}

const prefixe = (slug: string, q: Questionnaire) => `questionnaires/${slug}/${q.id}/`;

export function cleDossier(slug: string, q: Questionnaire, prenom: string) {
  return `${prefixe(slug, q)}${prenomNormalise(prenom)}`;
}

export async function lireDossier(slug: string, q: Questionnaire, prenom: string): Promise<DossierReponses | null> {
  const d = await stockage().lire<DossierReponses>(cleDossier(slug, q, prenom));
  if (!d) return null;
  return { ...d, reponses: reponsesEncoreValides(q, d.reponses), envois: d.envois ?? [] };
}

export async function ecrireDossier(slug: string, q: Questionnaire, dossier: DossierReponses) {
  await stockage().ecrire(cleDossier(slug, q, dossier.prenom), dossier);
}

/** Tous les répondants, le plus récemment modifié d'abord. */
export async function listerDossiers(slug: string, q: Questionnaire): Promise<DossierReponses[]> {
  const s = stockage();
  const cles = await s.lister(prefixe(slug, q));
  const dossiers: DossierReponses[] = [];
  for (let i = 0; i < cles.length; i += 25) {
    const lot = await Promise.all(cles.slice(i, i + 25).map((c) => s.lire<DossierReponses>(c)));
    for (const d of lot) {
      if (d) dossiers.push({ ...d, reponses: reponsesEncoreValides(q, d.reponses), envois: d.envois ?? [] });
    }
  }
  return dossiers.sort((a, b) => b.majLe.localeCompare(a.majLe));
}
