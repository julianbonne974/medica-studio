#!/usr/bin/env node
// Empreinte d'un code d'accès de l'espace clients (scrypt avec sel aléatoire).
// Usage : node scripts/hash-code.mjs <code>
//         node scripts/hash-code.mjs            (le code est alors lu sur l'entrée standard)
// La valeur imprimée se pose telle quelle dans CLIENT_CODE_<PROJET> ou CLIENT_ADMIN_CODE.
// Le code lui-même n'est jamais écrit nulle part.
import { randomBytes, scrypt } from "node:crypto";

const N = 16384;
const r = 8;
const p = 1;
const KEYLEN = 32;

async function lireCode() {
  if (process.argv[2]) return process.argv[2];
  if (process.stdin.isTTY) {
    console.error("Usage : node scripts/hash-code.mjs <code>   (ou : echo -n <code> | node scripts/hash-code.mjs)");
    process.exit(1);
  }
  let brut = "";
  for await (const morceau of process.stdin) brut += morceau;
  return brut.replace(/\r?\n$/, "");
}

const code = (await lireCode()).trim();
if (code.length < 8) {
  console.error("Code trop court : 8 caractères au moins (12 ou plus recommandés).");
  process.exit(1);
}

const sel = randomBytes(16);
const cle = await new Promise((resolve, reject) =>
  scrypt(code.normalize("NFKC"), sel, KEYLEN, { N, r, p, maxmem: 128 * N * r * 2 }, (err, k) =>
    err ? reject(err) : resolve(k),
  ),
);

process.stdout.write(`scrypt:${N}:${r}:${p}:${sel.toString("base64url")}:${cle.toString("base64url")}\n`);
