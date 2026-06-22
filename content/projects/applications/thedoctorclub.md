---
template: application
title: "The Doctor's Club"
slug: "thedoctorclub"
description: "Plateforme SaaS de conciergerie premium pour médecins et professionnels de santé libéraux : app mobile Flutter (iOS / Android) + web Next.js, chat de conciergerie temps réel opéré via clac.io, abonnement Stripe multi-niveaux déductible fiscalement, paiement natif Apple Pay / Google Pay et essai gratuit 7 jours."
longDescription: "The Doctor's Club est une conciergerie premium pensée pour les médecins et paramédicaux libéraux français. Le produit combine une application mobile Flutter (migrée de FlutterFlow vers du Flutter pur en code natif, distribuée via TestFlight et Play Store) et un front web Next.js 16 (thedoctorsclub.fr). Le cœur du produit est une conciergerie réelle, opérée par le partenaire clac.io via une API REST et des webhooks signés HMAC : le membre formule ses demandes en langage naturel dans un chat temps réel (Firestore), avec pièces jointes (billets, factures, réservations) et notifications push. La monétisation repose sur un système d'abonnement multi-niveaux branché sur Stripe, avec intégration native de flutter_stripe côté mobile (Apple Pay, Google Pay, 3D Secure, essai 7 jours). Les webhooks Stripe et clac.io sont consommés par des Firebase Cloud Functions Node.js qui maintiennent Firestore cohérent en temps réel, et une fonction planifiée synchronise chaque nuit les offres et évasions publiques de clac.io. La base de fonctions intègre LangChain (Mistral / OpenAI / Anthropic) pour préparer le routage et la catégorisation intelligente des demandes."
image: "/images/projects/thedoctorclub/hero.png"
mobileImage: "/images/projects/thedoctorclub/mobile-home.jpg"
order: 2
status: published

metadata:
  year: "2025-2026"
  client: "The Doctor's Club"
  role: "Full-Stack Developer & Product Lead"
  duration: "En beta — TestFlight, lancement public prévu 2026"

technologies:
  - Flutter
  - Dart
  - flutter_stripe
  - Apple Pay
  - Google Pay
  - Firebase Auth
  - Firebase Firestore
  - Firebase Cloud Functions
  - Firebase Storage
  - Firebase Cloud Messaging
  - Firebase Crashlytics
  - Stripe
  - clac.io
  - LangChain
  - OpenAI
  - Sentry
  - Next.js 16
  - React 19
  - TypeScript 5
  - Tailwind CSS
  - Vercel

features:
  - title: "App mobile Flutter + web Next.js"
    description: "Application mobile en Flutter pur (3.32, Dart 3.8), migrée de FlutterFlow vers une base de code native versionnée git, déployée sur iOS (TestFlight) et Android. Web thedoctorsclub.fr en Next.js 16 pour la landing et le dashboard, partageant la même base Firebase."
  - title: "Conciergerie temps réel via clac.io"
    description: "Service de conciergerie réel opéré par clac.io et intégré par API REST + webhooks signés HMAC. Demandes en langage naturel, chat Firestore temps réel, pièces jointes (images inline, PDF), réponse concierge sous 2h, accusés de lecture."
  - title: "Paiement mobile natif Stripe"
    description: "Custom actions Flutter autour de flutter_stripe 11.5 : Apple Pay, Google Pay, 3D Secure. Payment Sheet native intégrée à l'onboarding, essai 7 jours via SetupIntent (aucun débit immédiat) puis abonnement."
  - title: "Abonnements multi-niveaux déductibles"
    description: "Plusieurs paliers d'abonnement mensuels, 100% déductibles fiscalement pour un professionnel de santé. Gestion upgrade / downgrade et résiliation via le Customer Portal Stripe."
  - title: "Synchronisation webhooks temps réel"
    description: "Firebase Cloud Functions qui consomment les webhooks Stripe (subscription.created, invoice.payment_succeeded, customer.subscription.updated) et clac.io, et mettent à jour les collections Firestore (users, conversations, documents). Fonction planifiée nocturne de synchronisation des offres publiques."
  - title: "Socle IA (LangChain)"
    description: "Cloud Functions outillées avec LangChain (Mistral, OpenAI, Anthropic) pour préparer la catégorisation et le routage intelligent des demandes de conciergerie entre les neuf catégories de services."

links:
  demo: "https://thedoctorsclub.fr"

gallery:
  - "/images/projects/thedoctorclub/mobile-home.jpg"
---
