---
template: application
title: "The Doctor's Club"
slug: "thedoctorclub"
description: "Plateforme SaaS (web Next.js + app mobile Flutter) de conciergerie médicale premium : onboarding, profil vérifié, abonnement Stripe (Standard 20€ / Professional+MerciDocteur 79,90€), essai gratuit 7 jours, paiement natif iOS et Android."
longDescription: "The Doctor's Club combine un front web Next.js 16 (thedoctorsclub.fr) et une application mobile Flutter / FlutterFlow distribuée via TestFlight et Play Store. Le cœur du produit est un système d'abonnement multi-niveaux branché sur Stripe, avec intégration native de flutter_stripe côté mobile (Apple Pay, Google Pay, 3D Secure). Les webhooks Stripe alimentent Firestore en temps réel via des Firebase Cloud Functions Node.js, ce qui garantit la cohérence des droits d'accès et de l'historique de paiement. Le projet s'appuie sur l'API Clac.io pour les données légales et réglementaires médicales."
image: "/images/projects/thedoctorclub/hero.svg"
mobileImage: "/images/projects/thedoctorclub/mobile-home.jpg"
order: 2
status: published

metadata:
  year: "2025-2026"
  client: "The Doctor's Club"
  role: "Full-Stack Developer & Product Lead"
  duration: "En beta — lancement public prévu 2026"

technologies:
  - Next.js 16
  - React 19
  - TypeScript 5
  - Flutter
  - FlutterFlow
  - Dart
  - Firebase Auth
  - Firebase Firestore
  - Firebase Cloud Functions
  - Stripe
  - flutter_stripe
  - Apple Pay
  - Google Pay
  - Tailwind CSS
  - Vercel

features:
  - title: "Web Next.js + app mobile Flutter"
    description: "Web thedoctorsclub.fr en Next.js 16 pour la landing et le dashboard. App mobile Flutter / FlutterFlow déployée sur iOS (TestFlight) et Android, partageant la même base Firebase."
  - title: "Paiement mobile natif Stripe"
    description: "Custom actions Flutter autour de flutter_stripe 11.5 : Apple Pay, Google Pay, 3D Secure. Payment Sheet native intégrée dans l'onboarding mobile pour un parcours sans redirection."
  - title: "Abonnements multi-niveaux"
    description: "Standard 20€/mois et Professional+MerciDocteur 79,90€/mois, essai gratuit 7 jours, gestion upgrade/downgrade via Stripe Customer Portal."
  - title: "Synchronisation webhooks temps réel"
    description: "Firebase Cloud Functions qui consomment les webhooks Stripe (subscription.created, invoice.paid, customer.subscription.updated) et mettent à jour les collections Firestore users, subscription_events et payments."
  - title: "Intégration Clac.io"
    description: "API Clac.io branchée côté back pour enrichir les données légales et réglementaires liées aux médecins."

links:
  demo: "https://thedoctorsclub.fr"

gallery:
  - "/images/projects/thedoctorclub/mobile-home.jpg"
---
