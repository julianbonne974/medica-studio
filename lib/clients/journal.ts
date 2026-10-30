import { randomBytes } from "node:crypto";
import { stockage } from "./stockage";

/**
 * Journal des accès, retours des clients et limite des tentatives de connexion.
 * Clés : acces/<projet>/<AAAA-MM-JJ>/<horodatage>-<aléa>
 *        retours/<projet>/<AAAA-MM-JJ>/<horodatage>-<aléa>
 *        tentatives/<projet ou admin>/<empreinte IP>
 * La date de la clé est celle de Paris, pour filtrer par jour sans tout relire.
 */

export type EntreeAcces = {
  date: string;
  projet: string;
  prenom: string;
  page: string;
  navigateur: string;
  empreinteIp: string;
};

export type Retour = {
  date: string;
  projet: string;
  prenom: string;
  page: string;
  version: string;
  texte: string;
  navigateur: string;
  empreinteIp: string;
};

const FUSEAU = "Europe/Paris";

export function jourParis(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSEAU,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function cleHorodatee(famille: string, projet: string, d: Date) {
  const heure = d.toISOString().replace(/[-:TZ.]/g, "").slice(8);
  return `${famille}/${projet}/${jourParis(d)}/${heure}-${randomBytes(4).toString("hex")}`;
}

export async function journaliserAcces(entree: Omit<EntreeAcces, "date">) {
  const d = new Date();
  try {
    await stockage().ecrire(cleHorodatee("acces", entree.projet, d), {
      ...entree,
      date: d.toISOString(),
    } satisfies EntreeAcces);
  } catch (err) {
    // Le journal ne doit jamais empêcher l'affichage d'une page.
    console.error("[espace-clients] journal des accès indisponible :", (err as Error).message);
  }
}

export async function enregistrerRetour(retour: Omit<Retour, "date">) {
  const d = new Date();
  await stockage().ecrire(cleHorodatee("retours", retour.projet, d), {
    ...retour,
    date: d.toISOString(),
  } satisfies Retour);
}

export type Filtre = { du?: string; au?: string; limite?: number };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

async function lireFamille<T>(famille: string, projet: string, filtre: Filtre): Promise<T[]> {
  const s = stockage();
  const du = filtre.du && DATE.test(filtre.du) ? filtre.du : undefined;
  const au = filtre.au && DATE.test(filtre.au) ? filtre.au : undefined;
  const cles = (await s.lister(`${famille}/${projet}/`))
    .filter((c) => {
      const jour = c.split("/")[2] ?? "";
      return (!du || jour >= du) && (!au || jour <= au);
    })
    .sort()
    .reverse()
    .slice(0, filtre.limite ?? 2000);
  const sortie: T[] = [];
  for (let i = 0; i < cles.length; i += 25) {
    const lot = await Promise.all(cles.slice(i, i + 25).map((c) => s.lire<T>(c)));
    for (const v of lot) if (v) sortie.push(v);
  }
  return sortie;
}

export function listerAcces(projet: string, filtre: Filtre = {}) {
  return lireFamille<EntreeAcces>("acces", projet, filtre);
}

export function listerRetours(projet: string, filtre: Filtre = {}) {
  return lireFamille<Retour>("retours", projet, filtre);
}

/* Limite des tentatives ------------------------------------------------------------ */

export const MAX_ECHECS = 5;
const FENETRE_MS = 15 * 60 * 1000;
const BLOCAGE_MS = 15 * 60 * 1000;

type EtatTentatives = { echecs: number; depuis: number; bloqueJusqua?: number };

const cleTentatives = (portee: string, ip: string) => `tentatives/${portee}/${ip}`;

/** Renvoie la fin du blocage (ms) si l'IP est bloquée pour cette portée, sinon null. */
export async function blocageEnCours(portee: string, ip: string): Promise<number | null> {
  const etat = await stockage().lire<EtatTentatives>(cleTentatives(portee, ip));
  if (etat?.bloqueJusqua && etat.bloqueJusqua > Date.now()) return etat.bloqueJusqua;
  return null;
}

/** Note un échec ; renvoie le nombre d'essais restants (0 = bloqué). */
export async function noterEchec(portee: string, ip: string): Promise<number> {
  const s = stockage();
  const cle = cleTentatives(portee, ip);
  const maintenant = Date.now();
  const precedent = await s.lire<EtatTentatives>(cle);
  const actif = precedent && maintenant - precedent.depuis < FENETRE_MS && !precedent.bloqueJusqua;
  const etat: EtatTentatives = actif
    ? { echecs: precedent.echecs + 1, depuis: precedent.depuis }
    : { echecs: 1, depuis: maintenant };
  if (etat.echecs >= MAX_ECHECS) etat.bloqueJusqua = maintenant + BLOCAGE_MS;
  await s.ecrire(cle, etat);
  return Math.max(0, MAX_ECHECS - etat.echecs);
}

export async function effacerEchecs(portee: string, ip: string) {
  await stockage().ecrire(cleTentatives(portee, ip), { echecs: 0, depuis: 0 });
}
