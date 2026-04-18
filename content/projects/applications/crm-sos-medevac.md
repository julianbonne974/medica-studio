---
template: application
title: "CRM SOS MEDEVAC"
slug: "crm-sos-medevac"
description: "CRM médical dédié à la gestion complète des évacuations sanitaires (EVASAN) et des événements médicaux : ouverture de dossier, coordination des escortes médicaux, devis et factures, documents médicaux chiffrés, audit trail complet."
longDescription: "SOS MEDEVAC est un CRM développé pour une structure spécialisée dans les évacuations sanitaires et la coordination médicale (Polynésie française). Il couvre le cycle complet d'un dossier EVASAN, de l'ouverture à l'archivage, en passant par la coordination des escortes, la facturation et la traçabilité d'audit. L'architecture repose sur Next.js 16 + tRPC v11 avec une hiérarchie de procédures (publicProcedure → protectedProcedure → auditedProcedure / trackedProcedure) qui garantit qu'aucune mutation sensible n'échappe au journal d'audit. Les documents médicaux sont stockés chiffrés en bytea PostgreSQL sur Scalingo HDS (conformité Art. L.1111-8 du Code de la santé publique), les documents non médicaux sur Scaleway S3 (fr-par). Observabilité triplée : Sentry, Axiom, Better Stack."
image: "/images/projects/crm-sos-medevac/hero.svg"
order: 4
status: published
confidential: true

metadata:
  year: "2026"
  client: "Structure EVASAN (Polynésie française)"
  role: "Full-Stack Developer & Architecte"
  duration: "En production — déploiement Scalingo depuis février 2026"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - shadcn/ui
  - Radix UI
  - tRPC v11
  - NextAuth v5
  - Prisma
  - PostgreSQL 17
  - Scalingo HDS
  - Scaleway S3
  - React Hook Form
  - Zod
  - Leaflet
  - Tiptap
  - Nodemailer
  - imapflow
  - Web Push
  - iCal
  - Recharts
  - Sentry
  - Axiom
  - Better Stack
  - Vitest
  - Playwright
  - Scalingo

features:
  - title: "Cycle complet dossier EVASAN"
    description: "Ouverture, coordination des escortes médicaux, devis et factures, génération de rapports PDF (html2canvas + pdf-lib), export ZIP du dossier archivé."
  - title: "Journal d'audit mutable-proof"
    description: "tRPC auditedProcedure qui enregistre chaque mutation (qui, quoi, quand, état avant/après) dans une table append-only, avec trackedProcedure pour les opérations les plus sensibles."
  - title: "Stockage documents médicaux HDS"
    description: "Documents médicaux chiffrés en bytea PostgreSQL sur Scalingo HDS (conformité Art. L.1111-8 du Code de la santé publique) ; documents non médicaux sur Scaleway S3 fr-par."
  - title: "Calendrier iCal et messagerie IMAP"
    description: "Export et synchronisation iCal pour la coordination des escortes et des entretiens. Intégration IMAP (imapflow) pour rapatrier les échanges email directement dans le dossier patient."
  - title: "Cartographie Leaflet"
    description: "Visualisation géolocalisée des évacuations (départ, arrivée, escales) sur fond de carte Leaflet + OpenStreetMap."

links: {}
---
