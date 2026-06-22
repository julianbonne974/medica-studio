---
template: technology
title: "Passerelle IA souveraine"
slug: "passerelle-ia-souveraine"
description: "Couche d'assistance IA pour CRM médical en environnement HDS : une passerelle unique vers Mistral (cloud souverain ou auto-hébergé) avec kill-switch, journalisation, plafond de coût, OCR hybride et suggestions toujours validées par un humain."
techType: AI/ML
order: 3
status: published
featured: false
image: "/images/projects/passerelle-ia-souveraine/hero.svg"

metadata:
  year: "2026"
  client: "Projet client confidentiel — CRM médical HDS (EVASAN)"
  role: "Architecte & Développeur"

stack:
  - TypeScript
  - Vercel AI SDK
  - Mistral AI
  - PostgreSQL 17
  - Prisma
  - Next.js 16
  - tRPC v11

technicalDescription: |
  <p>
    Intégrer de l'IA dans un CRM qui manipule des données de santé impose deux exigences
    non négociables : <strong>la souveraineté des données</strong> et
    <strong>le contrôle humain</strong>. Cette passerelle a été conçue pour les deux.
  </p>
  <h3>Un point d'entrée unique, contrôlable</h3>
  <p>
    Tous les appels IA transitent par une passerelle centrale. Elle vérifie un
    <strong>kill-switch global</strong> (l'IA peut être coupée proprement à tout
    moment), résout le fournisseur et le modèle depuis la configuration (interchangeable
    entre <em>Mistral La Plateforme</em> et un <em>Mistral auto-hébergé HDS</em> sans
    toucher au code appelant), journalise chaque appel (type, modèle, tokens, coût,
    corrélation) et applique un <strong>plafond de coût mensuel</strong>.
  </p>
  <h3>OCR hybride pour réduire les coûts</h3>
  <p>
    Le traitement documentaire commence par une extraction de texte native sur les PDF.
    Seuls les documents scannés (peu de texte exploitable) basculent vers l'OCR Mistral,
    nettement plus coûteux. Le texte est ensuite analysé (type de document, présence de
    données de santé, extraction structurée).
  </p>
  <h3>L'humain garde la main</h3>
  <p>
    L'IA ne déclenche jamais d'action seule : elle produit des <strong>suggestions</strong>
    (rattacher un email à un dossier, classer une pièce, créer une tâche, remplir un
    champ, rédiger un brouillon) qui passent par un statut <em>à vérifier → validé →
    appliqué</em>. L'application est <strong>idempotente</strong> et entièrement tracée
    dans le journal d'audit.
  </p>

characteristics:
  - icon: Shield
    title: Souveraineté & HDS
    description: "Mistral en cloud souverain français ou auto-hébergé en environnement HDS, interchangeables par configuration. Aucune donnée de santé ne quitte l'écosystème souverain."
  - icon: Lock
    title: Kill-switch & plafond de coût
    description: "L'IA se coupe proprement à tout moment. Chaque appel est journalisé (modèle, tokens, coût, corrélation) avec un plafond de dépense mensuel."
  - icon: FileText
    title: OCR hybride PDF / scan
    description: "Extraction de texte native sur les PDF, bascule vers l'OCR Mistral uniquement pour les scans : précision préservée, coûts maîtrisés."
  - icon: GitBranch
    title: Suggestions validées par l'humain
    description: "L'IA propose, l'humain dispose : workflow à vérifier → validé → appliqué, application idempotente et tracée dans le journal d'audit."

codeExamples:
  - title: "File de jobs IA concurrent-safe (PostgreSQL)"
    language: "sql"
    code: |
      -- Réclamation atomique de jobs : deux workers concurrents
      -- ne traitent jamais le même job (FOR UPDATE SKIP LOCKED).
      UPDATE "ai_jobs"
      SET "status" = 'processing', "lockedAt" = now(), "lockedBy" = $1
      WHERE "id" IN (
        SELECT "id" FROM "ai_jobs"
        WHERE "status" = 'pending' AND "scheduledAt" <= now()
        ORDER BY "scheduledAt" ASC
        LIMIT $2
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *;
  - title: "Passerelle : résolution de modèle interchangeable"
    language: "typescript"
    code: |
      // Le code appelant demande un "tier" logique ; la passerelle
      // résout le provider/modèle concret depuis la configuration.
      export async function generate(input: GenerateInput) {
        if (!(await isAiEnabled())) throw new AiDisabledError();
        const { provider, model } = resolveModel(input.tier); // mistral_api | mistral_selfhost
        const res = await callModel(provider, model, input.prompt);
        await logAiCall({ type: input.type, provider, model, ...usage(res) });
        return res;
      }

links: {}
---
