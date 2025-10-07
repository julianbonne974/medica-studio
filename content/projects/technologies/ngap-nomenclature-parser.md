---
template: technology
title: "Parser NGAP - Nomenclature Paramédicale Automatisé"
slug: "ngap-nomenclature-parser"
techType: "Backend"
description: "Système d'extraction automatique et de structuration de la nomenclature NGAP (Nomenclature Générale des Actes Professionnels) depuis PDF officiel vers base de données exploitable"
technicalDescription: "Parser Node.js robuste qui extrait automatiquement les actes paramédicaux (infirmiers, kinésithérapeutes, podologues, orthophonistes, orthoptistes, pédicures-podologues, diététiciens, psychomotriciens, ergothérapeutes) depuis le PDF NGAP officiel et génère une base de données structurée avec coefficients, tarifs, majorations, indemnités et règles de cumul. Utilise pdf-parse pour extraction de texte, regex avancées pour parsing des tableaux NGAP complexes (gestion césures, multi-lignes, références croisées), catégorisation automatique par heuristiques, calcul des tarifs (coefficient × valeur de base), et upload batch vers Firebase Firestore. Le système gère 37+ actes AMI/AIS/BSI, détecte les majorations (MAU, MCI, MIE, MN, MD, MF), indemnités (IFD, IFI, IK), et règles métier (Article 11B cumuls). Architecture extensible à toutes les professions paramédicales avec adaptation des regex par spécialité."
order: 7
status: published

metadata:
  year: "2024-2025"
  version: "v1.0"

stack:
  - Node.js
  - pdf-parse
  - Firebase Firestore
  - Firebase Admin SDK
  - Regular Expressions (Regex)
  - Chalk (CLI)
  - Yargs (CLI args)
  - fs-extra
  - dotenv

characteristics:
  - title: "Extraction PDF automatisée"
    description: "Parser robuste avec pdf-parse qui extrait le texte du PDF NGAP officiel (version 01/07/2025), gère les en-têtes/pieds de page, supprime les césures en fin de ligne, normalise les espaces, et découpe par Titre XVI (Soins infirmiers)."
    icon: "Zap"
  - title: "Parsing structuré multi-niveaux"
    description: "Extraction par chapitres (I, II, III), articles (1er, 2, 3, etc.), détection des actes avec regex avancées : codes (AMI 1.5, AIS 3.1), coefficients (1, 1.5, 2.5, 3.05), lettres-clés (AMI, AMX, AIS, SFI), descriptions multi-lignes."
    icon: "Database"
  - title: "Catégorisation automatique intelligente"
    description: "Heuristiques par mots-clés pour 6 catégories : prélèvements (ponction, prise de sang), injections (vaccination, IV, IM), pansements (plaie, stomie), surveillance (perfusion, dialyse), appareil digestif/urinaire, suivis pathologies chroniques."
    icon: "Cpu"
  - title: "Calcul tarifaire précis"
    description: "Application des coefficients sur valeur de base AMI (3.15€), support décimaux (1,5 / 3,9), détection majorations (MIE, MAU, MCI, MN, MD, MF), indemnités kilométriques (IFD, IFI, IK), règles de cumul Article 11B."
    icon: "BarChart"
  - title: "Upload Firestore optimisé"
    description: "Script d'upload batch avec Firebase Admin SDK, chunking configurable (450 ops/batch), gestion limite 500 opérations Firestore, logs détaillés, support variables d'environnement (service account, collection, DB URL)."
    icon: "Globe"
  - title: "Extensibilité paramédicale complète"
    description: "Architecture adaptable à 9 professions paramédicales : infirmiers, kinésithérapeutes, podologues, orthophonistes, orthoptistes, pédicures-podologues, diététiciens, psychomotriciens, ergothérapeutes. Champs HAD-compatible détectés automatiquement."
    icon: "Shield"

performance:
  latency: "< 10s parsing complet"
  throughput: "37 actes extraits (NGAP infirmiers)"
  uptime: "100% (script local)"
  custom:
    - label: "Actes AMI extraits"
      value: "31"
    - label: "Actes AIS extraits"
      value: "3"
    - label: "Forfaits BSI"
      value: "3 (BSA, BSB, BSC)"
    - label: "Professions paramédicales supportées"
      value: "9 spécialités"

codeExamples:
  - title: "Parser principal - Extraction des actes NGAP"
    language: "javascript"
    code: |
      const fs = require("fs");
      const pdfParse = require("pdf-parse");
      require("dotenv").config();

      const AMI_VALUE = parseFloat(process.env.AMI_VALUE || "3.15");
      const PDF_PATH = process.env.PDF_PATH || "./NGAP 01.07.2025.pdf";

      // Nettoyage du texte PDF
      function dehyphenate(input) {
        // Supprime les césures en fin de ligne: "décom-\nposé" -> "décomposé"
        return input.replace(/-\n/g, "");
      }

      function normalizeSpaces(input) {
        return input.replace(/[ \t]+/g, " ");
      }

      function stripHeadersFooters(input) {
        const lines = input.split("\n");
        const kept = [];
        for (const raw of lines) {
          const line = raw.trim();

          // Headers/footers typiques
          if (/^Version en vigueur du \d{2}\/\d{2}\/\d{4}/i.test(line)) continue;
          if (/^(Première|Deuxième|Troisième|Quatrième|Cinquième) partie/i.test(line)) continue;
          if (/^\d+$/.test(line)) continue; // numéros de page isolés

          kept.push(raw);
        }
        return kept.join("\n");
      }

      function sliceTitreXVI(input) {
        const startIdx = input.indexOf("TITRE XVI. - SOINS INFIRMIERS");
        if (startIdx === -1) return "";
        let endIdx = input.indexOf("Annexes", startIdx);
        if (endIdx === -1) endIdx = input.length;
        return input.slice(startIdx, endIdx);
      }

      // Parsing des actes
      async function parseNGAP() {
        const dataBuffer = fs.readFileSync(PDF_PATH);
        const pdfData = await pdfParse(dataBuffer);

        // Nettoyage du texte
        let text = pdfData.text;
        text = dehyphenate(text);
        text = normalizeSpaces(text);
        text = stripHeadersFooters(text);

        // Extraction Titre XVI
        const titreXVI = sliceTitreXVI(text);

        // Extraction des actes
        const actes = [];
        const acteRegex = /(?:AMI|AIS|AMX|SFI)\s+([\d,\.]+)/g;

        let match;
        while ((match = acteRegex.exec(titreXVI)) !== null) {
          const coefficient = parseFloat(match[1].replace(",", "."));
          const tarifBase = (coefficient * AMI_VALUE).toFixed(2);

          actes.push({
            code: match[0],
            coefficient: coefficient,
            tarifBase: parseFloat(tarifBase),
            lettres: [match[0].split(" ")[0]],
            category: detectCategory(match.input)
          });
        }

        return {
          metadata: {
            source: PDF_PATH,
            parsedAt: new Date().toISOString(),
            version: "NGAP_2025_07_01",
            totalActes: actes.length
          },
          actes: actes
        };
      }

  - title: "Catégorisation automatique par heuristiques"
    language: "javascript"
    code: |
      function detectCategory(description) {
        const d = (description || "").toLowerCase();

        // Prélèvements
        if (/(prélèvement|ponction|prise de sang)/.test(d)) {
          return "prelevements";
        }

        // Injections
        if (/(injection|vaccination|intraveineuse|intramusculaire|intradermique|sous-?cutanée)/.test(d)) {
          return "injections";
        }

        // Pansements
        if (/(pansement|plaie|stomie|détersion|cicatri)/.test(d)) {
          return "pansements";
        }

        // Surveillance
        if (/(perfusion|dialyse|cycleur|RAAC|surveillance|postop)/.test(d)) {
          return "surveillance";
        }

        // Appareil digestif/urinaire
        if (/(digestif|urinaire|stomie|irrigation)/.test(d)) {
          return "appareil_digestif_urinaire";
        }

        // Pathologies chroniques
        if (/(diabétique|insulino|BPCO|cardiaque)/.test(d)) {
          return "suivis_patho_chroniques";
        }

        // Forfaits BSI
        if (/(BSA|BSB|BSC)/.test(d)) {
          return "forfaits_bsi";
        }

        return "autres";
      }

      function isHADCompatible(description) {
        const d = (description || "").toLowerCase();
        return /(had|hospitalisation à domicile|taux plein)/.test(d);
      }

  - title: "Upload batch vers Firebase Firestore"
    language: "javascript"
    code: |
      const admin = require("firebase-admin");
      const fs = require("fs");
      require("dotenv").config();

      // Initialisation Firebase
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
        fs.readFileSync("./serviceAccountKey.json", "utf8")
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
      });

      const db = admin.firestore();
      const COLLECTION = process.env.FIRESTORE_COLLECTION || "actes_nomenclature";
      const CHUNK_SIZE = parseInt(process.env.CHUNK_SIZE || "450");

      async function uploadToFirestore(jsonPath) {
        const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        const actes = data.actes || [];

        console.log(`Upload de ${actes.length} actes vers Firestore...`);

        // Chunking pour respecter limite 500 ops
        for (let i = 0; i < actes.length; i += CHUNK_SIZE) {
          const chunk = actes.slice(i, i + CHUNK_SIZE);
          const batch = db.batch();

          for (const acte of chunk) {
            const docRef = db.collection(COLLECTION).doc(acte.code);
            batch.set(docRef, {
              ...acte,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
          }

          await batch.commit();
          console.log(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1} uploadé (${chunk.length} actes)`);
        }

        // Upload metadata
        await db.collection(COLLECTION).doc("_metadata").set({
          ...data.metadata,
          lastSync: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log(`✅ Upload terminé : ${actes.length} actes`);
      }

      // Export du JSON pour intégration
      async function exportForIntegration() {
        const snapshot = await db.collection(COLLECTION).get();
        const actes = [];

        snapshot.forEach(doc => {
          if (doc.id !== "_metadata") {
            actes.push({ id: doc.id, ...doc.data() });
          }
        });

        return {
          actes: actes,
          total: actes.length,
          categories: [...new Set(actes.map(a => a.category))]
        };
      }

links:
  docs: "https://hadconnect-docs.web.app/ngap-parser"
  github: "https://github.com/julianbonne974/hadconnect"
---
