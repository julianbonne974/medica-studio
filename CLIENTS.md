# Espace clients (`/clients`)

Espace protégé de medicastudio.fr où les clients ouvrent les prototypes HTML de leur projet
(aujourd'hui les maquettes V1, V2, V2-A, V2-B et V3 de Preopia) et laissent leurs retours. Accès par prénom et
code de projet ; administration séparée pour lire le journal et les retours.

## Routes

| Route | Rôle |
|---|---|
| `GET /clients/<projet>` | Sans session : formulaire Prénom + Code d'accès. Avec session : accueil du projet (versions, scénarios, mode d'emploi). |
| `POST /clients/<projet>/acces` | Vérifie le code, pose la session, renvoie vers l'accueil. |
| `POST /clients/<projet>/deconnexion` | Efface la session. |
| `GET /clients/<projet>/m/<chemin…>` | Sert un fichier de `private/clients/<projet>/` si la session est valide, sinon renvoie vers l'accès. Injecte le bouton « Laisser un retour » dans les pages HTML. |
| `POST /api/clients/<projet>/retours` | Enregistre un retour (session exigée, 8 Ko au plus, texte de 4000 caractères au plus). |
| `GET /clients/<projet>/questions` | Questionnaire du projet (voir « Questionnaires ») ; sans session, formulaire d'accès qui ramène ici. |
| `GET`, `PUT /api/clients/<projet>/questions` | Lit ou remplace les réponses de la personne connectée ; `PUT` avec `"envoyer": true` marque l'envoi. |
| `GET /clients/admin/image?projet=…&src=…` | Image d'un questionnaire pour l'administration (seules les images citées par le fichier sont servies). |
| `GET /clients/admin` | Administration : journal des accès et retours par projet, filtre par date. |
| `POST /clients/admin/acces`, `/deconnexion` | Connexion et déconnexion de l'administration. |
| `GET /clients/admin/export?projet=…&type=acces\|retours\|questionnaire&du=…&au=…` | Export CSV (séparateur `;`, UTF-8 avec BOM, s'ouvre dans Excel). Le filtre de dates ne s'applique pas au questionnaire. |

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
`private/clients/preopia/`, ainsi que les builds Vite des maquettes V2-A, V2-B et V3
(`v2-shadcn/apps/v2a-console/dist` → `v2a-console/`, `v2-shadcn/apps/v2b-tablette/dist` →
`v2b-tablette/`, `v2-shadcn/apps/v3/dist` → `v3/`), qui doivent exister (`pnpm build` dans `prototype/v2-shadcn/`, sinon le script
s'arrête) :

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

## Questionnaires

Après une réunion, le client lit un compte rendu, valide des changements, choisit entre des
variantes d'écran et répond à des questions, sur `/clients/<projet>/questions`. Une carte en tête
de l'accueil du projet y mène et montre où en est la personne connectée (pas commencé, en cours,
envoyé le …). Aucune question n'est obligatoire.

### Fichier de contenu

Un questionnaire par projet : `content/clients/questionnaires/<projet>.json`. Il est validé à
chaque chargement ; s'il est invalide, la carte et la page sont masquées côté client et
l'administration affiche l'erreur avec son emplacement (`sections[1].questions[0].image : image
introuvable : …`). Les clés qui commencent par `_` ou `$` sont des notes de rédaction, ignorées ;
toute autre clé inconnue est refusée (pour attraper les fautes de frappe).

```jsonc
{
  "id": "reunion-2026-11-25",          // minuscules, chiffres, tirets : sert aux clés de stockage
  "projet": "preopia",                 // identique au nom du fichier
  "titre": "…", "sousTitre": "…",      // titre repris tel quel sur la carte de l'accueil
  "dateSouhaitee": "2026-11-30",       // facultatif, affiché « si possible avant le … »
  "intro": ["paragraphe", "…"],        // facultatif
  "sections": [
    {
      "id": "compte-rendu", "titre": "…", "intro": "…",   // intro facultative
      "blocs": [                                          // facultatif : contenu à lire
        { "type": "paragraphe", "texte": "…" },
        { "type": "liste", "items": ["…"] },
        { "type": "image", "src": "questions/fichier.png", "alt": "…", "legende": "…" },
        { "type": "tableau", "colonnes": ["…"], "lignes": [["…", "…"]] },
        { "type": "encadre", "titre": "…", "texte": "…" }
      ],
      "questions": [                                      // facultatif
        { "id": "q-…", "type": "choix-unique" | "choix-multiple", "intitule": "…", "aide": "…",
          "options": [{ "id": "a", "libelle": "…" }], "autre": true, "commentaire": true },
        { "id": "q-…", "type": "texte-court" | "texte-long", "intitule": "…", "aide": "…", "exemple": "…" },
        { "id": "q-…", "type": "validation", "intitule": "…", "aide": "…" },
        { "id": "q-…", "type": "variantes", "intitule": "…", "aide": "…",
          "options": [{ "id": "a", "libelle": "Variante A", "image": "questions/x-a.png", "legende": "…" }],
          "aucune": true, "commentaire": true },
        { "id": "q-…", "type": "tableau-saisie", "intitule": "…", "aide": "…",
          "colonnes": [{ "id": "nom", "libelle": "Nom", "type": "texte" | "tel" | "choix", "options": ["…"] }],
          "lignesInitiales": 3 }
      ]
    }
  ]
}
```

- Toute question accepte aussi `"image": "questions/….png"` et `"legende": "…"` : une
  illustration affichée sous l'intitulé et l'aide, agrandissable au clic, légende dessous.
- Les identifiants de section et de question sont uniques dans le fichier, ceux d'option dans la
  question. `autre` est réservé quand la question a `"autre": true`, `aucune` quand elle a
  `"aucune": true` ; sinon ce sont des identifiants comme les autres.
- Images (`src`, `image`) : relatives à `private/clients/<projet>/`, sans `..`, en png, jpg, webp,
  gif, avif ou svg ; le fichier doit exister. Le client les reçoit par `/clients/<projet>/m/…`
  (session exigée), l'administration par `/clients/admin/image`.
- `validation` affiche « Je garde » / « Je change » ; « Je change » ouvre « Ce que vous voulez à
  la place ». `variantes` affiche des cartes dont l'image s'agrandit au clic, le choix se fait par
  le bouton radio sous l'image. `tableau-saisie` : 40 lignes au plus ; `tel` n'accepte que
  chiffres, espaces et `+ ( ) . / -`.
- Changer d'`id` repart de zéro (nouvelles clés de stockage). Retirer une question ou une option
  n'efface rien : les réponses devenues invalides sont simplement ignorées à la lecture.

### Enregistrement et envoi

- Brouillon enregistré côté serveur 1,5 s après la dernière frappe, à la sortie d'un champ et à la
  fermeture de la page ; restauré à la réouverture, sur n'importe quel appareil, avec le même
  prénom. État visible : « Enregistrement… », « Enregistré à 14 h 32 », ou l'erreur et ce qu'il
  faut faire (se reconnecter, réessayer).
- « Envoyer mes réponses » ajoute la date aux envois ; on peut continuer à modifier et renvoyer.
- Une personne ne voit que ses réponses : la clé est le prénom de la session, normalisé
  (minuscules, sans accents). Deux personnes qui se connectent avec le même prénom partagent donc
  les mêmes réponses.

### API

`PUT /api/clients/<projet>/questions`, corps `{ "reponses": { "<id question>": … }, "envoyer"?: true }`,
remplace toutes les réponses de la personne. Mêmes protections que les retours : session, en-tête
`Origin`, JSON seulement, 64 Ko au plus, anti-rafale (90 écritures par minute et par IP et
prénom, en mémoire). Chaque réponse est contrôlée contre le fichier de contenu (question connue,
option connue, forme attendue, textes nettoyés et bornés à 4000 caractères, 500 pour un texte
court ou une cellule) ; la moindre valeur non prévue fait refuser l'envoi (400 avec le détail).
Formes : `choix-unique` `{ choix, autre?, commentaire? }`, `choix-multiple` `{ choix: [], autre?, commentaire? }`,
textes `{ texte }`, `validation` `{ decision: "garder" | "changer", precision? }`,
`variantes` `{ choix, commentaire? }` (`choix` vaut `aucune` pour « Aucune ne me convient »),
`tableau-saisie` `{ lignes: [{ <id colonne>: "…" }] }`. L'ouverture de la page est notée au
journal des accès (page `questions`).

### Stockage et lecture des réponses

- Clé `questionnaires/<projet>/<id du questionnaire>/<prénom normalisé>`, valeur
  `{ prenom, reponses, majLe, envois: [dates ISO] }` (Netlify Blobs en ligne, `.data/` en local).
- **Administration** : pour chaque projet qui a un questionnaire, la liste des répondants
  (prénom, dernière modification, envoi, nombre de réponses) et, en dépliant, les réponses de
  chacun, intitulé par intitulé, avec l'image des variantes choisies. « Questionnaire (CSV) » :
  une ligne par répondant et par question (répondant, section, question, réponse, autre,
  commentaire, modifié le, dernier envoi), réponses vides comprises.

### Projet d'essai (développement)

En `next dev` seulement, le projet `exemple` lit `content/clients/_exemple.json`,
`content/clients/questionnaires/_exemple.json` (tous les types de blocs et de questions) et
`private/clients/_exemple/`. Un fichier dont le nom commence par `_` n'est jamais chargé par
`next build` / `next start`. Pour l'ouvrir : `CLIENT_CODE_EXEMPLE` (empreinte d'un code de test)
dans `.env.development.local`, puis `http://localhost:3000/clients/exemple/questions`.

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
- **Retour après connexion** : le formulaire d'accès porte un champ `suite` ; seule la valeur
  `questions` est reconnue (renvoi vers `/clients/<projet>/questions`), toute autre valeur ramène
  à l'accueil du projet. Aucune adresse reçue n'est suivie telle quelle.
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
