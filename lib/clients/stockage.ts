import { promises as fs } from "node:fs";
import path from "node:path";
import { getStore } from "@netlify/blobs";

/**
 * Stockage clé-valeur JSON de l'espace clients.
 * - En ligne (fonctions Netlify) : Netlify Blobs, magasin « espace-clients », cohérence forte.
 * - En local (next dev / next start hors Netlify) : fichiers JSON dans `.data/espace-clients/`
 *   (répertoire ignoré par git). Ce repli est refusé dans une fonction Netlify, pour ne jamais
 *   écrire des journaux sur un disque éphémère.
 */

const NOM_MAGASIN = "espace-clients";
const RACINE_LOCALE = path.join(process.cwd(), ".data", NOM_MAGASIN);

export interface Stockage {
  lire<T>(cle: string): Promise<T | null>;
  ecrire(cle: string, valeur: unknown): Promise<void>;
  lister(prefixe: string): Promise<string[]>;
}

function cleValide(cle: string) {
  if (!/^[a-z0-9][a-z0-9/_.:-]*$/i.test(cle) || cle.includes("..")) {
    throw new Error(`Clé de stockage invalide : ${cle}`);
  }
}

function surNetlify() {
  return Boolean(
    process.env.NETLIFY ||
      process.env.LAMBDA_TASK_ROOT ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY_BLOBS_CONTEXT,
  );
}

const stockageBlobs = (): Stockage | null => {
  try {
    const magasin = getStore({ name: NOM_MAGASIN, consistency: "strong" });
    return {
      async lire<T>(cle: string) {
        cleValide(cle);
        return ((await magasin.get(cle, { type: "json" })) as T | null) ?? null;
      },
      async ecrire(cle, valeur) {
        cleValide(cle);
        await magasin.setJSON(cle, valeur);
      },
      async lister(prefixe) {
        const cles: string[] = [];
        for await (const page of magasin.list({ prefix: prefixe, paginate: true })) {
          for (const b of page.blobs) cles.push(b.key);
        }
        return cles;
      },
    };
  } catch (err) {
    if (surNetlify()) throw err;
    return null;
  }
};

const stockageFichiers: Stockage = {
  async lire<T>(cle: string) {
    cleValide(cle);
    try {
      return JSON.parse(await fs.readFile(path.join(RACINE_LOCALE, `${cle}.json`), "utf8")) as T;
    } catch {
      return null;
    }
  },
  async ecrire(cle, valeur) {
    cleValide(cle);
    const fichier = path.join(RACINE_LOCALE, `${cle}.json`);
    await fs.mkdir(path.dirname(fichier), { recursive: true });
    const tmp = `${fichier}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(valeur), "utf8");
    await fs.rename(tmp, fichier);
  },
  async lister(prefixe) {
    const cles: string[] = [];
    async function parcourir(dossier: string, relatif: string) {
      let entrees: import("node:fs").Dirent[];
      try {
        entrees = await fs.readdir(dossier, { withFileTypes: true });
      } catch {
        return;
      }
      for (const e of entrees) {
        const rel = relatif ? `${relatif}/${e.name}` : e.name;
        if (e.isDirectory()) await parcourir(path.join(dossier, e.name), rel);
        else if (e.name.endsWith(".json")) cles.push(rel.slice(0, -5));
      }
    }
    await parcourir(RACINE_LOCALE, "");
    return cles.filter((c) => c.startsWith(prefixe)).sort();
  },
};

export function stockage(): Stockage {
  return stockageBlobs() ?? stockageFichiers;
}

export function modeStockage(): "blobs" | "fichiers" {
  return stockageBlobs() ? "blobs" : "fichiers";
}
