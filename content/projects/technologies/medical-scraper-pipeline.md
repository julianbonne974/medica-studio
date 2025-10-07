---
template: technology
title: "Scraper d'Annonces Médicales Multi-Sources"
slug: "medical-scraper-pipeline"
techType: "Backend"
description: "Système d'extraction automatique d'annonces médicales depuis APIs partenaires avec normalisation des données, détection de doublons et indexation Algolia"
technicalDescription: "Pipeline ETL (Extract-Transform-Load) automatisé qui interroge quotidiennement les APIs partenaires pour récupérer 100+ annonces médicales, normalise les données (adresses, géolocalisation, photos, contrats), détecte et supprime les doublons via système de références uniques, crée/met à jour automatiquement les fiches cliniques partenaires dans Firestore, et synchronise l'indexation Algolia pour recherche instantanée. Architecture Cloud Functions avec scheduler PubSub (exécution toutes les 24h), gestion des timeouts, retry logic sur erreurs API, et logging structuré pour monitoring. Traite également la géolocalisation avec parsing d'adresses complexes (ville, code postal, longitude/latitude) et génération automatique de codes INSEE."
order: 6
status: published

metadata:
  year: "2024-2025"
  version: "v2"

stack:
  - Firebase Cloud Functions
  - Node.js
  - Axios (HTTP client)
  - Google Cloud Pub/Sub
  - Firebase Firestore
  - Algolia Search API
  - UUID generation
  - Cron scheduling

characteristics:
  - title: "Scraping automatique quotidien"
    description: "Cloud Function déclenchée quotidiennement (PubSub scheduler) pour interroger les APIs partenaires et récupérer les annonces médicales. Architecture extensible multi-sources."
    icon: "Zap"
  - title: "Normalisation et enrichissement"
    description: "Parsing avancé : extraction adresse structurée, conversion géolocalisation, téléchargement images, mapping contrats (CDI/CDD/vacation), détection spécialités médicales."
    icon: "Database"
  - title: "Gestion intelligente des doublons"
    description: "Système de références uniques (UUID si manquant) pour identifier annonces existantes, comparaison champ par champ, update incrémental, suppression automatique obsolètes."
    icon: "Shield"
  - title: "Synchronisation cliniques partenaires"
    description: "Création/mise à jour automatique des fiches cliniques (FINESS, nom, adresse, logo, contact) lors de nouvelles annonces. Gestion DocumentReference Firestore."
    icon: "Globe"
  - title: "Indexation Algolia temps réel"
    description: "Synchronisation automatique avec Algolia après chaque batch : nouvelles annonces, mises à jour, suppressions. Configuration facettes pour filtrage avancé."
    icon: "Cpu"
  - title: "Monitoring et error handling"
    description: "Logging structuré avec counts (créées, modifiées, supprimées), alertes sur échecs API, retry automatique sur timeouts, rapports quotidiens avec statistiques."
    icon: "BarChart"

performance:
  latency: "< 5 min pour 100+ annonces"
  throughput: "120 annonces/jour scrapées"
  uptime: "99.5% (dépend API externe)"
  custom:
    - label: "Sources API actives"
      value: "2 sources partenaires"
    - label: "Annonces totales indexées"
      value: "475"
    - label: "Taux de succès scraping"
      value: "98%"
    - label: "Cliniques partenaires"
      value: "50+"

codeExamples:
  - title: "Cloud Function scheduler - Scraping quotidien"
    language: "javascript"
    code: |
      const functions = require("firebase-functions");
      const admin = require("firebase-admin");
      const axios = require("axios");
      const { v4: uuidv4 } = require("uuid");

      admin.initializeApp();
      const db = admin.firestore();

      exports.fetchJobAds2 = functions
        .pubsub
        .schedule("every 24 hours") // Cron quotidien
        .onRun(async (context) => {
          const apiUrl = process.env.PARTNER_API_URL;

          try {
            // 1. Requête API externe
            const response = await axios.get(apiUrl, {
              timeout: 30000 // 30s timeout
            });
            const jobAds = response.data.ads;
            const count = response.data.count;

            console.log(`[SCRAPER] Fetched ${jobAds.length} ads from API`);

            // 2. Récupérer annonces et cliniques existantes
            const existingAdsSnapshot = await db.collection("annonces").get();
            const existingClinicsSnapshot = await db.collection("cliniques").get();

            const existingAdsMap = new Map();
            const existingClinicsMap = new Map();

            existingAdsSnapshot.forEach((doc) => {
              existingAdsMap.set(doc.id, doc.data());
            });
            existingClinicsSnapshot.forEach((doc) => {
              existingClinicsMap.set(doc.id, doc.data());
            });

            const batch = db.batch();
            const currentAdReferences = new Set();
            const currentClinicNames = new Set();

            let adsCreated = 0;
            let adsUpdated = 0;
            let clinicsCreated = 0;

            // 3. Traiter chaque annonce
            for (const ad of jobAds) {
              // Générer référence unique si manquante
              let reference = ad.reference || uuidv4();
              const existingAd = existingAdsMap.get(reference);
              currentAdReferences.add(reference);

              // Normaliser les données
              const normalizedAd = normalizeJobAd(ad);

              // Créer ou mettre à jour
              if (!existingAd) {
                batch.set(db.collection("annonces").doc(reference), normalizedAd);
                adsCreated++;
              } else if (hasChanges(existingAd, normalizedAd)) {
                batch.update(db.collection("annonces").doc(reference), normalizedAd);
                adsUpdated++;
              }

              // Gérer la clinique associée
              const clinicName = ad.clinic_name;
              if (clinicName && !existingClinicsMap.has(clinicName)) {
                const clinicData = extractClinicData(ad);
                batch.set(db.collection("cliniques").doc(clinicName), clinicData);
                clinicsCreated++;
              }
            }

            // 4. Supprimer annonces obsolètes
            const adsDeleted = [];
            for (const [ref, data] of existingAdsMap) {
              if (!currentAdReferences.has(ref)) {
                await deleteAnnonceWithProspects(db.collection("annonces").doc(ref));
                adsDeleted.push(ref);
              }
            }

            // 5. Commit batch
            await batch.commit();

            // 6. Synchroniser Algolia
            await syncAlgoliaIndex(jobAds);

            console.log(`[SCRAPER] Summary:
              - Created: ${adsCreated}
              - Updated: ${adsUpdated}
              - Deleted: ${adsDeleted.length}
              - Clinics created: ${clinicsCreated}
            `);

            return {
              success: true,
              stats: { adsCreated, adsUpdated, adsDeleted: adsDeleted.length }
            };

          } catch (error) {
            console.error("[SCRAPER] Error:", error);
            // Envoyer alerte email
            await sendErrorAlert(error);
            throw error;
          }
        });

  - title: "Normalisation des données d'annonces"
    language: "javascript"
    code: |
      function normalizeJobAd(rawAd) {
        // Parsing adresse
        const addressParts = rawAd.address?.parts || {};
        const longitude = parseFloat(rawAd.address?.position?.lon || NaN);
        const latitude = parseFloat(rawAd.address?.position?.lat || NaN);

        // Extraction spécialité médicale
        const specialty = extractMedicalSpecialty(rawAd.title, rawAd.description);

        // Mapping type de contrat
        const contractType = mapContractType(rawAd.contract_type);

        // Génération code INSEE depuis CP
        const codeInsee = generateCodeInsee(addressParts.postalCode);

        return {
          // Identifiants
          reference: rawAd.reference,
          Title: rawAd.title,
          Description: rawAd.description,

          // Localisation
          city: addressParts.city || "",
          postalCode: addressParts.postalCode || "",
          region: addressParts.region || "",
          department: addressParts.department || "",
          codeInsee: codeInsee,
          longitude: longitude,
          latitude: latitude,

          // Détails poste
          Service: specialty,
          contractType: contractType,
          urgency: rawAd.urgency || "normal",
          experienceRequired: rawAd.experience_years || 0,
          salary: rawAd.salary || "",

          // Images & médias
          picture: rawAd.pictures?.[0]?.default || "",
          gallery: rawAd.pictures?.map(p => p.default) || [],

          // Clinique
          clinicName: rawAd.clinic_name,
          clinicRef: db.doc(`cliniques/${rawAd.clinic_name}`),

          // Métadonnées
          status: "active",
          source: "digitalrecruiters",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          externalUrl: rawAd.url,

          // Initialisation pour enrichissement
          territorial_aids: null, // Sera enrichi par zonageMédecins
          prospectsCount: 0
        };
      }

      function extractMedicalSpecialty(title, description) {
        const specialties = [
          'Médecin généraliste', 'Cardiologue', 'Pédiatre',
          'Dermatologue', 'Radiologue', 'Anesthésiste',
          'Chirurgien', 'Gynécologue', 'Ophtalmologue'
        ];

        const text = `${title} ${description}`.toLowerCase();

        for (const specialty of specialties) {
          if (text.includes(specialty.toLowerCase())) {
            return specialty;
          }
        }

        return 'Médecin généraliste'; // Défaut
      }

  - title: "Détection de changements et suppression"
    language: "javascript"
    code: |
      function hasChanges(existingAd, newAd) {
        // Champs critiques à comparer
        const criticalFields = [
          'Title', 'Description', 'city', 'postalCode',
          'contractType', 'salary', 'urgency', 'status'
        ];

        for (const field of criticalFields) {
          if (existingAd[field] !== newAd[field]) {
            console.log(`[CHANGE] ${field}: "${existingAd[field]}" → "${newAd[field]}"`);
            return true;
          }
        }

        return false;
      }

      async function deleteAnnonceWithProspects(adDocRef) {
        try {
          // 1. Supprimer la sous-collection prospects
          const prospectsSnapshot = await adDocRef
            .collection('prospects')
            .get();

          if (!prospectsSnapshot.empty) {
            const batch = db.batch();
            prospectsSnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            await batch.commit();
            console.log(
              `[DELETE] Sous-collection 'prospects' supprimée ` +
              `pour annonce ${adDocRef.id} (${prospectsSnapshot.size} docs)`
            );
          }

          // 2. Supprimer l'annonce elle-même
          await adDocRef.delete();
          console.log(`[DELETE] Annonce supprimée : ${adDocRef.id}`);

          // 3. Supprimer de Algolia
          await algoliaIndex.deleteObject(adDocRef.id);

          return { success: true };

        } catch (error) {
          console.error(`[DELETE] Error deleting annonce ${adDocRef.id}:`, error);
          throw error;
        }
      }

links:
  docs: "https://linkemed-docs.web.app/scraper-pipeline"
  github: "https://github.com/julianbonne974/linkemed"
---
