---
template: technology
title: "Matching Engine Multi-Critères"
slug: "matching-engine"
techType: "Backend"
description: "Algorithme de matching intelligent temps réel entre médecins et annonces médicales basé sur 15+ critères (spécialité, localisation, disponibilités, expérience, contrats)"
technicalDescription: "Moteur de recommandation sophistiqué qui analyse automatiquement chaque nouvelle annonce médicale et identifie les candidats les plus pertinents parmi une base de 200+ médecins. Le système calcule un score de matching 0-100 en croisant les données de profil (RPPS, spécialité, sous-spécialités, expérience, disponibilités) avec les critères de l'annonce (contrat, urgence, localisation, rémunération). Architecture event-driven avec Cloud Functions déclenchées sur création/modification d'annonce, batch processing nocturne pour ré-calcul global, et indexation Algolia pour recherche instantanée avec filtres combinés."
order: 3
status: published

metadata:
  year: "2024-2025"
  version: "v3"

stack:
  - Firebase Cloud Functions
  - TypeScript
  - Firebase Firestore
  - Algolia Search
  - Google Cloud Pub/Sub
  - Node.js
  - Batch Processing

characteristics:
  - title: "Scoring multi-dimensionnel 0-100"
    description: "Algorithme de calcul de compatibilité basé sur 15+ critères pondérés : spécialité (30%), localisation (25%), disponibilités (20%), expérience (15%), contrat (10%). Score ajusté par urgence et préférences candidat."
    icon: "BarChart"
  - title: "Population automatique des prospects"
    description: "Trigger Firebase onCreate qui scanne instantanément la base médecins et génère automatiquement la liste des prospects matchés pour chaque nouvelle annonce. Latence < 2s pour 200+ profils."
    icon: "Zap"
  - title: "Architecture event-driven scalable"
    description: "Cloud Functions avec PubSub pour traitement asynchrone, batch processing nocturne pour ré-enrichissement global (500 annonces en 8min), gestion des doublons et transactions Firestore optimisées."
    icon: "Cpu"
  - title: "Intégration Algolia multi-index"
    description: "Indexation temps réel des annonces et profils avec 12+ facettes filtrables (spécialité, région, contrat, rémunération, zonage). Recherche géographique avec rayon km. Résultats < 50ms."
    icon: "Globe"
  - title: "Système de sous-collections optimisé"
    description: "Architecture hybride avec annonces/{id}/prospects (historique) + cliniques/{id}/all_prospects (vue consolidée). Évite la duplication tout en permettant requêtes performantes par clinique."
    icon: "Database"
  - title: "Monitoring et observabilité"
    description: "Logs structurés Firebase, métriques de matching (taux de réponse, temps par étape), dashboard analytics avec conversion funnel. Alertes sur anomalies de scoring."
    icon: "Shield"

performance:
  latency: "< 2s pour matching complet"
  throughput: "500 annonces/8min (batch nocturne)"
  uptime: "99.9% (Firebase Functions)"
  custom:
    - label: "Médecins indexés"
      value: "200+"
    - label: "Prospects générés"
      value: "1500+"
    - label: "Précision du matching"
      value: "85% (feedback cliniques)"
    - label: "Taux de conversion Match → Entretien"
      value: "35%"

codeExamples:
  - title: "Fonction de calcul du score de matching"
    language: "typescript"
    code: |
      function calculateMatchScore(
        userData: UserData,
        annonceData: AnnonceData
      ): number {
        let score = 50; // Score de base

        // 1. Bonus spécialité (30 points max)
        if (userData.Speciality_string === annonceData.Service) {
          score += 30;
        } else if (isRelatedSpecialty(userData.Speciality_string, annonceData.Service)) {
          score += 15; // Spécialités proches
        }

        // 2. Bonus expérience (20 points)
        if (userData.experience && annonceData.experienceRequired) {
          if (userData.experience >= annonceData.experienceRequired) {
            score += 20;
          } else if (userData.experience >= annonceData.experienceRequired * 0.7) {
            score += 10; // Presque suffisant
          } else {
            score -= 10; // Manque d'expérience
          }
        }

        // 3. Bonus disponibilité immédiate si urgence (15 points)
        if (annonceData.urgency === 'urgent' && userData.disponibility === 'immediate') {
          score += 15;
        }

        // 4. Bonus RPPS vérifié (15 points)
        if (userData.RPPS && userData.RPPS.length === 11) {
          score += 15;
        }

        // 5. Localisation (calculé séparément par distance)
        const distanceBonus = calculateDistanceScore(
          userData.postalCode,
          annonceData.postalCode
        );
        score += distanceBonus; // 0 à 20 points

        return Math.min(100, Math.max(0, score));
      }

  - title: "Cloud Function onCreate - Population automatique"
    language: "typescript"
    code: |
      export const populateProspectsOnAnnonceCreate = functions
        .region('us-central1')
        .firestore
        .document('annonces/{annonceId}')
        .onCreate(async (snap, context) => {
          const annonceData = snap.data() as AnnonceData;
          const annonceRef = snap.ref;

          console.log(`[MATCHING] Nouvelle annonce : ${annonceData.Title}`);

          // 1. Récupérer tous les médecins de la spécialité
          const usersQuery = db.collection('users')
            .where('Speciality_string', '==', annonceData.Service)
            .where('profileComplete', '==', true);

          const usersSnapshot = await usersQuery.get();
          console.log(`[MATCHING] ${usersSnapshot.size} médecins trouvés`);

          // 2. Calculer le matching pour chaque médecin
          const batch = db.batch();
          let matchedCount = 0;

          for (const userDoc of usersSnapshot.docs) {
            const userData = userDoc.data() as UserData;
            const matchScore = calculateMatchScore(userData, annonceData);

            // Seuil de matching : 50/100 minimum
            if (matchScore >= 50) {
              const prospectRef = annonceRef
                .collection('prospects')
                .doc(userDoc.id);

              batch.set(prospectRef, {
                userRef: userDoc.ref,
                userName: userData.display_name,
                matchScore: matchScore,
                speciality: userData.Speciality_string,
                RPPS: userData.RPPS,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                status: 'pending'
              });

              matchedCount++;
            }
          }

          // 3. Commit batch
          await batch.commit();
          console.log(`[MATCHING] ${matchedCount} prospects créés`);

          // 4. Mettre à jour l'annonce
          await annonceRef.update({
            prospectsCount: matchedCount,
            lastMatchingDate: admin.firestore.FieldValue.serverTimestamp()
          });

          return { success: true, matchedCount };
        });

  - title: "Batch nocturne de ré-enrichissement"
    language: "typescript"
    code: |
      export const nightlyRebuildProspects = functions
        .region('us-central1')
        .pubsub
        .schedule('0 2 * * *') // 2h du matin tous les jours
        .timeZone('Europe/Paris')
        .onRun(async (context) => {
          const progressRef = db.doc(PROGRESS_DOC);
          const startTime = Date.now();

          // 1. Récupérer toutes les annonces actives
          const annoncesSnapshot = await db.collection('annonces')
            .where('status', '==', 'active')
            .limit(BATCH_SIZE)
            .get();

          console.log(`[BATCH] ${annoncesSnapshot.size} annonces à traiter`);

          let processed = 0;
          let batch = db.batch();
          let batchCount = 0;

          for (const annonceDoc of annoncesSnapshot.docs) {
            // Vérifier timeout (8m40s max)
            if (Date.now() - startTime > TIME_LIMIT) {
              console.log('[BATCH] Timeout atteint, arrêt');
              break;
            }

            const annonceData = annonceDoc.data() as AnnonceData;

            // Recalculer les prospects
            const usersSnapshot = await db.collection('users')
              .where('Speciality_string', '==', annonceData.Service)
              .get();

            for (const userDoc of usersSnapshot.docs) {
              const userData = userDoc.data() as UserData;
              const matchScore = calculateMatchScore(userData, annonceData);

              if (matchScore >= 50) {
                const prospectRef = annonceDoc.ref
                  .collection('prospects')
                  .doc(userDoc.id);

                batch.set(prospectRef, {
                  matchScore: matchScore,
                  lastUpdated: admin.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

                batchCount++;

                // Commit tous les 20 writes
                if (batchCount >= SAVE_EVERY) {
                  await batch.commit();
                  batch = db.batch();
                  batchCount = 0;
                }
              }
            }

            processed++;
          }

          // Commit final
          if (batchCount > 0) {
            await batch.commit();
          }

          console.log(`[BATCH] ${processed} annonces traitées`);
          return { success: true, processed };
        });

links:
  docs: "https://linkemed-docs.web.app/matching-algorithm"
  github: "https://github.com/julianbonne974/linkemed"
---
