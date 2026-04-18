---
template: application
title: "CRM Linkemed"
slug: "crm-linkemed"
description: "CRM interne de recrutement médical pour Linkemed : gestion des médecins (base, statuts, notes), pipeline Kanban de candidatures à 19 statuts, recherche Algolia full-text multi-index, analytics Recharts, documentation in-app de 14 articles."
longDescription: "Le CRM Linkemed est l'outil interne utilisé par l'équipe pour suivre médecins, postes, candidatures et clients (établissements). Il combine une base médecins avec édition inline et enrichissement automatique, un pipeline Kanban à 19 statuts (matched → placed) via @dnd-kit, un calendrier d'entretiens synchronisé iCal, et une recherche Algolia full-text sur quatre index (doctors, jobs, clients, contacts). La couche state repose sur Zustand + React Query pour des mises à jour optimistes et de la hydratation server-friendly. L'app embarque 14 articles de documentation interne avec navigation sidebar et table des matières sticky (IntersectionObserver). Version 2.18.0 en production."
image: "/images/projects/crm-linkemed/hero.svg"
order: 5
status: published
confidential: true

metadata:
  year: "2025-2026"
  client: "Linkemed SAS — équipe interne"
  role: "Full-Stack Developer & Product Lead"
  duration: "En production — v2.18.0 (février 2026)"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS
  - Radix UI
  - shadcn/ui
  - Zustand
  - React Query
  - React Hook Form
  - Zod
  - Firebase Auth
  - Firebase Firestore
  - Firebase Admin SDK
  - Algolia
  - "@dnd-kit"
  - "@tanstack/react-table"
  - "@tanstack/react-virtual"
  - Leaflet
  - Recharts
  - xlsx
  - Commander
  - Vitest
  - Playwright
  - MSW
  - Faker
  - Vercel

features:
  - title: "Base médecins avec édition inline"
    description: "Table virtualisée @tanstack/react-table + @tanstack/react-virtual, édition inline des champs, statuts (Nouveau, À l'écoute, Placé, Inactif), notes centralisées, provenance LinkedIn, dernier contact tracé."
  - title: "Pipeline Kanban à 19 statuts"
    description: "Drag & drop @dnd-kit du matching initial au placement. Transitions validées (certaines étapes obligatoires), auto-notes contextualisées à chaque changement de statut pour garder l'historique lisible."
  - title: "Recherche Algolia multi-index"
    description: "Full-text search sur quatre index (doctors, jobs, clients, contacts), facettes, typo-tolérance, filtres combinables. Indexation maintenue côté Cloud Functions Firebase."
  - title: "Analytics et export"
    description: "Graphiques Recharts (conversion par étape, heatmap d'activité), export Excel (xlsx) des rapports, CLI Commander pour les migrations de données médecins (dédoublonnage, enrichissement batch)."
  - title: "Documentation in-app (14 articles)"
    description: "Articles organisés en quatre sections (intro, modules, outils, avancé) avec sidebar de navigation, TOC sticky pilotée par IntersectionObserver, et recherche intégrée."

links: {}
---
