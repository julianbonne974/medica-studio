# Espace clients (`/clients`)

Espace protégé de medicastudio.fr où les clients ouvrent les prototypes HTML de leur projet
(aujourd'hui les maquettes V1 et V2 de Preopia) et laissent leurs retours. Accès par prénom et
code de projet ; administration séparée pour lire le journal et les retours.

## Routes

| Route | Rôle |
|---|---|
| `GET /clients/<projet>` | Sans session : formulaire Prénom + Code d'accès. Avec session : accueil du projet (versions, scénarios, mode d'emploi). |
| `POST /clients/<projet>/acces` | Vérifie le code, pose la session, renvoie vers l'accueil. |
| `POST /clients/<projet>/deconnexion` | Efface la session. |
| `GET /clients/<projet>/m/<chemin…>` | Sert un fichier de `private/clients/<projet>/` si la session est valide, sinon renvoie vers l'accès. Injecte le bouton « Laisser un retour » dans les pages HTML. |
| `POST /api/clients/<projet>/retours` | Enregistre un retour (session exigée, 8 Ko au plus, texte de 4000 caractères au plus). |
| `GET /clients/admin` | Administration : journal des accès et retours par projet, filtre par date. |
| `POST /clients/admin/acces`, `/deconnexion` | Connexion et déconnexion de l'administration. |
| `GET /clients/admin/export?projet=…&type=acces\|retours&du=…&au=…` | Export CSV (séparateur `;`, UTF-8 avec BOM, s'ouvre dans Excel). |

Les prototypes ne sont **pas** dans `public/` : rien n'est servi sans passer par le contrôle de
session. Les fichiers sont inclus dans la fonction Netlify par `outputFileTracingIncludes`
(`next.config.ts`).

## Variables d'environnement

À poser dans Netlify (Site configuration, Environment variables), portée « Functions » au moins.
**Aucun code ni aucun secret ne va dans le dépôt.**

| Variable | Contenu |
|---|---|
| `CLIENT_SESSION_SECRET` | Secret de signature des sessions (HMAC-SHA256) et des empreintes d'IP. 32 caractères au moins, aléatoire : `node -e 'console.log(require("crypto").randomBytes(32).toString("base64url"))'`. Le changer déconnecte tout le monde. |
| `CLIENT_CODE_PREOPIA` | Empreinte du code d'accès du projet Preopia, produite par `node scripts/hash-code.mjs '<code>'`. |
| `CLIENT_ADMIN_CODE` | Empreinte du code d'administration, même script. |

Un projet `mon-projet` lit `CLIENT_CODE_MON_PROJET` (capitales, tirets remplacés par `_`).

L'empreinte a la forme `scrypt:16384:8:1:<sel>:<empreinte>` (scrypt de Node, sel aléatoire de
16 octets). Elle ne contient pas de `$`, pour ne pas être développée par le chargeur de `.env`.
Changer le code d'un projet ferme les sessions ouvertes de ce projet.

En local, mettre des valeurs **de test** dans `.env.local` (ignoré par git).

## Ajouter un projet

1. Créer `content/clients/<projet>.json` sur le modèle de `preopia.json` : `slug` (identique au
   nom du fichier ; minuscules, chiffres et tirets ; `admin`, `api` et `m` sont réservés), `nom`,
   `sousTitre`, `description`, `mentionDonnees`, `versions` (libellé, titre, description,
   `dossier`, `entree` relative à `private/clients/<projet>/`, `miseAJour` au format AAAA-MM-JJ),
   `scenarios` (titre, objectif, étapes facultatives), `consignes`.
2. Déposer les fichiers dans `private/clients/<projet>/` (ou ajouter le projet à `SOURCES` dans
   `scripts/sync-prototypes.mjs`, puis lancer la synchronisation).
3. Générer le code : `node scripts/hash-code.mjs '<code>'`, poser `CLIENT_CODE_<PROJET>` sur
   Netlify, redéployer.
4. Transmettre au client l'adresse `https://medicastudio.fr/clients/<projet>` et le code, par
   deux canaux distincts de préférence.

Les textes du fichier JSON sont lus par le client : ils suivent les règles d'écriture des écrits
clients (relecture de Julian avant mise en ligne).

## Synchroniser les prototypes

```bash
node scripts/sync-prototypes.mjs preopia
```

Le script copie `maquette-v1/`, `maquette-v2/` et `commun/` depuis
`/home/omarchy/code/preopia/prototype/` (option `--source <dossier>` pour un autre chemin) vers
`private/clients/preopia/` :

- les liens symboliques (`maquette-v1/commun -> ../commun`) deviennent des copies réelles, pour que
  les chemins relatifs `commun/…` marchent une fois servis ;
- dans chaque page HTML, il retire l'attribut `data-artifact` des liens de version et le petit
  script qui les réécrivait vers claude.ai : les liens V1 et V2 restent relatifs
  (`../maquette-v2/`) et restent sur medicastudio.fr ; le script s'arrête en erreur s'il reste un
  lien claude.ai ;
- il met à jour `miseAJour` de chaque version dans `content/clients/preopia.json` (dernière
  modification des fichiers source).

Puis relire le diff, commiter, et déployer. Les maquettes ne doivent contenir que des données
fictives.

## Lire les retours

- **Administration** : `https://medicastudio.fr/clients/admin`, code d'administration. Par
  projet : nombre d'ouvertures, retours (date, prénom, version, page, texte) et journal des accès
  (date, prénom, page, navigateur abrégé, empreinte d'IP). Filtre par projet et par dates (jour de
  Paris). Les 200 lignes les plus récentes s'affichent ; l'export CSV contient tout.
- **Export CSV** : boutons « Retours (CSV) » et « Accès (CSV) » de chaque projet ; le filtre de
  dates s'applique.
- **Stockage brut** : magasin Netlify Blobs `espace-clients` du site, clés
  `acces/<projet>/<AAAA-MM-JJ>/…`, `retours/<projet>/<AAAA-MM-JJ>/…`, `tentatives/<portée>/<empreinte IP>`
  (valeurs JSON). Consultable depuis l'interface Netlify (Blobs).

## Sécurité

- **Session** : cookie `msc_<projet>` signé HMAC-SHA256, `HttpOnly`, `SameSite=Lax`, `Secure` en
  production, 30 jours, contenant le prénom et une empreinte courte du code en vigueur. Il est posé
  deux fois avec la même valeur, sur `Path=/clients/<projet>` (pages et maquettes) et sur
  `Path=/api/clients/<projet>` (envoi des retours) : le navigateur ne l'envoie nulle part ailleurs.
  Administration : cookie `msc_admin`, `Path=/clients/admin`, 12 heures.
- **Code** : comparaison scrypt en temps constant (`timingSafeEqual`) ; quand aucun code n'est
  configuré, une empreinte factice garde le même temps de calcul.
- **Tentatives** : 5 échecs en 15 minutes par projet et par IP bloquent 15 minutes (même règle pour
  l'administration). L'IP n'est jamais stockée en clair : HMAC de l'IP avec le secret de session,
  16 caractères hexadécimaux. L'IP vient de `x-nf-client-connection-ip` (posé par Netlify), à
  défaut `x-forwarded-for`.
- **Fichiers** : chaque segment du chemin est contrôlé (pas de `..`, de `.` initial, de séparateur
  ni de caractère de contrôle), le chemin résolu doit rester sous `private/clients/<projet>/`, les
  liens symboliques ne sont pas suivis, seuls les types connus sont servis (`Content-Type` exact,
  `nosniff`). Un dossier renvoie vers son `index.html`.
- **Requêtes modifiantes** : en-tête `Origin` contrôlé (même hôte) en plus de `SameSite=Lax` ;
  retours en JSON uniquement, taille bornée, caractères de contrôle et de direction retirés,
  affichage échappé par React, cellules CSV neutralisées contre les formules.
- **Confidentialité** : `noindex, nofollow` en balise meta (layout de `/clients`) et en en-tête
  `X-Robots-Tag` (`next.config.ts` et chaque réponse des route handlers) ; `Disallow: /clients`
  dans `robots.txt` ; `/clients` absent du sitemap ; Google Analytics ne se charge pas sur
  `/clients` et y est désactivé (`ga-disable-<ID>`) s'il a été chargé ailleurs sur le site ;
  réponses `Cache-Control: private, no-store`. La bannière cookies mentionne le cookie de session
  dans les cookies strictement nécessaires.

## Choix liés à la plateforme

- **Pas de middleware** : le contrôle se fait dans chaque route handler et chaque page, au plus près
  du fichier servi. Un middleware ne protège pas des fichiers statiques de `public/`, d'où le
  dossier `private/`.
- **Barre oblique finale** : Next redirige `/…/maquette-v2/` vers `/…/maquette-v2` ; le handler
  renvoie alors vers `/…/maquette-v2/index.html`, ce qui garde justes les liens relatifs.
- **Blobs en local** : hors Netlify, `@netlify/blobs` n'a pas de contexte. Le stockage bascule sur
  des fichiers JSON dans `.data/espace-clients/` (ignoré par git). Ce repli est refusé dans une
  fonction Netlify, pour ne jamais écrire le journal sur un disque éphémère. `netlify dev`
  fournirait le bac à sable des Blobs, non essayé ici.
- **Limite des tentatives** : stockée dans Blobs en cohérence forte ; deux requêtes simultanées
  peuvent compter un échec de moins (pas de compteur atomique), acceptable pour cet usage. La
  limite anti-rafale des retours (10 par minute et par IP) est en mémoire, par instance de
  fonction.

## Limites connues

- Le bouton « Signaler » des maquettes est une démonstration de la future fonction : il n'envoie
  rien. Seul le bouton « Laisser un retour » (bord droit) transmet.
- Les clics sur le bouton de retour ne sont pas comptés par le chronomètre des maquettes
  (événements arrêtés à la frontière du shadow DOM), mais un retour laissé pendant un scénario
  chronométré allonge le temps mesuré.
- Le journal compte chaque chargement de page HTML (accueil et maquettes), pas les fichiers CSS,
  JS ou images.
