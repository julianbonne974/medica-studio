---
template: technology
title: "Système de Zonage Médical Intelligent"
slug: "zonage-medical-engine"
techType: "Backend"
description: "Moteur d'analyse territoriale automatique qui enrichit les annonces médicales avec les aides financières (CAIM, CAISP, ZFRR) basées sur les zonages ARS français"
technicalDescription: "Système backend complexe qui croise automatiquement 34 630 communes françaises avec les zonages médicaux officiels (ZIP, ZAC, ZAR) et calcule en temps réel les aides territoriales disponibles pour chaque spécialité médicale. Le moteur analyse le code INSEE de chaque annonce, interroge une base de données de zonage enrichie, applique les règles d'éligibilité complexes (médecins généralistes vs spécialistes, exclusions par spécialité) et génère un score d'attractivité territoriale avec détail des aides pouvant atteindre 50 000€ pour l'installation."
order: 2
status: published

metadata:
  year: "2024-2025"
  version: "v5"

stack:
  - Firebase Cloud Functions
  - Node.js
  - Firebase Firestore
  - APIs gouvernementales (AtlasSanté, ZFRR)
  - Excel parsing (XLSX)
  - TypeScript
  - Algolia Search

characteristics:
  - title: "Enrichissement automatique temps réel"
    description: "Triggers Firebase sur création/modification d'annonces pour calcul instantané des aides territoriales selon localisation et spécialité. Latence < 500ms par enrichissement."
    icon: "Zap"
  - title: "Base de données territoriale complète"
    description: "34 630 communes françaises indexées avec codes INSEE, zonages ARS (ZIP/ZAC/ZAR/HZ), statuts ZFRR, et métadonnées régionales. Mise à jour annuelle avec données officielles 2024-2025."
    icon: "Database"
  - title: "Moteur de règles complexes"
    description: "Gestion de 6 types d'aides différentes (CAIM, ASI, ADEC, COSCOM, COTRAM, CSTM) avec conditions d'éligibilité spécifiques par spécialité médicale et exclusions (radiologues, anesthésistes, etc.)."
    icon: "Cpu"
  - title: "Calcul fiscal ZFRR"
    description: "Intégration du dispositif Zones Franches Rurales-Revitalisation (ZFRR) avec calcul automatique des exonérations fiscales (cotisations sociales, impôts) selon le niveau de classement."
    icon: "BarChart"
  - title: "Support des spécialistes médicaux"
    description: "Version v4+ : Élargissement au-delà des MG avec gestion fine des 28 spécialités médicales, conditions chirurgiens (>80% actes cliniques), et règles spécifiques ZIP/ZAC."
    icon: "Shield"
  - title: "Architecture scalable"
    description: "Conçu pour traiter 10 000+ annonces avec batch processing optimisé (< 0.01€ par enrichissement complet). Déploiement multi-région Firebase avec monitoring."
    icon: "Globe"

performance:
  latency: "< 500ms par enrichissement"
  throughput: "475 annonces enrichies"
  uptime: "99.9% (Firebase Functions)"
  custom:
    - label: "Communes indexées"
      value: "34 630"
    - label: "Taux de couverture"
      value: "100% territoire français"
    - label: "Annonces avec aides détectées"
      value: "265/475 (56%)"
    - label: "Aides calculées simultanément"
      value: "6 types (CAIM, ASI, ADEC, COSCOM, COTRAM, CSTM)"

codeExamples:
  - title: "Structure territorial_aids enrichie"
    language: "javascript"
    code: |
      {
        has_aids: true,
        total_aids_count: 4,
        business_score: 90,
        commune_info: {
          commune: "Chaumont-le-Bois",
          codeInsee: "21158",
          departement: "Côte-d'Or",
          region: "Bourgogne-Franche-Comté"
        },
        zonage_mg: {
          type: "ZIP",
          aides_eligibles: {
            CAIM: {
              eligible: true,
              montant: "50 000€",
              description: "Contrat d'aide à l'installation",
              conditions: "Installation en ZIP"
            },
            COSCOM: {
              eligible: true,
              montant: "5 000€/an",
              description: "Contrat coordination des soins",
              conditions: "ZIP + coordination"
            }
          }
        },
        zfrr: {
          eligible: true,
          niveau: "classement",
          avantages_fiscaux: {
            exoneration_cotisations: "60 mois",
            exoneration_impots: "100% puis dégressif"
          }
        },
        enrichment_metadata: {
          enriched_at: "2024-09-23T10:15:00Z",
          version: "v5-list",
          is_mg: false,
          is_excluded_specialist: false
        }
      }

  - title: "Cloud Function d'enrichissement automatique"
    language: "javascript"
    code: |
      const enrichAnnonceOnCreate = functions.firestore
        .document('annonces/{annonceId}')
        .onCreate(async (snap, context) => {
          const annonceData = snap.data();
          const codeInsee = annonceData.codeInsee;

          if (!codeInsee) {
            console.log('Pas de code INSEE, skip enrichissement');
            return null;
          }

          // Récupérer les données de zonage
          const communeDoc = await db
            .collection('communes_zonage')
            .doc(codeInsee)
            .get();

          if (!communeDoc.exists) {
            console.log(`Commune ${codeInsee} non trouvée`);
            return null;
          }

          const communeData = communeDoc.data();
          const zonageType = communeData.zonage_mg;
          const specialite = annonceData.specialite;

          // Calculer les aides éligibles
          const aidesEligibles = calculateEligibleAids(
            zonageType,
            specialite,
            annonceData
          );

          // Enrichir l'annonce
          return snap.ref.update({
            territorial_aids: {
              has_aids: aidesEligibles.length > 0,
              total_aids_count: aidesEligibles.length,
              zonage_mg: { type: zonageType, aides_eligibles: aidesEligibles },
              enrichment_metadata: {
                enriched_at: admin.firestore.FieldValue.serverTimestamp(),
                version: 'v5-list'
              }
            }
          });
        });

  - title: "Import Excel zonages nationaux"
    language: "javascript"
    code: |
      const XLSX = require('xlsx');
      const admin = require('firebase-admin');

      async function importZonageNational(filePath) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        const batch = admin.firestore().batch();
        let count = 0;

        for (const row of data) {
          const codeInsee = String(row['Code INSEE']).padStart(5, '0');
          const communeRef = admin.firestore()
            .collection('communes_zonage')
            .doc(codeInsee);

          batch.set(communeRef, {
            commune: row['Commune'],
            departement: row['Département'],
            region: row['Région'],
            zonage_mg: row['Zonage MG'] || 'HZ',
            population: parseInt(row['Population']) || 0,
            zfrr_eligible: row['ZFRR'] === 'OUI'
          }, { merge: true });

          count++;

          // Commit batch tous les 500 documents
          if (count % 500 === 0) {
            await batch.commit();
            console.log(`${count} communes importées...`);
          }
        }

        await batch.commit();
        console.log(`Import terminé : ${count} communes`);
      }

links:
  docs: "https://linkemed-docs.web.app/zonage-medical"
  github: "https://github.com/julianbonne974/linkemed"
---
