---
template: application
title: "Linkemed"
slug: "linkemed"
description: "Plateforme de mise en relation entre médecins (remplaçants, collaborateurs, installations) et établissements de santé. Quatre domaines servis depuis un même monolithe Next.js 16 via un proxy edge : landing médecins (linkemed.fr), portail B2B self-serve (pro.linkemed.fr), portails directeurs de cliniques (elsan.linkemed.fr) et diagnostic d'installation PADHUE (padhue.care). Le tout piloté par un CRM marketing interne, LinkeMed OS."
longDescription: "Linkemed est le produit principal du positionnement 'recrutement médical de nouvelle génération'. L'application est construite autour d'un même monolithe Next.js 16 qui dessert quatre domaines distincts via un proxy edge (proxy.ts) : la landing B2C médecins (linkemed.fr), le portail B2B self-serve des établissements (pro.linkemed.fr), des portails directeurs en marque blanche pour les groupes de cliniques (elsan.linkemed.fr, extensible Ramsay / Vivalto…) et un parcours de diagnostic d'installation pour les médecins à diplôme hors UE (padhue.care). Chaque domaine partage la même stack Firebase (Auth, Firestore, Admin SDK) mais expose des contenus, des règles d'accès et des sessions isolées par cookies. Côté médecin, deux moteurs de simulation : un simulateur fiscal salariat / libéral (publicodes + modele-social, les mêmes 722 règles que mon-entreprise.urssaf.fr) et, pour les directeurs de clinique, un simulateur d'économie clinique qui modélise le compte de résultat salariat vs libéral par spécialité. Le diagnostic PADHUE oriente chaque praticien selon son jalon de parcours (à l'étranger, prépare l'EVC, lauréat, plein exercice). L'ensemble est piloté en interne par LinkeMed OS, un CRM marketing propriétaire (leads unifiés, campagnes Meta / Google / LinkedIn, génération de visuels par IA, médiathèque), et nourri par des séquences email drip orchestrées par un cron Vercel quotidien via Resend. Recherche d'annonces sous-seconde via Meilisearch auto-hébergé."
image: "/images/projects/linkemed/hero.png"
order: 1
status: published

metadata:
  year: "2026"
  client: "Linkemed SAS — médecins et établissements de santé"
  role: "Full-Stack Developer & Architecte technique"
  duration: "En production — linkemed.fr, pro.linkemed.fr, elsan.linkemed.fr et padhue.care live"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - shadcn/ui
  - Base UI
  - Framer Motion
  - Lenis
  - React Hook Form
  - Zod
  - Firebase Auth
  - Firebase Firestore
  - Firebase Admin SDK
  - Meilisearch
  - Resend
  - publicodes
  - modele-social
  - OpenAI
  - React PDF
  - Cal.com
  - dnd-kit
  - sharp
  - PostHog
  - Vercel Analytics
  - Vitest
  - Playwright
  - Vercel

features:
  - title: "Quatre domaines sur un même monolithe"
    description: "Un proxy edge Next.js (proxy.ts) réécrit linkemed.fr (landing médecins), pro.linkemed.fr (B2B self-serve), elsan.linkemed.fr (portails directeurs marque blanche) et padhue.care (diagnostic d'installation) vers des segments isolés de l'app. Une seule base de code, un seul déploiement, quatre domaines avec sessions et cookies cloisonnés."
  - title: "Simulateur fiscal médecin (publicodes)"
    description: "Comparaison salariat / libéral à revenu donné via le moteur officiel URSSAF (publicodes + modele-social, 722 règles, barèmes 2025/2026). PDF récapitulatif généré via @react-pdf/renderer pour préparer un rendez-vous avec un expert-comptable."
  - title: "Simulateur d'économie clinique B2B"
    description: "Pour les directeurs de clinique : modélisation du compte de résultat salariat vs libéral par spécialité (16 spécialités MCO, GHS, part d'honoraires captée paramétrable), avec historique des simulations sauvegardé par directeur."
  - title: "Diagnostic d'installation PADHUE par jalon"
    description: "padhue.care guide les médecins à diplôme hors UE selon leur étape réelle de parcours (à l'étranger, exerce salarié, prépare l'EVC, lauréat, plein exercice) et propose une feuille de route et des actions contextuelles."
  - title: "LinkeMed OS — CRM marketing propriétaire"
    description: "Plateforme d'administration interne : pipeline de leads unifié (dual-write des collections legacy), campagnes Meta / Google / LinkedIn, génération de visuels par IA (OpenAI), médiathèque et brand kit centralisés, modération des annonces."
  - title: "Recherche Meilisearch et séquences drip"
    description: "Recherche d'annonces full-text sous-seconde via Meilisearch auto-hébergé (Scaleway, reverse proxy Caddy qui strippe les cookies). Séquences email transactionnelles et marketing pilotées par un cron Vercel quotidien (Resend)."
  - title: "Tests unitaires et E2E"
    description: "Vitest pour la logique métier (simulateurs, règles de matching, rules Firestore via emulator), Playwright pour les parcours critiques (inscription, candidature, simulateurs, portails B2B)."

links:
  demo: "https://linkemed.fr"
  website: "https://pro.linkemed.fr"

gallery:
  - "/images/projects/linkemed/hero.png"
---
