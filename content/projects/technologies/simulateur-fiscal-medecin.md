---
template: technology
title: "Simulateur fiscal médecin"
slug: "simulateur-fiscal-medecin"
description: "Calculateur qui compare l'exercice salarié et l'exercice libéral pour un médecin : cotisations URSSAF, retraite CARMF, impôt sur le revenu. Moteur de règles publicodes + modele-social, restitution PDF."
techType: Tool
order: 1
status: published
featured: true
image: "/images/projects/simulateur-fiscal-medecin/hero.svg"

metadata:
  year: "2026"
  client: "Linkemed — intégré à la landing linkemed.fr"
  role: "Architecte & Développeur"

stack:
  - publicodes
  - modele-social
  - Next.js 16
  - React 19
  - TypeScript 5
  - React Hook Form
  - Zod
  - React PDF
  - Tailwind CSS
  - shadcn/ui
  - Vitest

technicalDescription: |
  <p>
    Le simulateur fiscal de Linkemed répond à une question que se posent beaucoup
    de médecins remplaçants, collaborateurs et jeunes installés&nbsp;:
    <strong>vaut-il mieux être salarié ou libéral, et à quel niveau de revenu&nbsp;?</strong>
  </p>

  <h3>Un moteur de règles, pas un tableur</h3>
  <p>
    Le cœur du simulateur n'est pas une formule Excel mais un moteur de règles
    <strong>publicodes</strong>&nbsp;— le même langage qui alimente
    <em>mon-entreprise.urssaf.fr</em>. Le calcul s'appuie sur la base de règles
    <strong>modele-social</strong>, qui couvre&nbsp;:
  </p>
  <ul>
    <li>Cotisations URSSAF (médecin conventionné secteur 1 / 2 / 3)</li>
    <li>Retraite CARMF (régime de base, ASV, PCV)</li>
    <li>Impôt sur le revenu (barème progressif, parts fiscales, abattements)</li>
    <li>CSG/CRDS et autres contributions sociales</li>
  </ul>
  <p>
    Le moteur est <strong>auditable</strong>&nbsp;: chaque ligne du résultat est tracée
    jusqu'à la règle qui l'a produite, et les mises à jour réglementaires annuelles
    se propagent automatiquement via mise à jour du package.
  </p>

  <h3>Restitution PDF</h3>
  <p>
    Le résultat est rendu en HTML (comparatif côte-à-côte salariat vs libéral)
    et téléchargeable en <strong>PDF</strong> via <code>@react-pdf/renderer</code>,
    utilisable comme pièce justificative ou support d'entretien avec un expert-comptable.
  </p>

characteristics:
  - icon: Scale
    title: Comparatif salariat vs libéral
    description: "Calcul côte-à-côte du net en poche, des charges sociales, de l'impôt et de la retraite constituée pour un revenu donné."
  - icon: Shield
    title: Moteur auditable (publicodes)
    description: "Chaque euro du résultat est traçable jusqu'à la règle publicodes qui l'a produit — pas de magie cachée dans une formule Excel."
  - icon: FileText
    title: Export PDF
    description: "Restitution PDF via @react-pdf/renderer, utilisable comme support d'entretien avec un expert-comptable ou un conseil fiscal."
  - icon: RefreshCw
    title: Mises à jour réglementaires
    description: "Les changements de barèmes URSSAF, CARMF et IR se propagent automatiquement via la mise à jour du package modele-social."

links:
  docs: "https://linkemed.fr"
---
