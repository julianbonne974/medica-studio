---
template: technology
title: "Pipeline CRM Recrutement Médical"
slug: "crm-pipeline-medical"
techType: "Backend"
description: "Système CRM complet pour cliniques avec tunnel de recrutement en 9 étapes (Match → Intégration), gestion candidats enrichie, analytics conversion et workflows automatisés"
technicalDescription: "Architecture CRM complexe dédiée au recrutement médical avec pipeline Kanban de 9 étapes trackées individuellement. Solution hybride combinant sous-collection prospects (annonces/{id}/prospects) pour matching automatique et collection candidates (cliniques/{id}/candidates) pour CRM actif. Chaque candidat possède un profil enrichi avec RPPS validé, documents (CV, diplômes, références), historique interactions détaillé (messages, appels, notes), scoring IA 0-100, tags personnalisés et métriques temporelles (first_contact_date, last_activity_date, next_follow_up_date). Système d'automatisation avec workflows conditionnels, templates emails, rappels automatiques et analytics conversion par étape."
order: 5
status: published

metadata:
  year: "2024-2025"
  version: "v2"

stack:
  - Firebase Firestore
  - Firebase Cloud Functions
  - TypeScript
  - Node.js
  - Firebase Storage
  - SendGrid API
  - Analytics & Metrics
  - Webhook System

characteristics:
  - title: "Pipeline Kanban 9 étapes structuré"
    description: "Tunnel de recrutement complet : Match → New Candidate → First Contact → Qualification → Interview RH → Interview Medical → Proposal → Finalization → Integration. Tracking progression et durée moyenne par étape."
    icon: "BarChart"
  - title: "Profils candidats enrichis RPPS"
    description: "Données complètes par candidat : RPPS validé, spécialités, sous-spécialités, expériences (établissements, dates, postes), formations (diplômes, thèses, publications), disponibilités, préférences contrat (CDI/CDD/remplacement), prétentions salariales."
    icon: "Database"
  - title: "Gestion documentaire intégrée"
    description: "Upload et stockage sécurisé Firebase Storage : CV, diplômes, références, attestations assurance, contrats signés, rapports installation. Preview documents dans interface, versioning automatique, téléchargement par lots."
    icon: "Shield"
  - title: "Historique interactions complet"
    description: "Timeline exhaustive : messages envoyés/reçus, appels téléphoniques (date, durée, résumé), notes internes recruteur, changements statut, documents partagés, rappels créés. Export CSV pour audit."
    icon: "Cpu"
  - title: "Scoring IA et priorités dynamiques"
    description: "Match score 0-100 recalculé automatiquement selon évolution profil + nouveau scoring CRM basé sur engagement (taux réponse, délai réponse, actions complétées). Priorités low/medium/high avec alertes visuelles."
    icon: "Zap"
  - title: "Analytics et métriques KPI"
    description: "Dashboard temps réel : taux conversion par étape, durée moyenne pipeline, top recruteurs, annonces performantes, motifs rejet, satisfaction candidats (NPS). Export rapports hebdomadaires/mensuels."
    icon: "Globe"

performance:
  latency: "< 200ms requêtes Firestore"
  throughput: "50 cliniques, 200+ candidats actifs"
  uptime: "99.9% (Firebase infrastructure)"
  custom:
    - label: "Pipeline complet moyen"
      value: "35 jours (Match → Intégré)"
    - label: "Taux conversion Match → Entretien"
      value: "35%"
    - label: "Taux conversion Offre → Accepté"
      value: "72%"
    - label: "Documents stockés"
      value: "500+ (CV, diplômes, contrats)"

codeExamples:
  - title: "Structure Firestore candidates collection"
    language: "typescript"
    code: |
      interface Candidate {
        // Identifiants
        id: string;
        user_id: DocumentReference;      // Référence vers users/{userId}
        annonce_id: DocumentReference;   // Référence vers annonces/{annonceId}
        clinic_id: DocumentReference;    // Référence vers cliniques/{clinicId}
        recruiter_id?: DocumentReference; // Recruteur assigné

        // Pipeline & Statut
        pipeline_stage: 'match' | 'new_candidate' | 'first_contact' |
                       'qualification' | 'interview_rh' | 'interview_medical' |
                       'proposal' | 'finalization' | 'integration';
        status: 'active' | 'paused' | 'rejected' | 'withdrawn';
        priority: 'low' | 'medium' | 'high';

        // Source & Scoring
        source_type: 'prospect_promotion' | 'direct_application' |
                     'referral' | 'headhunt';
        match_score: number; // 0-100 (score initial de matching)
        engagement_score?: number; // 0-100 (score CRM basé sur interactions)

        // Dates tracking
        created_at: Timestamp;
        updated_at: Timestamp;
        first_contact_date?: Timestamp;
        last_activity_date?: Timestamp;
        next_follow_up_date?: Timestamp;

        // Historique pipeline
        pipeline_stage_history: Array<{
          stage: string;
          entered_at: Timestamp;
          duration_days?: number;
          notes?: string;
        }>;

        // Interactions
        total_interactions: number;
        last_email_sent?: Timestamp;
        last_call_made?: Timestamp;
        messages_count: number;
        calls_count: number;

        // Données candidat
        recruiter_notes?: string;
        tags: string[]; // ['urgent', 'top-candidate', 'needs-follow-up']
        salary_expectation?: number;
        availability_date?: Timestamp;
        contract_preference: 'CDI' | 'CDD' | 'remplacement';

        // Documents
        documents: Array<{
          name: string;
          type: 'cv' | 'diploma' | 'reference' | 'contract' | 'other';
          url: string; // Firebase Storage URL
          uploaded_at: Timestamp;
        }>;
      }

  - title: "Cloud Function - Promotion Prospect vers CRM"
    language: "typescript"
    code: |
      export const promoteProspectToCandidate = functions
        .region('us-central1')
        .https
        .onCall(async (data, context) => {
          // Authentification recruteur
          if (!context.auth) {
            throw new functions.https.HttpsError(
              'unauthenticated',
              'Authentification requise'
            );
          }

          const { prospectId, annonceId, clinicId } = data;

          // 1. Récupérer données prospect
          const prospectRef = db
            .collection('annonces')
            .doc(annonceId)
            .collection('prospects')
            .doc(prospectId);

          const prospectSnap = await prospectRef.get();
          if (!prospectSnap.exists) {
            throw new functions.https.HttpsError(
              'not-found',
              'Prospect introuvable'
            );
          }

          const prospectData = prospectSnap.data();

          // 2. Vérifier si candidat n'existe pas déjà
          const existingCandidate = await db
            .collection('cliniques')
            .doc(clinicId)
            .collection('candidates')
            .where('user_id', '==', prospectData.userRef)
            .where('annonce_id', '==', db.doc(`annonces/${annonceId}`))
            .limit(1)
            .get();

          if (!existingCandidate.empty) {
            throw new functions.https.HttpsError(
              'already-exists',
              'Candidat déjà dans le CRM'
            );
          }

          // 3. Créer candidat dans CRM
          const candidateRef = db
            .collection('cliniques')
            .doc(clinicId)
            .collection('candidates')
            .doc();

          const now = admin.firestore.FieldValue.serverTimestamp();

          await candidateRef.set({
            id: candidateRef.id,
            user_id: prospectData.userRef,
            annonce_id: db.doc(`annonces/${annonceId}`),
            clinic_id: db.doc(`cliniques/${clinicId}`),
            recruiter_id: db.doc(`users/${context.auth.uid}`),

            pipeline_stage: 'new_candidate',
            status: 'active',
            priority: 'medium',
            source_type: 'prospect_promotion',
            match_score: prospectData.matchScore || 0,

            created_at: now,
            updated_at: now,
            first_contact_date: null,
            last_activity_date: now,
            next_follow_up_date: null,

            pipeline_stage_history: [{
              stage: 'match',
              entered_at: prospectData.createdAt,
              duration_days: calculateDaysDiff(prospectData.createdAt, Date.now())
            }, {
              stage: 'new_candidate',
              entered_at: now
            }],

            total_interactions: 0,
            messages_count: 0,
            calls_count: 0,
            recruiter_notes: '',
            tags: ['new'],
            documents: []
          });

          // 4. Logger l'action
          await db.collection('audit_log').add({
            type: 'prospect_promoted',
            clinic_id: clinicId,
            candidate_id: candidateRef.id,
            recruiter_id: context.auth.uid,
            timestamp: now
          });

          return {
            success: true,
            candidate_id: candidateRef.id
          };
        });

  - title: "Workflow automatique - Rappels & Emails"
    language: "typescript"
    code: |
      export const checkFollowUpReminders = functions
        .region('us-central1')
        .pubsub
        .schedule('0 9 * * *') // Tous les jours à 9h
        .timeZone('Europe/Paris')
        .onRun(async (context) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // 1. Récupérer candidats avec rappel aujourd'hui
          const candidatesSnapshot = await db.collectionGroup('candidates')
            .where('status', '==', 'active')
            .where('next_follow_up_date', '<=', today)
            .get();

          console.log(`[REMINDERS] ${candidatesSnapshot.size} rappels à envoyer`);

          const batch = db.batch();

          for (const candidateDoc of candidatesSnapshot.docs) {
            const candidateData = candidateDoc.data();
            const recruiterRef = candidateData.recruiter_id;

            // 2. Créer notification pour le recruteur
            const notificationRef = db
              .collection('notifications')
              .doc();

            batch.set(notificationRef, {
              type: 'follow_up_reminder',
              recipient_id: recruiterRef,
              candidate_id: candidateDoc.ref,
              candidate_name: candidateData.user_name,
              pipeline_stage: candidateData.pipeline_stage,
              created_at: admin.firestore.FieldValue.serverTimestamp(),
              read: false,
              message: `Rappel : Relancer ${candidateData.user_name} (étape ${candidateData.pipeline_stage})`
            });

            // 3. Envoyer email si configuration activée
            if (candidateData.email_reminders_enabled) {
              await sendFollowUpEmail(
                recruiterRef.id,
                candidateData.user_name,
                candidateData.pipeline_stage
              );
            }

            // 4. Incrémenter compteur total_interactions
            batch.update(candidateDoc.ref, {
              total_interactions: admin.firestore.FieldValue.increment(1),
              last_activity_date: admin.firestore.FieldValue.serverTimestamp()
            });
          }

          await batch.commit();
          return { success: true, reminders_sent: candidatesSnapshot.size };
        });

links:
  docs: "https://linkemed-docs.web.app/crm-pipeline"
  github: "https://github.com/julianbonne974/linkemed"
---
