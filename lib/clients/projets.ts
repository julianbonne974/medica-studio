import fs from "node:fs";
import path from "node:path";

/**
 * Projets de l'espace clients : un fichier `content/clients/<slug>.json` par projet,
 * et les prototypes dans `private/clients/<slug>/` (hors de `public/`).
 */

export type VersionProjet = {
  /** identifiant court, par exemple « v1 » */
  id: string;
  /** libellé affiché, par exemple « V1 » */
  libelle: string;
  titre: string;
  description: string;
  /** dossier de la version dans private/clients/<slug>/ */
  dossier: string;
  /** chemin d'entrée relatif à private/clients/<slug>/ */
  entree: string;
  /** date ISO (AAAA-MM-JJ) de la dernière mise à jour */
  miseAJour: string;
};

export type ScenarioProjet = {
  titre: string;
  objectif?: string;
  etapes?: string[];
};

export type ProjetClient = {
  slug: string;
  nom: string;
  sousTitre?: string;
  description: string;
  mentionDonnees: string;
  versions: VersionProjet[];
  scenarios: ScenarioProjet[];
  consignes?: string[];
};

export const RACINE_CONTENU = path.join(process.cwd(), "content", "clients");
export const RACINE_PROTOTYPES = path.join(process.cwd(), "private", "clients");

const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/;
const RESERVES = new Set(["admin", "api", "m"]);

export function slugValide(slug: string): boolean {
  return SLUG.test(slug) && !RESERVES.has(slug);
}

/**
 * Projet d'essai, en développement seulement (`next dev`) : le slug « exemple » lit
 * `content/clients/_exemple.json`, `content/clients/questionnaires/_exemple.json` et
 * `private/clients/_exemple/`. Un fichier dont le nom commence par « _ » n'est jamais chargé en
 * production (`next build` / `next start` posent NODE_ENV=production).
 */
export const SLUG_ESSAI = "exemple";

export function estProjetEssai(slug: string): boolean {
  return process.env.NODE_ENV === "development" && slug === SLUG_ESSAI;
}

/** Nom de fichier (sans extension) ou de dossier qui porte le projet. */
export function nomFichierProjet(slug: string): string {
  return estProjetEssai(slug) ? `_${slug}` : slug;
}

export function racinePrototypes(slug: string): string {
  return path.join(RACINE_PROTOTYPES, nomFichierProjet(slug));
}

export function variableCode(slug: string): string {
  return `CLIENT_CODE_${slug.toUpperCase().replace(/-/g, "_")}`;
}

export function empreinteConfiguree(slug: string): string | undefined {
  const v = process.env[variableCode(slug)];
  return v && v.startsWith("scrypt:") ? v.trim() : undefined;
}

export function chargerProjet(slug: string): ProjetClient | null {
  if (!slugValide(slug)) return null;
  try {
    const brut = fs.readFileSync(path.join(RACINE_CONTENU, `${nomFichierProjet(slug)}.json`), "utf8");
    const projet = JSON.parse(brut) as ProjetClient;
    if (projet.slug !== slug) return null;
    return projet;
  } catch {
    return null;
  }
}

export function listerProjets(): ProjetClient[] {
  let fichiers: string[] = [];
  try {
    fichiers = fs.readdirSync(RACINE_CONTENU).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return fichiers
    .map((f) => chargerProjet(f === `_${SLUG_ESSAI}.json` ? SLUG_ESSAI : f.slice(0, -5)))
    .filter((p): p is ProjetClient => p !== null)
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

/** Version correspondant à un chemin de maquette (premier segment = dossier de la version). */
export function versionDuChemin(projet: ProjetClient, chemin: string): VersionProjet | undefined {
  const premier = chemin.split("/")[0];
  return projet.versions.find((v) => v.dossier === premier);
}

export function cheminProjet(slug: string) {
  return `/clients/${slug}`;
}

export function cheminApiProjet(slug: string) {
  return `/api/clients/${slug}`;
}

export function urlMaquette(slug: string, entree: string) {
  return `/clients/${slug}/m/${entree.split("/").map(encodeURIComponent).join("/")}`;
}
