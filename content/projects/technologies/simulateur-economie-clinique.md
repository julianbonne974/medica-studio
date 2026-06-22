---
template: technology
title: "Simulateur d'économie clinique"
slug: "simulateur-economie-clinique"
description: "Moteur de simulation B2B qui modélise le compte de résultat d'une clinique selon que ses praticiens exercent en salariat ou en libéral, spécialité par spécialité. Conçu pour les directeurs d'établissement (groupes de cliniques privées)."
techType: Tool
order: 2
status: published
featured: false
image: "/images/projects/simulateur-economie-clinique/hero.svg"

metadata:
  year: "2026"
  client: "Linkemed — portails directeurs de cliniques (elsan.linkemed.fr)"
  role: "Architecte & Développeur"

stack:
  - TypeScript
  - Next.js 16
  - Firestore
  - Firebase Admin SDK
  - Zod
  - Recharts

technicalDescription: |
  <p>
    Le simulateur d'économie clinique répond à une question stratégique que se posent
    les directeurs de cliniques privées : <strong>pour une spécialité donnée, vaut-il
    mieux salarier un praticien ou l'accueillir en libéral, et avec quel impact sur le
    compte de résultat de l'établissement ?</strong>
  </p>
  <h3>Un modèle P&L complet, pas un simple delta</h3>
  <p>
    Contrairement aux calculs au doigt mouillé qui ne donnent qu'un écart, le moteur
    reconstruit le <strong>compte de résultat des deux scénarios côte à côte</strong>
    (salariat vs libéral) : produits liés à l'activité (GHS, honoraires), redevances,
    charges salariales ou de structure, jusqu'au résultat net par spécialité.
  </p>
  <h3>16 spécialités MCO préconfigurées</h3>
  <p>
    Chaque spécialité de médecine-chirurgie-obstétrique embarque ses presets de
    volumétrie et de coûts, ajustables par le directeur. Un paramètre clé,
    <strong>la part d'honoraires captée par l'établissement (k)</strong>, est posé par
    une question directe (0, 0,5 ou 1) plutôt que caché dans une formule, ce qui rend
    le résultat lisible et défendable.
  </p>
  <h3>Souveraineté des données</h3>
  <p>
    Les simulations sont persistées par directeur dans une sous-collection Firestore
    dédiée (accès strictement réservé), avec un historique consultable. Aucune donnée
    nominative de patient n'entre dans le modèle.
  </p>

characteristics:
  - icon: BarChart
    title: Compte de résultat des deux scénarios
    description: "Reconstruction P&L complète salariat vs libéral par spécialité, du produit d'activité au résultat net, plutôt qu'un simple écart."
  - icon: Layers
    title: 16 spécialités MCO préconfigurées
    description: "Presets de volumétrie et de coûts par spécialité, ajustables, avec modélisation explicite du GHS et de l'uplift d'activité libérale."
  - icon: Scale
    title: Paramètre k transparent
    description: "La part d'honoraires captée par l'établissement est posée par une question directe (0 / 0,5 / 1), pas enfouie dans une formule : un résultat auditable."
  - icon: Database
    title: Historique par directeur
    description: "Simulations sauvegardées dans une sous-collection Firestore réservée à chaque directeur, consultables a posteriori. Zéro donnée patient."

links: {}
---
