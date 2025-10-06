---
template: technology
title: MCPmed
slug: mcpmed
description: Hub d'interopérabilité FHIR basé sur les Model Context Protocol pour connecter les applications de santé et faciliter l'échange de données médicales standardisées
category: Infrastructure médicale
status: published
featured: true
order: 1
techType: Infrastructure d'interopérabilité
stack:
  - TypeScript
  - Node.js
  - MCP SDK
  - FHIR R4
  - Firebase Functions
  - PostgreSQL
  - Redis
  - Docker
  - WebSocket
  - REST API
  - GraphQL
  - OAuth 2.0
  - HL7
  - JSON-LD

metadata:
  client: Medica Studio
  sector: Infrastructure santé
  duration: 8 mois
  year: 2025-2026
  phase: En développement
  team: 3 développeurs

links:
  github: "#"
  docs: "#"
  api: "#"

technicalDescription: |
  <p>
    <strong>MCPmed</strong> est une infrastructure révolutionnaire qui exploite les Model Context Protocol (MCP) d'Anthropic
    pour créer un hub d'interopérabilité entre les différentes applications de santé. Cette solution résout le défi majeur
    de la fragmentation des données médicales en établissant une couche d'abstraction intelligente basée sur le standard FHIR R4.
  </p>

  <h3>Architecture technique</h3>
  <p>
    Le système utilise une architecture microservices orchestrée autour de plusieurs composants clés :
  </p>
  <ul>
    <li><strong>Core MCP Engine</strong> : Moteur principal gérant les connexions MCP et le routage des requêtes</li>
    <li><strong>FHIR Translator</strong> : Module de conversion bidirectionnelle entre formats propriétaires et FHIR R4</li>
    <li><strong>Security Gateway</strong> : Couche de sécurité avec authentification OAuth 2.0 et chiffrement bout-en-bout</li>
    <li><strong>Cache Layer</strong> : Système de mise en cache Redis pour optimiser les performances</li>
    <li><strong>Event Bus</strong> : Architecture événementielle pour la synchronisation temps réel</li>
  </ul>

  <h3>Capacités d'intégration</h3>
  <p>
    MCPmed peut se connecter à une grande variété de systèmes de santé :
  </p>
  <ul>
    <li>Dossiers Patients Informatisés (DPI/EMR)</li>
    <li>Systèmes d'Information Hospitaliers (SIH)</li>
    <li>Applications de télémédecine</li>
    <li>Plateformes IoT médicales</li>
    <li>Bases de données de recherche clinique</li>
  </ul>

  <h3>Innovation MCP</h3>
  <p>
    L'utilisation des Model Context Protocol permet une approche unique où les LLMs peuvent directement interroger
    et manipuler les données FHIR de manière contextualisée, offrant des capacités d'analyse et d'assistance
    décisionnelle avancées tout en maintenant la sécurité et la conformité réglementaire.
  </p>

characteristics:
  - icon: Shield
    title: Sécurité maximale
    description: Chiffrement AES-256, authentification multi-facteurs, audit trail complet et conformité RGPD/HIPAA
  - icon: Zap
    title: Performance temps réel
    description: Traitement asynchrone, mise en cache intelligente et optimisation des requêtes FHIR pour une latence minimale
  - icon: Database
    title: Standardisation FHIR
    description: Support complet de FHIR R4 avec extensions personnalisées pour le contexte médical français
  - icon: Globe
    title: Interopérabilité universelle
    description: Connecteurs pré-configurés pour 15+ systèmes de santé majeurs avec SDK d'extension
  - icon: Cpu
    title: Intelligence artificielle
    description: Intégration native des LLMs via MCP pour l'analyse contextuelle et l'aide à la décision
  - icon: Lock
    title: Conformité réglementaire
    description: Respect des normes HDS, certification dispositif médical classe IIa en préparation

performance:
  latency: < 100ms
  throughput: 10K req/s
  uptime: 99.99%
  custom:
    - label: Ressources FHIR supportées
      value: 140+
    - label: Connecteurs actifs
      value: 15
    - label: Volume de données
      value: 1TB+/jour

architecture: custom

codeExamples:
  - title: Connexion MCP
    language: TypeScript
    code: |
      import { MCPClient, FHIRResource } from '@mcpmed/core';

      // Initialisation du client MCP
      const client = new MCPClient({
        endpoint: 'wss://hub.mcpmed.fr',
        apiKey: process.env.MCPMED_API_KEY,
        options: {
          retryPolicy: 'exponential',
          maxRetries: 3,
          timeout: 30000
        }
      });

      // Configuration des capacités FHIR
      await client.initialize({
        capabilities: ['Patient', 'Observation', 'Medication'],
        profile: 'FR-Core',
        version: 'R4'
      });

      // Établissement de la connexion sécurisée
      const session = await client.connect({
        organization: 'CHU-Bordeaux',
        department: 'Cardiologie',
        role: 'Practitioner'
      });

  - title: Requête FHIR
    language: TypeScript
    code: |
      // Recherche de patients avec critères complexes
      const searchParams = {
        resourceType: 'Patient',
        params: {
          'name': 'Durand',
          'birthdate': 'ge1980-01-01',
          'address-city': 'Bordeaux',
          '_include': ['Patient:general-practitioner'],
          '_sort': '-_lastUpdated'
        }
      };

      const bundle = await client.search(searchParams);

      // Traitement des résultats avec typage fort
      bundle.entry?.forEach((entry) => {
        const patient = entry.resource as fhir4.Patient;
        console.log(`Patient: ${patient.name?.[0]?.family}`);

        // Accès aux observations liées
        const observations = await client.getRelated(
          patient.id!,
          'Observation',
          { code: 'http://loinc.org|85354-9' }
        );
      });

  - title: Transformation de données
    language: TypeScript
    code: |
      import { FHIRTransformer } from '@mcpmed/transformer';

      // Configuration du transformer avec mappings personnalisés
      const transformer = new FHIRTransformer({
        source: 'proprietary-emr-v2',
        target: 'fhir-r4',
        mappings: {
          'patient.numero_secu': 'Patient.identifier[type=NSS]',
          'patient.nom_naissance': 'Patient.name[use=official].family',
          'patient.prenom': 'Patient.name[use=official].given[0]',
          'patient.date_naissance': 'Patient.birthDate'
        }
      });

      // Transformation avec validation
      const fhirPatient = await transformer.transform(proprietaryData, {
        validate: true,
        profile: 'http://hl7.fr/fhir/StructureDefinition/fr-patient',
        extensions: ['fr-nationality', 'fr-insee-code']
      });

      // Enrichissement avec données contextuelles
      const enriched = await transformer.enrich(fhirPatient, {
        terminology: 'SNOMED-CT',
        geocoding: true,
        inferRelationships: true
      });

  - title: Synchronisation temps réel
    language: TypeScript
    code: |
      // Configuration des subscriptions FHIR
      const subscription = await client.subscribe({
        criteria: 'Observation?code=http://loinc.org|8867-4',
        channel: {
          type: 'websocket',
          endpoint: 'wss://notifications.mcpmed.fr'
        },
        reason: 'Monitoring tension artérielle temps réel'
      });

      // Gestionnaire d'événements
      subscription.on('data', async (notification) => {
        const observation = notification.resource as fhir4.Observation;

        // Analyse via MCP avec contexte patient
        const analysis = await client.analyze({
          resource: observation,
          context: await client.getContext(observation.subject),
          llmOptions: {
            model: 'claude-3-opus',
            temperature: 0.1,
            systemPrompt: 'Analyse clinique des constantes vitales'
          }
        });

        // Alerte si anomalie détectée
        if (analysis.flags.includes('critical')) {
          await notifyPractitioner(analysis);
        }
      });

  - title: Intégration LLM via MCP
    language: TypeScript
    code: |
      import { MCPAssistant } from '@mcpmed/ai';

      // Création d'un assistant médical contextualisé
      const assistant = new MCPAssistant({
        model: 'claude-3-opus',
        context: {
          specialty: 'cardiology',
          guidelines: ['ESC-2023', 'HAS-2024'],
          language: 'fr'
        }
      });

      // Requête d'analyse avec contexte FHIR complet
      const clinicalContext = {
        patient: await client.read('Patient', patientId),
        observations: await client.search({
          resourceType: 'Observation',
          params: { patient: patientId, _count: 100 }
        }),
        medications: await client.search({
          resourceType: 'MedicationStatement',
          params: { patient: patientId, status: 'active' }
        })
      };

      // Génération de recommandations
      const recommendations = await assistant.generateRecommendations({
        context: clinicalContext,
        question: "Ajustement thérapeutique pour HTA résistante",
        evidenceLevel: 'grade-a',
        includeReferences: true
      });

      // Création d'un CarePlan FHIR
      const carePlan = await assistant.toFHIRCarePlan(recommendations);
      await client.create(carePlan);

timeline:
  - date: Août 2025
    milestone: Lancement du projet
    description: Définition de l'architecture et sélection des technologies
  - date: Septembre 2025
    milestone: Core MCP Engine
    description: Développement du moteur principal et de l'API de base
  - date: Octobre 2025
    milestone: FHIR Translator
    description: Implémentation du module de traduction FHIR R4
  - date: Novembre 2025
    milestone: Premiers connecteurs
    description: Intégration avec 5 systèmes pilotes
  - date: Décembre 2025
    milestone: Security Gateway
    description: Mise en place de la couche de sécurité complète
  - date: Janvier 2026
    milestone: Tests d'intégration
    description: Validation avec établissements partenaires
  - date: Février 2026
    milestone: Optimisation performance
    description: Cache layer et optimisations pour passage à l'échelle
  - date: Mars 2026
    milestone: Déploiement production
    description: Lancement officiel et onboarding des premiers clients
---

# MCPmed : Hub d'interopérabilité FHIR nouvelle génération

MCPmed représente une avancée majeure dans l'interopérabilité des données de santé, en exploitant la puissance des Model Context Protocol pour créer un hub intelligent capable de connecter n'importe quelle application médicale tout en respectant les standards FHIR R4 et les contraintes réglementaires les plus strictes.