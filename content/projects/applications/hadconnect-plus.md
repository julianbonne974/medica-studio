---
template: application
title: "HADconnect+"
slug: "hadconnect-plus"
description: "Solution SaaS de facturation automatisée pour les infirmiers libéraux (IDEL) travaillant avec les structures d'Hospitalisation À Domicile (HAD)"
longDescription: "HADconnect+ révolutionne la facturation entre infirmiers libéraux et structures HAD en France. Actuellement, les IDEL facturent manuellement les HAD sans Carte Vitale, avec des règles spécifiques (Article 11B) et des délais de 15-30 jours. Notre solution automatise l'ensemble du processus via une app mobile FlutterFlow pour les soins quotidiens et un dashboard Next.js pour la gestion administrative, le tout synchronisé sur Firebase en temps réel."
image: "/images/projects/hadconnect/hadconnect-hero.jpg"
mobileImage: "/images/projects/hadconnect/mobile-tournee.jpg"
order: 3
status: published

metadata:
  year: "2024-2026"
  team: "2 personnes"
  client: "IDEL & Structures HAD"
  duration: "En développement - Phase 2/6 en cours"
  role: "Lead Developer & Product Designer"

technologies:
  - Next.js 14
  - TypeScript
  - Firebase Firestore
  - Firebase Auth
  - FlutterFlow
  - Tailwind CSS
  - shadcn/ui
  - Stripe
  - Cloud Functions
  - Vercel
  - iOS
  - Android
  - PWA
  - Hébergement de Santé

features:
  - title: "Application mobile IDEL"
    description: "Interface FlutterFlow avec écran tournée, saisie rapide des actes, calcul automatique et signature électronique des interventions"
  - title: "Dashboard web HAD"
    description: "Interface Next.js 14 avec métriques temps réel, validation des factures en un clic, gestion des partenaires IDEL et exports comptables CSV/XML"
  - title: "Calcul automatique Article 11B"
    description: "Application stricte des règles HAD : tarif plein sans dégressivité (AMI4+AMI2+AMI1 = 28€+14€+7€ = 49€ vs 35€ en libéral classique)"
  - title: "Parser NGAP intelligent"
    description: "Script JavaScript d'extraction automatique de 37 actes depuis le PDF officiel NGAP avec catégorisation et calcul des tarifs"
  - title: "Architecture Firebase unifiée"
    description: "Base Firestore partagée entre mobile et web avec 5 collections (users, hads, patients, interventions, facturations) et sync temps réel"
  - title: "Authentification multi-rôles"
    description: "Firebase Auth avec custom claims pour rôles différenciés (IDEL / HAD admin) et security rules granulaires"
  - title: "Génération de bordereaux PDF"
    description: "Cloud Functions pour génération automatique des bordereaux mensuels avec détail des interventions et calculs conformes"
  - title: "Intégration Stripe"
    description: "Système d'abonnement IDEL avec webhooks, gestion automatique des paiements et facturation récurrente"

impact:
  users: "En développement - Programme pilote prévu"
  reduction: "Réduction estimée de 80% du temps de facturation"
  satisfaction: "Phase de tests à venir"

timeline:
  - date: "Sept 2024"
    title: "Phase 1 - Setup initial & Parser NGAP ✅"
    description: "Configuration Firebase, développement parser NGAP intelligent, extraction automatique de 37 actes de soins (31 AMI + 3 AIS + 3 BSI)"
  - date: "Oct-Déc 2024"
    title: "Phase 2 - Dashboard HAD (en cours)"
    description: "Développement complet interface Next.js 14 : authentification Firebase, métriques temps réel, gestion factures automatisée, interface shadcn/ui"
  - date: "Jan-Mars 2025"
    title: "Phase 3 - Infrastructure & Intégrations"
    description: "Configuration complète Firestore, security rules avancées, intégration Stripe, webhooks, système de notifications, scripts d'automatisation"
  - date: "Avril-Juin 2025"
    title: "Phase 4 - Application mobile FlutterFlow"
    description: "Développement app native iOS/Android : écran tournée optimisé, saisie rapide des actes, calcul Article 11B temps réel, signature électronique"
  - date: "Juil-Déc 2025"
    title: "Phase 5 - Cloud Functions & Automatisations"
    description: "Génération PDF automatique des bordereaux, agrégation mensuelle, système de facturation intelligent, workflows complets, IA assistante"
  - date: "Jan-Avril 2026"
    title: "Phase 6 - Production & Déploiement"
    description: "Tests E2E complets, certification HDS, déploiement production sur infrastructure sécurisée, onboarding progressif 50+ IDEL pilotes"

gallery:
  - "/images/projects/hadconnect/dashboard-overview.jpg"
  - "/images/projects/hadconnect/mobile-tournee.jpg"

links:
  demo: "https://hadconnect-demo.vercel.app"
  github: "https://github.com/julianbonne974/hadconnect"
---
