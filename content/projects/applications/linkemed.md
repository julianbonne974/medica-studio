---
template: application
title: "Linkemed"
slug: "linkemed"
description: "Plateforme de mise en relation entre médecins (remplaçants, collaborateurs, installations) et établissements de santé. Trois surfaces servies depuis un même monolithe Next.js 16 via un proxy edge : landing médecins (linkemed.fr), portail B2B self-serve (pro.linkemed.fr), portail dédié Elsan (elsan.linkemed.fr)."
longDescription: "Linkemed est le produit principal du positionnement 'recrutement médical de nouvelle génération'. L'application est construite autour d'un même monolithe Next.js 16 qui dessert trois surfaces distinctes via un proxy edge (proxy.ts) : la landing B2C médecins, le portail B2B self-serve pour les établissements partenaires, et un portail dédié pour le groupe Elsan. Chaque surface partage la même stack Firebase (Auth, Firestore, Admin SDK) mais expose des contenus, des règles d'accès et des vues différentes. Le site intègre un simulateur fiscal médecin (moteur publicodes + modele-social) et des séquences email drip orchestrées par un cron Vercel quotidien via Resend."
image: "/images/projects/linkemed/hero.svg"
order: 1
status: published

metadata:
  year: "2026"
  client: "Linkemed SAS — médecins et établissements de santé"
  role: "Full-Stack Developer & Architecte technique"
  duration: "En production — landing live depuis avril 2026"

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
  - Resend
  - publicodes
  - modele-social
  - React PDF
  - PostHog
  - Vercel Analytics
  - Vitest
  - Playwright
  - Vercel

features:
  - title: "Trois surfaces sur un même monolithe"
    description: "Edge proxy Next.js qui réécrit linkemed.fr (landing médecins), pro.linkemed.fr (B2B self-serve) et elsan.linkemed.fr (portail dédié groupe Elsan) vers des segments isolés de l'app. Une seule base de code, un seul pipeline de déploiement, trois domaines et trois expériences distinctes."
  - title: "Simulateur fiscal médecin intégré"
    description: "Moteur de calcul URSSAF / CARMF / IR basé sur publicodes + modele-social pour comparer salariat et exercice libéral à revenu donné. PDF récapitulatif généré via @react-pdf/renderer, téléchargeable pour un rendez-vous avec un expert-comptable."
  - title: "Portail B2B self-serve établissements"
    description: "pro.linkemed.fr permet aux établissements partenaires de publier des postes, consulter les candidatures, gérer les utilisateurs internes (RBAC Firestore) et exporter des CVthèques."
  - title: "Séquences email drip cron-driven"
    description: "Cron Vercel quotidien (09:00 UTC) qui pilote des séquences email transactionnelles et marketing via Resend : onboarding médecin, relances candidats, alertes établissements."
  - title: "Tests unitaires et E2E"
    description: "Vitest pour la logique métier (simulateur fiscal, règles de matching), Playwright pour les parcours critiques (inscription, candidature, simulateur, portails B2B)."

links:
  demo: "https://linkemed.fr"
  website: "https://pro.linkemed.fr"

gallery:
  - "/images/projects/linkemed/hero.svg"
---
