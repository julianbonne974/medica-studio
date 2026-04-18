---
template: application
title: "CyberSanté Médico-Social"
slug: "cybersante-medicosocial"
description: "SaaS freemium/Pro de cybersécurité dédié aux ESMS français indépendants (EHPAD, SAAD, SSIAD, ESAT, FAM, MAS) : scan OSINT passif en 5 min, rapport conformité HAS 2025 / CaRE / HDS 2.0, plan d'action IA, marketplace d'experts freelances."
longDescription: "CyberSanté Médico-Social cible les structures du médico-social qui n'ont ni DSI ni CTO et doivent pourtant répondre aux référentiels HAS 2025, CaRE et HDS 2.0. Le parcours commence par un scan OSINT passif (empreinte web externe) en 5 minutes qui produit un rapport PDF scoré sur 100. Les utilisateurs Pro (99 à 199€/mois) bénéficient d'un monitoring continu, d'une checklist HAS priorisée et d'un plan d'action généré par IA via les Generative APIs de Scaleway (Mistral, Llama). Une marketplace d'experts certifiés CEH/OSCP prend le relais pour la remédiation, avec une commission plateforme de 20 à 25%. Le projet réutilise l'ossature Next.js 16 et le design system Sage Medical initié sur Linkemed."
image: "/images/projects/cybersante-medicosocial/hero.svg"
order: 3
status: published

metadata:
  year: "2026"
  client: "ESMS indépendants et publics — EHPAD, SAAD, SSIAD, ESAT, FAM, MAS"
  role: "Fondateur & Architecte"
  duration: "POC validé (avril 2026) — phase de scaffolding"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - shadcn/ui
  - Firebase Auth
  - Firebase Firestore
  - Firebase Admin SDK
  - PostgreSQL
  - Scaleway
  - Scaleway Generative APIs
  - Mistral
  - Llama
  - Resend
  - React PDF
  - PostHog
  - Vitest
  - Playwright

features:
  - title: "Scanner OSINT passif en 5 minutes"
    description: "Pipeline d'empreinte web externe (DNS, certificats TLS, headers HTTP, DMARC/SPF/DKIM, CVE des logiciels exposés) qui produit un rapport PDF scoré sur 100, livré à l'utilisateur sans avoir à installer quoi que ce soit."
  - title: "Référentiels HAS 2025 / CaRE / HDS 2.0"
    description: "Rapports estampillés aux référentiels officiels HAS 2025, CaRE et HDS 2.0 pour alimenter les dossiers de financement (ARS, FIR) et les audits de conformité."
  - title: "Pack email security quick-win"
    description: "Forfait 500 à 1 500€ : déploiement DMARC + SPF + DKIM, vérification d'envoi, rapport de conformité signé — un levier concret contre le phishing vers les bénéficiaires et familles."
  - title: "Abonnement Pro avec plan d'action IA"
    description: "99 à 199€/mois : monitoring continu, checklist HAS priorisée, plan d'action généré par IA Scaleway (Mistral, Llama) à partir du score et des vulnérabilités détectées."
  - title: "Marketplace d'experts CEH/OSCP"
    description: "Mise en relation avec des experts freelances certifiés pour la remédiation. Commission plateforme de 20 à 25%, facturation intégrée."

impact:
  custom:
    - label: "EHPAD scannés pendant le POC"
      value: "20"
    - label: "Score HAS < 50/100"
      value: "85% des établissements"
---
