---
template: application
title: "LINKEMED"
slug: "linkemed"
description: "Plateforme de mise en relation intelligente entre médecins remplaçants/collaborateurs et structures de santé (cliniques, hôpitaux, centres médicaux) avec système de matching automatique"
longDescription: "LINKEMED révolutionne le recrutement médical en France en connectant médecins et établissements de santé via une plateforme double-face : une app mobile Flutter pour les médecins cherchant des remplacements ou installations libérales, et un dashboard web pour les cliniques gérant leurs recrutements. Le système utilise Algolia pour des recherches ultra-rapides et un algorithme de matching intelligent basé sur 15+ critères (localisation, spécialités, disponibilités, contrats). Pipeline CRM complet avec 9 étapes de recrutement (Match → Candidat → En discussion → Pré-sélectionné → Entretien → Offre → Accepté → Onboarding → Intégré)."
image: "/images/projects/linkemed/desktop-dashboard.jpg"
mobileImage: "/images/projects/linkemed/mobile-home.jpg"
order: 2
status: published

metadata:
  year: "2024-2025"
  team: "Solo developer"
  client: "Médecins & Établissements de santé"
  duration: "En développement - Phase 6 Tests & Déploiement"
  role: "Full-Stack Developer & Product Designer"

technologies:
  - Flutter
  - Firebase Firestore
  - Firebase Auth
  - Firebase Cloud Functions
  - Algolia Search
  - FlutterFlow
  - TypeScript
  - Node.js
  - Google Maps API
  - Push Notifications
  - iOS
  - Android
  - PWA
  - Hébergement de Santé

features:
  - title: "Matching intelligent multi-critères"
    description: "Algorithme de scoring basé sur 15+ paramètres : localisation (rayon km), spécialités médicales, disponibilités calendaires, types de contrats (CDD/CDI/vacation), rémunération, avantages, logement fourni"
  - title: "Application mobile médecins Flutter"
    description: "Interface avec recherche géolocalisée, swipe cards pour annonces, section 'Mes Matchs', messagerie intégrée, profil complet (CV, diplômes, expériences), notifications push pour nouvelles offres"
  - title: "Dashboard web cliniques"
    description: "Gestion complète des annonces, visualisation des candidats, pipeline CRM à 9 étapes, système de notes et commentaires internes, documents partagés, rapports d'installation"
  - title: "Recherche Algolia ultra-rapide"
    description: "Indexation en temps réel de 1000+ annonces avec facettes (région, spécialité, type contrat), typo-tolerance, recherche géographique avec rayon, résultats < 50ms"
  - title: "Pipeline de recrutement structuré"
    description: "9 étapes trackées : Match initial → Candidat → En discussion → Pré-sélectionné → Entretien planifié → Offre envoyée → Accepté → Onboarding → Intégré avec métriques de conversion"
  - title: "Système de notifications intelligent"
    description: "Push notifications contextuelles (nouveaux matchs, messages, changements statut candidature), emails transactionnels via Cloud Functions, rappels automatiques"
  - title: "Profils enrichis avec documents"
    description: "Upload et stockage sécurisé de CV, diplômes, thèses, attestations d'assurance, contrats, rapports d'installation dans Firebase Storage avec preview"
  - title: "Messagerie temps réel"
    description: "Chat intégré entre médecins et cliniques avec indicateurs de lecture, historique complet, partage de documents, notifications instantanées"

impact:
  users: "Phase beta - Tests utilisateurs en cours"
  reduction: "Optimisation du recrutement médical"
  satisfaction: "Programme pilote avec 5 cliniques"
  custom:
    - label: "Annonces indexées"
      value: "475"
    - label: "Matchs générés automatiquement"
      value: "1500+"

timeline:
  - date: "Juil 2024"
    title: "Phase 1 - Conception & Architecture ✅"
    description: "Définition du modèle de données Firebase (15 collections), conception algorithme de matching, wireframes mobile + web, choix stack technique"
  - date: "Août 2024"
    title: "Phase 2 - Setup & Infrastructure ✅"
    description: "Configuration Firebase projet (Auth, Firestore, Functions, Storage), intégration Algolia, setup FlutterFlow, création collections Firestore avec security rules"
  - date: "Sept 2024"
    title: "Phase 3 - App mobile médecins ✅"
    description: "Développement écrans principaux (onboarding, recherche, profil, matchs), intégration Maps pour géolocalisation, système de swipe pour annonces, messagerie"
  - date: "Oct 2024"
    title: "Phase 4 - Dashboard web cliniques ✅"
    description: "Interface d'administration pour créer/gérer annonces, visualisation candidats avec filtres, pipeline CRM drag & drop, upload documents, statistiques recrutement"
  - date: "Nov 2024"
    title: "Phase 5 - Matching & Notifications ✅"
    description: "Cloud Functions pour calcul scores de matching en temps réel, système de notifications push multiplateforme (iOS/Android/Web), emails transactionnels"
  - date: "Déc 2025"
    title: "Phase 6 - Tests & Déploiement 🚧"
    description: "Tests utilisateurs avec 20 médecins et 5 cliniques pilotes, optimisation performances Algolia, déploiement App Store & Play Store, lancement beta"

gallery:
  - "/images/projects/linkemed/desktop-dashboard.jpg"
  - "/images/projects/linkemed/mobile-home.jpg"

links:
  demo: "https://linkemed-demo.web.app"
  github: "https://github.com/julianbonne974/linkemed"
---
