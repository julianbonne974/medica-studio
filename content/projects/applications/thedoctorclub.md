---
template: application
title: "The Doctor's Club"
slug: "thedoctorclub"
description: "Application mobile et web de conciergerie premium exclusivement dédiée aux médecins, offrant des services personnalisés 24/7 basés sur l'expertise Clac.io (350k+ utilisateurs)"
longDescription: "The Doctor's Club révolutionne la conciergerie médicale en proposant une plateforme premium chatbot-first où les médecins accèdent à tous les services via une conversation naturelle avec Marie, leur concierge IA. L'application couvre 8 catégories de services : Voyage & Transport (vols, jets privés, lounges), Restauration (tables VIP, restaurants étoilés), Événements & Culture (concerts, opéras, congrès médicaux), Services à Domicile (ménage, babysitting, bricolage), Personal Shopping, Assistance Administrative, Services Médicaux Spécifiques (recherche remplaçants, publications, networking) et Bien-être & Récupération. Architecture Flutter multiplateforme (iOS, Android, Web) avec Firebase backend, système de plans par abonnement (Essential 299€, Premium 599€, Platinum 1299€), et intégration Stripe pour paiements."
mobileImage: "/images/projects/thedoctorclub/mobile-home.jpg"
order: 1
status: published

metadata:
  year: "2024-2026"
  team: "Solo developer"
  client: "Médecins & Professionnels de santé"
  duration: "En développement - Lancement prévu Janvier 2026"
  role: "Full-Stack Developer & UI/UX Designer"

technologies:
  - Flutter
  - FlutterFlow
  - Firebase Firestore
  - Firebase Auth
  - Firebase Cloud Functions
  - Firebase Storage
  - Stripe
  - Push Notifications
  - OCR (License verification)
  - Biometric Auth
  - iOS
  - Android
  - PWA

features:
  - title: "Interface Chatbot-First avec Marie"
    description: "Concierge IA conversationnelle pour toutes les demandes. Chat en temps réel avec reconnaissance automatique du type de service, suggestions contextuelles, upload de fichiers inline, quick replies et voice input. Élimine les formulaires complexes."
  - title: "8 catégories de services premium"
    description: "Voyage & Transport (vols, jets privés, lounges VIP), Restauration (tables étoilées, traiteurs), Événements (concerts, congrès médicaux), Services à Domicile, Personal Shopping luxe, Assistance Administrative, Services Médicaux Spécifiques, Bien-être & Récupération 24/7"
  - title: "Système d'abonnement multi-niveaux"
    description: "3 plans avec SLA garantis : Essential (299€/mois, 5 demandes, réponse 24h), Premium (599€/mois, 15 demandes, réponse 12h, support téléphone), Platinum (1299€/mois, illimité, réponse 1h, concierge dédié, jets privés)"
  - title: "Vérification médicale intégrée"
    description: "Upload de license médicale avec OCR, vérification sous 24-48h, badge 'Verified' sur profil. Champs spécialisés : spécialité médicale, hôpital/clinique, années de pratique, titre (Dr., Prof.), région d'exercice"
  - title: "Architecture Flutter multiplateforme"
    description: "App mobile native (iOS/Android) + Web PWA responsive. FlutterFlow pour prototypage rapide, design system 'Émeraude Médical' (vert forêt #065F46, émeraude #10B981), typography Poppins + Roboto, dark mode complet"
  - title: "Onboarding personnalisé 7 étapes"
    description: "Welcome → Info personnelles → Info médicales → Upload license → Vérification → Préférences services → Choix plan → Paiement Stripe. Biometric setup (Face ID/Touch ID), notifications configurables, email verification OTP"
  - title: "Gestion de profil avancée"
    description: "Informations personnelles et médicales complètes, upload photo de profil, credentials vérifiés, préférences par catégorie (airlines, cuisines, brands), quiet hours pour notifications, historique de login"
  - title: "Système de référencement"
    description: "Code de parrainage unique, partage via QR code/message/email/social media, tracking des referrals, récompenses earned, dashboard dédié avec statistiques et liste des médecins parrainés"

impact:
  users: "Phase développement - Lancement prévu Janvier 2026"
  reduction: "Simplification vie professionnelle des médecins"
  satisfaction: "Basé sur expertise Clac.io : 98% satisfaction clients"
  custom:
    - label: "Catégories de services"
      value: "8 catégories complètes"
    - label: "Disponibilité"
      value: "24/7/365"

timeline:
  - date: "Sept 2024"
    title: "Phase 1 - Conception & Design System ✅"
    description: "Définition UI/UX architecture complète (50+ screens), création design system 'Émeraude Médical', wireframes FlutterFlow, catalogue des 8 catégories de services, mapping avec expertise Clac.io"
  - date: "Oct 2024"
    title: "Phase 2 - MVP Core Features ✅"
    description: "Développement authentication flow (login, signup, biometric), onboarding 7 étapes avec vérification médicale, dashboard avec chatbot Marie, création des 8 catégories de services, intégration Firebase (Auth, Firestore, Functions, Storage)"
  - date: "Nov-Déc 2024"
    title: "Phase 3 - Chat & Requests 🚧"
    description: "Interface chat temps réel avec Marie, système de quick replies et suggestions contextuelles, upload de fichiers inline, historique des conversations, gestion des demandes (tracking, statuts, rating), notifications push"
  - date: "Jan-Fév 2025"
    title: "Phase 4 - Subscription & Payments"
    description: "Intégration Stripe complète, système d'abonnement 3 niveaux (Essential/Premium/Platinum), gestion cartes de paiement, billing history avec invoices PDF, upgrade/downgrade flows, trial period"
  - date: "Mars-Juin 2025"
    title: "Phase 5 - Enhancement & Polish"
    description: "Système de référencement avec QR codes, help center avec FAQ et vidéos, security settings avancés, notification preferences granulaires, animations et micro-interactions, error states et offline mode"
  - date: "Juil-Sept 2025"
    title: "Phase 6 - Beta Testing"
    description: "Tests utilisateurs avec 30 médecins pilotes, optimisation performances Flutter, corrections bugs, ajustements UX/UI basés sur feedback, préparation soumissions App Store et Play Store"
  - date: "Oct-Déc 2025"
    title: "Phase 7 - Déploiement & Préparation Launch"
    description: "Soumission et validation App Store (iOS) et Play Store (Android), lancement PWA web, formation équipe support Clac.io, création matériel marketing, onboarding premiers clients premium"
  - date: "Janvier 2026"
    title: "Phase 8 - Lancement Commercial 🚀"
    description: "Lancement officiel multiplateforme (iOS, Android, Web), campagne marketing ciblée médecins, partenariats avec ordres professionnels, suivi KPIs et feedback utilisateurs, itérations rapides post-launch"

gallery:
  - "/images/projects/thedoctorclub/mobile-home.jpg"

links:
  demo: "https://thedoctorclub.app"
  github: "https://github.com/julianbonne974/thedoctorclub"
---
