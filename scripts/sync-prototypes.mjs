#!/usr/bin/env node
// Copie les prototypes d'un projet client vers private/clients/<projet>/.
// Usage : node scripts/sync-prototypes.mjs <projet> [--source <dossier>]
//
// - copie les fichiers réels : un lien symbolique (maquette-v1/commun -> ../commun) devient
//   un vrai dossier, pour que les liens relatifs « commun/… » marchent une fois servis ;
// - dans chaque page HTML, retire l'attribut data-artifact des liens de version et le petit
//   script qui les réécrit vers claude.ai : sur medicastudio.fr, les liens V1 et V2 restent relatifs ;
// - met à jour la date « miseAJour » de chaque version dans content/clients/<projet>.json
//   (date de la dernière modification des fichiers source de la version).
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Sources connues : dossier de prototypes et sous-dossiers à copier. */
const SOURCES = {
  preopia: {
    source: "/home/omarchy/code/preopia/prototype",
    dossiers: ["maquette-v1", "maquette-v2", "commun"],
  },
};

const args = process.argv.slice(2);
const projet = args[0];
if (!projet || !/^[a-z0-9-]+$/.test(projet) || !SOURCES[projet]) {
  console.error(
    `Usage : node scripts/sync-prototypes.mjs <projet> [--source <dossier>]\nProjets connus : ${Object.keys(SOURCES).join(", ")}`,
  );
  process.exit(1);
}
const iSource = args.indexOf("--source");
const source = path.resolve(iSource > -1 ? args[iSource + 1] : SOURCES[projet].source);
const { dossiers } = SOURCES[projet];
const destination = path.join(RACINE, "private", "clients", projet);

// Script inline qui contient « data-artifact » (réécriture des liens vers claude.ai).
const SCRIPT_ARTIFACT =
  /[ \t]*<script\b(?![^>]*\bsrc=)[^>]*>(?:(?!<\/script>)[\s\S])*?data-artifact(?:(?!<\/script>)[\s\S])*?<\/script>[ \t]*\r?\n?/gi;
const ATTRIBUT_ARTIFACT = /\s+data-artifact\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;

async function derniereModification(dossier) {
  let max = 0;
  async function parcourir(d) {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      const st = await fs.stat(p); // stat : suit les liens symboliques
      if (st.isDirectory()) await parcourir(p);
      else if (st.isFile()) max = Math.max(max, st.mtimeMs);
    }
  }
  await parcourir(dossier);
  return max;
}

async function nettoyerHtml(dossier) {
  const nettoyes = [];
  for (const e of await fs.readdir(dossier, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !/\.html?$/i.test(e.name)) continue;
    const fichier = path.join(e.parentPath ?? e.path, e.name);
    const avant = await fs.readFile(fichier, "utf8");
    const apres = avant.replace(SCRIPT_ARTIFACT, "").replace(ATTRIBUT_ARTIFACT, "");
    if (/data-artifact|claude\.ai\/artifact/i.test(apres)) {
      throw new Error(`Lien claude.ai encore présent après nettoyage : ${path.relative(RACINE, fichier)}`);
    }
    if (apres !== avant) {
      await fs.writeFile(fichier, apres, "utf8");
      nettoyes.push(path.relative(destination, fichier));
    }
  }
  return nettoyes;
}

async function main() {
  await fs.access(source).catch(() => {
    throw new Error(`Source introuvable : ${source}`);
  });
  await fs.mkdir(destination, { recursive: true });

  const dates = {};
  for (const d of dossiers) {
    const src = path.join(source, d);
    const dst = path.join(destination, d);
    await fs.rm(dst, { recursive: true, force: true });
    await fs.cp(src, dst, { recursive: true, dereference: true, errorOnExist: false, force: true });
    dates[d] = await derniereModification(src);
    const nettoyes = await nettoyerHtml(dst);
    console.log(`copié  ${d}/${nettoyes.length ? `  (nettoyé : ${nettoyes.join(", ")})` : ""}`);
  }

  // Aucun lien symbolique ne doit rester dans la copie.
  for (const e of await fs.readdir(destination, { withFileTypes: true, recursive: true })) {
    if (e.isSymbolicLink()) throw new Error(`Lien symbolique resté dans la copie : ${e.name}`);
  }

  const fichierConfig = path.join(RACINE, "content", "clients", `${projet}.json`);
  try {
    const config = JSON.parse(await fs.readFile(fichierConfig, "utf8"));
    let change = false;
    for (const v of config.versions ?? []) {
      const ms = dates[v.dossier];
      if (!ms) continue;
      const jour = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date(ms));
      if (v.miseAJour !== jour) {
        v.miseAJour = jour;
        change = true;
      }
      console.log(`date   ${v.libelle} : ${jour}`);
    }
    if (change) await fs.writeFile(fichierConfig, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  } catch (err) {
    console.warn(`(configuration ${path.relative(RACINE, fichierConfig)} non mise à jour : ${err.message})`);
  }
  console.log(`\nPrototypes de « ${projet} » à jour dans ${path.relative(RACINE, destination)}/`);
}

main().catch((err) => {
  console.error(`Échec : ${err.message}`);
  process.exit(1);
});
