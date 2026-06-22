---
template: application
title: "CRM Linkemed"
slug: "crm-linkemed"
description: "CRM interne de recrutement médical pour Linkemed : base médecins éditable en ligne, pipeline de candidatures à 19 statuts (Kanban @dnd-kit), recherche Algolia full-text sur 5 index, module PADHUE de vérification automatisée de l'autorisation d'exercice (ingestion JORF / CNG), import Excel assisté par IA (Gemini), cartographie Leaflet et intégrations Google Calendar / Gmail."
longDescription: "Le CRM Linkemed est l'outil interne utilisé par l'équipe pour suivre médecins, postes, candidatures et établissements clients. Il combine une base médecins avec édition inline sur table virtualisée (@tanstack/react-table + react-virtual), un pipeline de candidatures à 19 statuts (10 avant envoi du CV, 9 après) avec transitions validées et auto-notes contextualisées, un Kanban des postes à 8 statuts via @dnd-kit, et une recherche Algolia full-text sur cinq index (médecins, postes, clients, contacts, établissements). La couche d'état repose sur Zustand (store persisté) + TanStack Query pour des mises à jour optimistes. Le CRM intègre un module PADHUE de vérification de l'autorisation d'exercice des médecins à diplôme hors UE : un pipeline ingère automatiquement plus de 16 600 lauréats EVC depuis les arrêtés JORF (API Légifrance) et les PDF du CNG, puis rapproche chaque médecin par nom / prénom / spécialité (distance de Levenshtein, niveau de confiance exact / probable / ambigu) et matérialise un funnel à 4 jalons avec preuves cliquables. L'import de médecins se fait par fichier Excel assisté par IA (Google Gemini) : validation des formats, correction suggérée des spécialités et arbitrage des doublons, jamais appliqués sans validation humaine. S'ajoutent une cartographie Leaflet avec clustering, des intégrations natives Google Calendar et Gmail (sync bidirectionnelle, OAuth), un dashboard analytics (Recharts), une documentation in-app de 14 articles, un CLI interne (Commander) et un RBAC à trois rôles. Version 2.21 en production."
image: "/images/projects/crm-linkemed/hero.png"
order: 5
status: published
confidential: true

metadata:
  year: "2025-2026"
  client: "Linkemed SAS — équipe interne"
  role: "Full-Stack Developer & Product Lead"
  duration: "En production — v2.21 (juin 2026)"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS
  - Radix UI
  - shadcn/ui
  - Zustand
  - TanStack Query
  - TanStack Table
  - TanStack Virtual
  - "@dnd-kit"
  - React Hook Form
  - Zod
  - Firebase Auth
  - Firebase Firestore
  - Firebase Admin SDK
  - Algolia
  - Google Gemini
  - Google Calendar API
  - Gmail API
  - Leaflet
  - Recharts
  - xlsx
  - Commander
  - Vitest
  - Playwright
  - MSW
  - Vercel

features:
  - title: "Base médecins éditable en ligne"
    description: "Table virtualisée @tanstack/react-table + @tanstack/react-virtual, édition inline (F2 / Échap / Entrée), densité configurable, sélection multiple avec barre d'actions, statuts, notes centralisées et provenance tracée."
  - title: "Pipeline de candidatures à 19 statuts"
    description: "19 statuts répartis en deux phases (10 avant envoi du CV, 9 après) avec transitions validées et auto-notes contextualisées à chaque changement. Les postes disposent d'un Kanban @dnd-kit à 8 statuts (Media → Placed)."
  - title: "Module PADHUE — autorisation d'exercice"
    description: "Pipeline qui ingère automatiquement plus de 16 600 lauréats EVC depuis les arrêtés JORF (API Légifrance) et les PDF du CNG, rapproche chaque médecin par nom / spécialité (Levenshtein, confiance exact / probable / ambigu) et matérialise un funnel à 4 jalons avec preuves cliquables."
  - title: "Import Excel assisté par IA"
    description: "Import de médecins par fichier Excel avec validation des formats, correction des spécialités et arbitrage des doublons suggérés par Google Gemini — jamais appliqués sans validation humaine, avec historique complet des sessions d'import."
  - title: "Recherche Algolia multi-index"
    description: "Recherche full-text sur cinq index (médecins, postes, clients, contacts, établissements), facettes et highlighting, raccourci ⌘K, tolérance de typo réglée au minimum pour éviter les faux positifs. Indexation maintenue côté serveur."
  - title: "Cartographie, agenda et messagerie intégrés"
    description: "Cartographie Leaflet avec clustering des entités, intégrations natives Google Calendar (sync bidirectionnelle des entretiens) et Gmail (envoi, suivi, pièces jointes), dashboard analytics Recharts, documentation in-app (14 articles) et CLI interne (Commander)."

links: {}
---
