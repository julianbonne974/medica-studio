/* Règles et scores d'EXEMPLE de la maquette Preopia (V1-09, D-01, D-03, D-04).
   Chaque valeur clinique vient d'une source publiée LUE le 23/10/2026 (URL et date dans `source`).
   Ce qui n'a pas pu être lu à la source vaut null, avec la mention « à renseigner par l'équipe ».
   Valeurs d'exemple pour maquette, à valider par écrit par l'équipe d'anesthésie avant tout usage clinique.
   Chargé par <script src>, sans module ni fetch : window.PREOPIA_REGLES (et module.exports pour Node). */
(function () {
  "use strict";

  var DATE = "2026-10-23";
  var A_RENSEIGNER = "à renseigner par l'équipe";
  var A_CLASSER = "à classer par l'équipe";

  function src(o) { o.consulteLe = DATE; return o; }

  /* ---------------------------------------------------------------------------------------
     Registre des sources lues. Les règles y renvoient par référence (même objet).
     --------------------------------------------------------------------------------------- */
  var S = {
    rfe2026: src({
      id: "rfe2026",
      titre: "Recommandations formalisées d'experts : Gestion des anticoagulants pour une procédure invasive programmée",
      societes: "GIHP (coordination), avec la SFAR (validation par le CA le 18/03/2026), SFC, SFMV, SFNV, SFTH, SFNDT, réseau INNOVTE, AMHOQ, SFPT et les sociétés de chirurgie et d'interventionnels",
      annee: 2026,
      version: "Version du 20 avril 2026",
      url: "https://sfar.org/wp-content/uploads/2026/04/RFE-20.4.2026-deifinitif-et-validei.pdf",
      urlAlternative: "https://www.gihp.org/s/RFE-2042026-envoye-SFAR.pdf",
      lu: "PDF intégral téléchargé, texte extrait (pdftotext) ; tableaux de synthèse p. 62 à 64 et tableau 6 p. 53 relus en image"
    }),
    aap2018: src({
      id: "aap2018",
      titre: "Gestion des agents antiplaquettaires pour une procédure invasive programmée. Propositions du Groupe d'intérêt en hémostase périopératoire (GIHP) et du Groupe français d'études sur l'hémostase et la thrombose (GFHT) en collaboration avec la Société française d'anesthésie-réanimation (SFAR)",
      societes: "GIHP, GFHT, SFAR",
      auteurs: "Godier A, Fontana P, Motte S, Steib A, Bonhomme F, Schlumberger S, et al.",
      annee: 2018,
      version: "RFE 2018 (Anesth Reanim 2018, doi 10.1016/j.anrea.2018.01.002)",
      url: "https://www.gihp.org/s/2018_Antiplaquettaires-Programme.pdf",
      urlAlternative: "https://sfar.org/gestion-agents-antiplaquettaires-procedure-invasive-programmee/",
      lu: "PDF intégral, propositions relues",
      avertissement: "Texte de 2018 : aucune RFE française plus récente sur les antiplaquettaires programmés n'a été trouvée sur sfar.org ni gihp.org le 23/10/2026. À actualiser par l'équipe si une version plus récente existe."
    }),
    glp1Multisociete: src({
      id: "glp1Multisociete",
      titre: "Multisociety Clinical Practice Guidance for the Safe Use of Glucagon-like Peptide-1 Receptor Agonists in the Perioperative Period",
      societes: "AGA, ASMBS, ASA, ISPCOP, SAGES",
      auteurs: "Kindel TL, Wang AY, Wadhwa A, Schulman AR, Sharaiha RZ, Kroh M, Ghanem OM, Levy S, Joshi GP, LaMasters TL",
      annee: 2024,
      version: "2024 (en ligne 10/2024 ; Clin Gastroenterol Hepatol 2025;23:2083-2085, doi 10.1016/j.cgh.2024.10.003)",
      url: "https://www.sochob.cl/web1/wp-content/uploads/2024/10/Multisociety-Clinical-Practice-Guidance-for-the-Safe-Use-of-Glucagon-like-Peptide-1-Receptor-Agonists-in-the-Perioperative-Period.pdf",
      urlAlternative: "https://pubmed.ncbi.nlm.nih.gov/39480373/",
      lu: "PDF intégral (8 pages)",
      avertissement: "Guidance américaine multi-sociétés présentée par ses auteurs comme « guidance » et non comme guideline fondée sur des preuves. Aucune RFE française publiée n'a été trouvée."
    }),
    glp1Sfd2026: src({
      id: "glp1Sfd2026",
      titre: "SFD 2026 – Agonistes du GLP-1 en périopératoire : faut-il vraiment interrompre le traitement ?",
      societes: "Compte rendu de presse (Univadis) d'une communication de la Dre C. Ichai au congrès de la Société francophone du diabète, Lyon, 31/03 au 03/04/2026",
      annee: 2026,
      version: "17/04/2026",
      url: "https://www.univadis.fr/viewarticle/sfd-2026-agonistes-du-glp-1-p%C3%A9riop%C3%A9ratoire-faut-il-2026a1000b3n",
      lu: "page intégrale",
      avertissement: "Source secondaire (article de presse), pas une recommandation publiée. Citée pour l'orientation française récente, jamais comme règle."
    }),
    jeuneAffiche: src({
      id: "jeuneAffiche",
      titre: "Jeûne pré-opératoire (fiche d'information du patient)",
      societes: "SFAR",
      annee: 2019,
      version: "page sfar.org datée du 11/07/2019 ; fichier jeune-pre-operatoire.pdf déposé en 2017",
      url: "https://sfar.org/wp-content/uploads/2017/03/jeune-pre-operatoire.pdf",
      urlAlternative: "https://sfar.org/pour-le-grand-public/jeune-pre-operatoire/",
      lu: "affiche relue en image : manger jusqu'à 6 h, boire des liquides clairs jusqu'à 2 h avant une chirurgie programmée"
    }),
    jeuneNutrition: src({
      id: "jeuneNutrition",
      titre: "Nutrition périopératoire : actualisation des recommandations (R23)",
      societes: "SFAR (Conférence d'actualisation 2013, reprenant les recommandations SFAR-SFNEP de nutrition périopératoire)",
      auteurs: "Chambrier C, Sztark F",
      annee: 2013,
      version: "Conférence d'actualisation SFAR 2013",
      url: "https://sfar.org/wp-content/uploads/2014/04/2013_med_conf-actu_02_Sztark.pdf",
      lu: "PDF intégral ; R23 et R24 relues",
      avertissement: "Texte de 2013 ; date de la recommandation d'origine non vérifiée ici."
    }),
    mtev2024: src({
      id: "mtev2024",
      titre: "Prévention de la maladie thromboembolique veineuse péri-opératoire. Actualisation des recommandations formalisées d'experts de la SFAR de 2011",
      societes: "GIHP, avec la SFAR (validation 30/04/2024), la SFTH, la SFMV ; endossée par la SFCD, la SFPT et le réseau INNOVTE",
      annee: 2024,
      version: "Version du 16/05/2024 (Anaesth Crit Care Pain Med, en ligne 22/10/2024, doi 10.1016/j.accpm.2024.101446)",
      url: "https://sfar.org/wp-content/uploads/2024/05/240516-Txt-definitif-.pdf",
      lu: "PDF intégral extrait ; passages sur les scores de risque (dont Caprini) relus"
    }),
    nvpo2008: src({
      id: "nvpo2008",
      titre: "Conférence d'experts – Texte court. Prise en charge des nausées et vomissements postopératoires (tableau 1 : scores simplifiés de prédiction)",
      societes: "SFAR",
      auteurs: "Diemunsch P",
      annee: 2008,
      version: "Ann Fr Anesth Reanim 2008;27:866-878",
      url: "https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Prise-en-charge-des-nausees-et-vomissements-postoperatoires.pdf",
      lu: "PDF ; tableau 1 relu en image"
    }),
    ccs2017: src({
      id: "ccs2017",
      titre: "Canadian Cardiovascular Society Guidelines on Perioperative Cardiac Risk Assessment and Management for Patients Who Undergo Noncardiac Surgery",
      societes: "Canadian Cardiovascular Society",
      auteurs: "Duceppe E, Parlow J, MacDonald P, et al.",
      annee: 2017,
      version: "Can J Cardiol 2017;33:17-32, doi 10.1016/j.cjca.2016.09.008",
      url: "https://anesthesiology.queensu.ca/sites/anesthesiology/files/inline-files/CCS%20Guidelines%20on%20Cardiac%20Risk%20in%20Noncardiac%20Surgery.pdf",
      urlAlternative: "https://pubmed.ncbi.nlm.nih.gov/27865641/",
      lu: "PDF intégral ; tableau 2 (risque selon le score RCRI) relu"
    }),
    sfarCoeur2024: src({
      id: "sfarCoeur2024",
      titre: "Évaluation préopératoire du risque cardiaque en chirurgie non cardiaque : Six règles raisonnables et pragmatiques en 2024 (tableau 1 : score de Lee clinique modifié à 5 items)",
      societes: "SFAR (article de Jean-Luc Fellahi et Rémi Schweizer, Hospices civils de Lyon)",
      annee: 2024,
      version: "Texte publié sur sfar.org, tableau 1 relu en image",
      url: "https://sfar.org/evaluation-preoperatoire-du-risque-cardiaque-en-chirurgie-non-cardiaque-six-regles-raisonnables-et-pragmatiques-en-2024/",
      lu: "page intégrale et image du tableau 1"
    }),
    mdcalcStopBang: src({
      id: "mdcalcStopBang",
      titre: "STOP-BANG Score for Obstructive Sleep Apnea (grille et points)",
      societes: "MDCalc (créatrice du score : Dre Frances Chung)",
      annee: 2026,
      version: "page lue le 23/10/2026",
      url: "https://www.mdcalc.com/calc/3992/stop-bang-score-obstructive-sleep-apnea",
      lu: "page intégrale"
    }),
    aasmStopBang: src({
      id: "aasmStopBang",
      titre: "The STOP Bang Questionnaire (questionnaire et interprétation)",
      societes: "AASM Sleep Education, reproduisant le questionnaire de Chung (propriété de Dr Frances Chung et de l'UHN)",
      annee: 2023,
      version: "fichier déposé en 01/2023",
      url: "https://sleepeducation.org/wp-content/uploads/2023/01/Stop-Bang-Questionnaire.pdf",
      lu: "PDF d'une page, intégral"
    }),
    chung2008: src({
      id: "chung2008",
      titre: "STOP questionnaire: a tool to screen patients for obstructive sleep apnea",
      auteurs: "Chung F, Yegneswaran B, Liao P, Chung SA, Vairavanathan S, Islam S, Khajehdehi A, Shapiro CM",
      annee: 2008,
      version: "Anesthesiology 2008;108:812-821, doi 10.1097/ALN.0b013e31816d83e4",
      url: "https://pubmed.ncbi.nlm.nih.gov/18431116/",
      lu: "référence vérifiée sur Europe PMC (métadonnées) ; texte non lu"
    }),
    chung2012: src({
      id: "chung2012",
      titre: "High STOP-Bang score indicates a high probability of obstructive sleep apnoea",
      auteurs: "Chung F, Subramanyam R, Liao P, Sasaki E, Shapiro C, Sun Y",
      annee: 2012,
      version: "Br J Anaesth 2012;108:768-775, doi 10.1093/bja/aes022",
      url: "https://pubmed.ncbi.nlm.nih.gov/22401881/",
      lu: "référence vérifiée (métadonnées) ; texte non lu"
    }),
    chung2016: src({
      id: "chung2016",
      titre: "STOP-Bang Questionnaire: A Practical Approach to Screen for Obstructive Sleep Apnea",
      auteurs: "Chung F, Abdullah HR, Liao P",
      annee: 2016,
      version: "Chest 2016;149:631-638, doi 10.1378/chest.15-0903",
      url: "https://pubmed.ncbi.nlm.nih.gov/26378880/",
      lu: "référence vérifiée (métadonnées) ; texte non lu (accès bloqué)"
    }),
    apfel1999: src({
      id: "apfel1999",
      titre: "A simplified risk score for predicting postoperative nausea and vomiting: conclusions from cross-validations between two centers",
      auteurs: "Apfel CC, Läärä E, Koivuranta M, Greim CA, Roewer N",
      annee: 1999,
      version: "Anesthesiology 1999;91:693-700, doi 10.1097/00000542-199909000-00022",
      url: "https://pubmed.ncbi.nlm.nih.gov/10485781/",
      lu: "référence vérifiée (métadonnées) ; texte non lu"
    }),
    mdcalcApfel: src({
      id: "mdcalcApfel",
      titre: "Apfel Score for Postoperative Nausea and Vomiting (grille et points)",
      societes: "MDCalc (créateur : Dr Christian C. Apfel)",
      annee: 2026,
      version: "page lue le 23/10/2026",
      url: "https://www.mdcalc.com/calc/10104/apfel-score-postoperative-nausea-vomiting",
      lu: "page intégrale"
    }),
    lee1999: src({
      id: "lee1999",
      titre: "Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery",
      auteurs: "Lee TH, Marcantonio ER, Mangione CM, Thomas EJ, Polanczyk CA, Cook EF, Sugarbaker DJ, Donaldson MC, Poss R, Ho KK, Ludwig LE, Pedan A, Goldman L",
      annee: 1999,
      version: "Circulation 1999;100:1043-1049, doi 10.1161/01.CIR.100.10.1043",
      url: "https://pubmed.ncbi.nlm.nih.gov/10477528/",
      lu: "référence vérifiée (métadonnées) ; texte intégral non lu (accès bloqué)"
    }),
    mdcalcRcri: src({
      id: "mdcalcRcri",
      titre: "Revised Cardiac Risk Index for Pre-Operative Risk (grille et points)",
      societes: "MDCalc",
      annee: 2026,
      version: "page lue le 23/10/2026",
      url: "https://www.mdcalc.com/calc/1739/revised-cardiac-risk-index-pre-operative-risk",
      lu: "page intégrale"
    }),
    caprini2005: src({
      id: "caprini2005",
      titre: "Thrombosis risk assessment as a guide to quality patient care",
      auteurs: "Caprini JA",
      annee: 2005,
      version: "Dis Mon 2005;51:70-78, doi 10.1016/j.disamonth.2005.02.003",
      url: "https://pubmed.ncbi.nlm.nih.gov/15900257/",
      lu: "référence vérifiée (métadonnées) ; texte non lu (accès payant)"
    }),
    mdcalcCaprini: src({
      id: "mdcalcCaprini",
      titre: "Caprini Score for Venous Thromboembolism (2005) (grille et points)",
      societes: "MDCalc",
      annee: 2026,
      version: "page lue le 23/10/2026",
      url: "https://www.mdcalc.com/calc/3970/caprini-score-venous-thromboembolism-2005",
      lu: "page lue ; les items réservés aux femmes n'apparaissent pas dans l'extraction"
    }),
    cardvascCaprini: src({
      id: "cardvascCaprini",
      titre: "Caprini Score for VTE Risk (2005)",
      societes: "The Cardiovascular (cardvasc.org)",
      annee: 2026,
      version: "page lue le 23/10/2026",
      url: "https://cardvasc.org/docs/tools/calculators/caprini-vte-2005",
      lu: "page intégrale"
    }),
    caprini2006fiche: src({
      id: "caprini2006fiche",
      titre: "Venous Thromboembolism Risk Factor Assessment (fiche de J. A. Caprini, révisée le 04/11/2006)",
      auteurs: "Caprini JA",
      annee: 2006,
      version: "Revised November 4, 2006",
      url: "https://andersonmedsupplies.com/pdfs/device-studies/icct/caprini-risk-assesemnt-tool.pdf",
      lu: "PDF de 2 pages, intégral (copie hébergée par un tiers)"
    }),
    myrisk2023: src({
      id: "myrisk2023",
      titre: "Perioperative Risk Assessment of Patients Using the MyRISK Digital Score Completed Before the Preanesthetic Consultation: Prospective Observational Study",
      auteurs: "Ferré F, Laurent R, Furelau P, Doumard E, Ferrier A, Bosch L, Ba C, Menut R, Kurrek M, Geeraerts T, Piau A, Minville V",
      annee: 2023,
      version: "JMIR Perioperative Medicine 2023;6:e39044, doi 10.2196/39044 (CC BY 4.0)",
      url: "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9887512/fullTextXML",
      urlAlternative: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9887512/",
      lu: "texte intégral (XML Europe PMC) ; tableau 1 et algorithme relus"
    }),
    nomsCommerciaux: src({
      id: "nomsCommerciaux",
      titre: "Correspondances nom commercial / substance",
      societes: "RFE 2026 (tableau 1 : Sintrom, Préviscan, Coumadine) ; VIDAL (Kardégic) ; Base de données publique des médicaments (Lovenox)",
      annee: 2026,
      version: "pages lues le 23/10/2026",
      url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/60782303/extrait",
      urlAlternative: "https://www.vidal.fr/medicaments/gammes/kardegic-5146.html",
      lu: "Sintrom/acénocoumarol (RFE), Lovenox/énoxaparine sodique (BDPM), Kardégic/acétylsalicylate de lysine (pages lues). ASPEGIC : correspondance non lue à la source."
    })
  };

  /* ---------------------------------------------------------------------------------------
     1. Jeûne (V1-09)
     --------------------------------------------------------------------------------------- */
  var jeune = {
    perimetre: "Patient adulte sans risque de régurgitation, chirurgie programmée.",
    solides: {
      libelle: "Repas léger",
      heuresAvantIntervention: 6,
      formulation: "Manger jusqu'à 6 h avant une chirurgie programmée",
      source: S.jeuneAffiche,
      sourceComplementaire: S.jeuneNutrition,
      version: "SFAR, fiche patient (page du 11/07/2019) ; R23 de la conférence d'actualisation 2013"
    },
    liquidesClairs: {
      libelle: "Liquides clairs (eau, jus de fruits sans pulpe, thé ou café sans lait selon la fiche SFAR)",
      heuresAvantIntervention: 2,
      fourchetteTexteSource: "2 à 3 heures (R23 : la durée du jeûne « ne doit pas excéder 2 à 3 heures pour les liquides clairs et 6 heures pour un repas léger »)",
      formulation: "Boire des liquides clairs jusqu'à 2 h avant une chirurgie programmée",
      source: S.jeuneAffiche,
      sourceComplementaire: S.jeuneNutrition,
      version: "SFAR, fiche patient (page du 11/07/2019) ; R23 de la conférence d'actualisation 2013"
    },
    notes: [
      "Les textes lus fixent des durées maximales de jeûne (« jusqu'à 6 h », « jusqu'à 2 h »). L'heure de convocation de la maquette sert de point de départ au calcul « dernier repas avant … h, dernière boisson claire avant … h » ; ce calcul est un choix de la maquette, pas une règle des sociétés savantes.",
      "R24 (conférence 2013) : boisson de glucose ou de maltodextrines possible jusqu'à 2 h avant la prémédication chez le patient sans risque de régurgitation ; R67 : pas recommandée chez le diabétique en l'absence de données suffisantes.",
      "Les patients sous analogues du GLP-1 relèvent d'une autre entrée (voir consignes.glp1)."
    ],
    enfant: { valeur: null, mention: A_RENSEIGNER + " (aucun délai pédiatrique lu à la source ; le patient fictif de 7 ans a besoin d'une règle d'équipe)" },
    risqueRegurgitation: { valeur: null, mention: A_RENSEIGNER + " (délais des patients à risque de régurgitation non lus à la source)" }
  };

  /* ---------------------------------------------------------------------------------------
     2. Risque hémorragique des actes de donnees.js
     Classement des sociétés savantes joint à la RFE 2026 (annexe « Classification du risque
     hémorragique des procédures invasives et spécificités », p. 79 à 115).
     --------------------------------------------------------------------------------------- */
  var classesHemorragiques = ["faible", "élevé", "très élevé"];

  var risqueHemorragique = {
    source: S.rfe2026,
    version: S.rfe2026.version,
    classes: classesHemorragiques,
    definitions: {
      "faible": "Procédures responsables de saignements peu fréquents, de faible intensité ou aisément contrôlés (annexe de la RFE 2026).",
      "élevé": "Autres procédures invasives (annexe de la RFE 2026).",
      "très élevé": "Procédures nécessitant une hémostase optimale : neurochirurgie intracrânienne et gestes neuraxiaux (R3.2, R3.4 et annexe ALR)."
    },
    precaution: "La RFE précise que ces classements reposent sur des données publiées et sur des avis d'experts, et qu'ils peuvent être adaptés localement : la table est modifiable dans Réglages.",
    actes: {
      "CHOLECYSTECTOMIE": {
        classe: "élevé",
        rubriqueSource: "Chirurgie viscérale, ACHBPT : « hépatectomie, pancréatectomie, cholécystectomie, transplantation hépatique ou pancréatique »",
        page: "annexe, p. 102"
      },
      "PROTHESE TOTALE DE HANCHE": {
        classe: "élevé",
        rubriqueSource: "Orthopédie, chirurgie de la hanche et du genou : « toutes les chirurgies de hanche et de genou »",
        page: "annexe, p. 112",
        noteSource: "Reprise différée des AVK après quelques jours d'HBPM curative citée pour la PTH, quand le chevauchement des deux anticoagulants n'est pas acceptable (argumentaire Q4, p. 24)."
      },
      "CESARIENNE": {
        classe: null,
        mention: A_CLASSER + " (la césarienne n'est pas classée dans l'annexe lue : la partie gynécologique ne classe que des gestes chirurgicaux gynécologiques)",
        page: "annexe gynécologie, p. 108"
      },
      "ADENOIDECTOMIE": {
        classe: "élevé",
        rubriqueSource: "ORL pédiatrique : « adénoïdectomie » avec astérisque ; ablation des végétations adénoïdes par voie endonasale classée à risque élevé en rhinologie",
        page: "annexe ORL, p. 93 à 94 et 99",
        noteSource: "L'astérisque désigne des interventions à situation particulière (à très haut risque) nécessitant une reprise retardée à 72 h ou un anticoagulant de courte durée en relais."
      },
      "CATARACTE": {
        classe: null,
        mention: A_CLASSER + " (l'ophtalmologie n'est pas dans l'annexe de la RFE 2026 lue)",
        risqueAAP: "faible",
        risqueAAPSource: "La chirurgie de la cataracte est citée comme exemple de procédure à faible risque, réalisable sous bithérapie antiplaquettaire (RFE GIHP 2018, propositions sur le risque hémorragique).",
        sourceAAP: S.aap2018
      },
      "HERNIE INGUINALE": {
        classe: "élevé",
        rubriqueSource: "Chirurgie pariétale, SFCP-CH : « cure de hernie (inguinale, fémorale, ombilicale, de la ligne blanche), éventration, éviscération »",
        page: "annexe, p. 102",
        noteSource: "Reprise de l'anticoagulation curative différée après chirurgie de hernie (par exemple après la 48e heure si risque thromboembolique élevé, 72e heure sinon), p. 103."
      },
      "HYSTERECTOMIE": {
        classe: "élevé",
        rubriqueSource: "Gynécologie, CNGOF : « hystérectomies » par voie vaginale, par cœlioscopie et par laparotomie",
        page: "annexe, p. 108"
      },
      "ARTHROSCOPIE GENOU": {
        classe: null,
        mention: A_CLASSER + " selon le geste réalisé : la source classe le genou par type de geste",
        variantes: [
          { geste: "Arthroscopie diagnostique", classe: "faible" },
          { geste: "Méniscectomie simple", classe: "faible" },
          { geste: "Ligamentoplastie", classe: "élevé" },
          { geste: "Réparation multi-ligamentaire", classe: "élevé" },
          { geste: "Microfractures / procédures cartilagineuses", classe: "élevé" },
          { geste: "Synovectomie", classe: "élevé" }
        ],
        rubriqueSource: "Orthopédie, arthroscopie, genou (SFA)",
        page: "annexe, p. 112 à 113",
        noteSource: "Pour les arthroscopies, le délai de reprise de 48 à 72 h relève d'un avis d'experts (aucune étude spécifique)."
      },
      "PERIDURALE": {
        classe: "très élevé",
        rubriqueSource: "Anesthésie loco-régionale : « péridurale, rachianesthésie, péri-rachi combinée »",
        page: "annexe ALR, p. 80",
        noteSource: "Reprise d'une anticoagulation curative non indiquée avec un cathéter péridural en place, faite au moins 24 h après son retrait (annexe ALR, p. 80)."
      },
      "FRACTURE POIGNET": {
        classe: null,
        mention: A_CLASSER + " (l'ostéosynthèse d'une fracture du poignet n'est pas classée dans l'annexe lue ; la chirurgie de la main classe en faible les gestes de type canal carpien et chirurgies digitales, en élevé « greffes de lunatum ou de scaphoïde ou autre geste osseux important »)",
        page: "annexe orthopédie, main, p. 113"
      }
    },
    gestesALR: {
      source: S.rfe2026,
      page: "annexe ALR, p. 80",
      "faible": "Blocs périphériques superficiels (axillaire, fémoral, sciatique, érecteurs du rachis)",
      "élevé": "Blocs périphériques profonds (paravertébral, infraclaviculaire, poplité, plexus lombaire par voie postérieure)",
      "très élevé": "Péridurale, rachianesthésie, péri-rachi combinée"
    },
    risqueAAPParDefaut: {
      classe: "intermédiaire",
      mention: "Pour les antiplaquettaires, la RFE GIHP 2018 classe les actes selon la possibilité de les réaliser sous traitement (faible : sous bithérapie, intermédiaire : sous aspirine seule, élevé : sous aucun antiplaquettaire) et précise que l'intermédiaire concerne « la majorité des procédures invasives ». Le classement acte par acte est " + A_CLASSER + ".",
      source: S.aap2018
    }
  };

  /* ---------------------------------------------------------------------------------------
     3. Consignes périopératoires par classe de médicament
     J0 = jour de la procédure. « jMoins : 4 » = dernière prise 4 jours avant (J-4).
     --------------------------------------------------------------------------------------- */
  var dfge = {
    nom: "dfge",
    libelle: "Débit de filtration glomérulaire estimé (DFGe), formule CKD-EPI",
    unite: "ml/min/1,73 m²",
    precision: "La RFE 2026 raisonne en DFGe CKD-EPI (chapitre 10, tableaux 4 à 6), et non en clairance de Cockcroft-Gault ; le seuil d'ajustement des anticoagulants y est de 50 ml/min.",
    stadesRFE: [
      { stade: "IRC modérée (stade 3)", min: 30, max: 49 },
      { stade: "IRC sévère (stade 4)", min: 15, max: 29 },
      { stade: "IRC terminale (stade 5 ou 5D)", min: null, max: 14 }
    ],
    source: S.rfe2026,
    page: "tableau 4, p. 51"
  };

  var consignes = {
    convention: "J0 = jour de la procédure. Les durées sont des dernières prises (« dernière prise le ») : la maquette calcule la date, le médecin accepte, modifie ou refuse.",
    parametres: { dfge: dfge },

    /* ---- AVK ---- */
    avk: {
      classe: "Antivitamines K (AVK)",
      molecules: {
        acenocoumarol: { dci: "acénocoumarol", noms: ["SINTROM"], demiVie: "8 à 11 h", jMoinsEleve: 4, sourceNom: S.nomsCommerciaux },
        warfarine: { dci: "warfarine", noms: ["COUMADINE"], demiVie: "35 à 45 h", jMoinsEleve: 6, sourceNom: S.nomsCommerciaux },
        fluindione: { dci: "fluindione", noms: ["PREVISCAN"], demiVie: "31 h", jMoinsEleve: 5, note: "La RFE indique que cet AVK va disparaître du marché." }
      },
      regles: {
        "faible": {
          arret: { type: "poursuite", libelle: "Poursuivre l'AVK" },
          controle: "INR dans la semaine précédant la procédure, pour vérifier l'absence de surdosage",
          reprise: "À l'heure habituelle et à la posologie habituelle (le soir de la procédure ou le lendemain matin)",
          relais: "Sans objet",
          reference: "R2.1 (grade 2+, accord fort), p. 15 ; synthèse p. 63",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "élevé": {
          arret: { type: "derniere-prise", jMoinsParMolecule: { acenocoumarol: 4, warfarine: 6, fluindione: 5 }, libelle: "Dernière prise : acénocoumarol J-4, warfarine J-6, fluindione J-5" },
          controle: { jour: "J-1", examen: "INR", seuil: 1.5, unite: "INR", libelle: "INR la veille de la procédure ; seuil de sécurité hémostatique 1,5" },
          vitamineK: { siInrAuDessusDuSeuil: true, doseMg: [2, 5], voie: "orale", moment: "la veille de la procédure", controleINRLendemain: true, reference: "R3.2 (grade 2+, accord fort)" },
          reprise: { delaiHeuresMax: 24, libelle: "Reprise dans les 24 premières heures, à la posologie habituelle, sans dose de charge", reference: "R4.1 et R5.4 (grade 1+ pour la FA)" },
          sinonRepriseImpossible: "Si la reprise est impossible dans les 24 h : héparine à dose curative (HBPM de préférence), idéalement entre 48 et 72 h après la procédure, arrêtée dès le premier INR ≥ 2 (R4.2, R4.3)",
          relais: "Voir consignes.relaisAVK (dépend de l'indication de l'AVK)",
          irc: "En cas d'insuffisance rénale chronique, délais d'arrêt et de reprise des AVK identiques à ceux de la population générale (R10.4, grade 2+)",
          reference: "R3.1, R3.2, R4.1 (grade 2+, accord fort), tableaux 1 et 2, p. 17 à 20 ; synthèse p. 63",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "très élevé": {
          arret: { type: "derniere-prise", jMoinsParMolecule: { acenocoumarol: 4, warfarine: 6, fluindione: 5 }, libelle: "Mêmes dernières prises que pour le risque élevé" },
          controle: { jour: "J-1", examen: "INR", seuil: 1.2, unite: "INR", libelle: "INR la veille ; seuil de 1,2 pour la neurochirurgie intracrânienne et les procédures neuraxiales" },
          vitamineK: { siInrAuDessusDuSeuil: true, doseMg: [2, 5], voie: "orale", moment: "la veille de la procédure", controleINRLendemain: true, reference: "R3.2" },
          reprise: { delaiHeuresMax: null, libelle: "Délai propre aux gestes neuraxiaux : " + A_RENSEIGNER + ". Avec un cathéter péridural en place, pas de reprise d'une anticoagulation curative ; au moins 24 h après son retrait (annexe ALR, p. 80)." },
          reference: "R3.2 ; tableau 2 note § (INR ≤ 1,2) ; annexe ALR p. 80",
          source: S.rfe2026, version: S.rfe2026.version
        }
      }
    },

    /* ---- Relais pré- et post-procéduraux des AVK (HBPM) ---- */
    relaisAVK: {
      classe: "Relais héparinique des AVK pour une procédure à risque hémorragique élevé",
      parametre: {
        nom: "indication",
        valeurs: [
          "valve mécanique",
          "valve aortique à double ailette, rythme sinusal, sans antécédent thromboembolique lié à la valve",
          "fibrillation atriale sans antécédent d'AVC, d'AIT ou d'embolie systémique",
          "fibrillation atriale avec antécédent d'AVC, d'AIT ou d'embolie systémique",
          "MTEV (EP ou TVP proximale) de moins de 3 mois",
          "MTEV autre, hors cas complexe",
          "cas complexe de MTEV (SAPL, HTP-TEC, TIH en cours, récidive sous traitement, etc.)"
        ]
      },
      regles: {
        "valve mécanique": {
          pre: { relais: true, libelle: "HBPM à dose curative en deux injections par jour : première injection le soir de J-3, dernière le matin de J-1, sans contrôle de l'activité anti-Xa le matin de l'intervention", reference: "R6.1 (grade 2+, accord fort)" },
          post: { relais: true, libelle: "Héparines à dose curative (HBPM en deux injections par jour de préférence), idéalement entre 48 et 72 h après la procédure, arrêtées dès le premier INR ≥ 2", reference: "R6.4 (grade 2+)" }
        },
        "valve aortique à double ailette, rythme sinusal, sans antécédent thromboembolique lié à la valve": {
          pre: { relais: true, libelle: "Relais pré-procédural comme pour une valve mécanique", reference: "R6.1" },
          post: { relais: false, libelle: "Pas de relais post-procédural si les AVK sont repris dans les 24 h", reference: "R6.3 (grade 2+)" }
        },
        "fibrillation atriale sans antécédent d'AVC, d'AIT ou d'embolie systémique": {
          pre: { relais: false, libelle: "Pas de relais héparinique pré-procédural", reference: "R5.2 (grade 1-)" },
          post: { relais: false, libelle: "Reprise des AVK dans les 24 h sans relais héparinique", reference: "R5.4 (grade 1+)" }
        },
        "fibrillation atriale avec antécédent d'AVC, d'AIT ou d'embolie systémique": {
          pre: { relais: true, libelle: "HBPM à dose curative : première injection le soir de J-3, dernière au plus tard le matin de J-1", reference: "R5.3 (grade 2+)" },
          post: { relais: false, libelle: "Reprise des AVK dans les 24 h sans relais héparinique", reference: "R5.4 (grade 1+)" }
        },
        "MTEV (EP ou TVP proximale) de moins de 3 mois": {
          pre: { relais: true, libelle: "HBPM à dose curative : première injection le soir de J-3, dernière au plus tard le matin de J-1 ; discuter un filtre cave si la procédure a lieu moins d'un mois après l'EP ou la TVP proximale", reference: "R7.4 (grade 2+), synthèse p. 63 à 64" },
          post: { relais: true, libelle: "Héparines à dose curative (HBPM de préférence), idéalement entre 48 et 72 h après la procédure, arrêtées dès le premier INR ≥ 2", reference: "R7.6 (grade 2+)" }
        },
        "MTEV autre, hors cas complexe": {
          pre: { relais: false, libelle: "Pas de relais héparinique pré-procédural", reference: "R7.5 (grade 2-)" },
          post: { relais: false, libelle: "Pas de relais si les AVK sont repris dans les 24 h, sauf déficit connu en protéine C ou S", reference: "R7.6 et R7.7 (grade 2+)" }
        },
        "cas complexe de MTEV (SAPL, HTP-TEC, TIH en cours, récidive sous traitement, etc.)": {
          pre: { relais: null, libelle: "Stratégie personnalisée, discussion multidisciplinaire avec le médecin référent", reference: "R7.3 (grade 2+)" },
          post: { relais: null, libelle: "Stratégie personnalisée, discussion multidisciplinaire", reference: "R7.3" }
        }
      },
      renal: {
        parametre: "dfge",
        paliers: [
          { dfge: "15 à 29", pre: "Énoxaparine 100 UI/kg x1/j (ou tinzaparine 175 UI/kg x1/j), première injection le soir de J-3, dernière le soir de J-2 (pas d'HBPM la veille), sans surveillance biologique (R10.5.3, grade 2+)", post: "Énoxaparine 100 UI/kg x1/j, début 48 à 72 h après l'intervention (R10.6.2, grade 2+)" },
          { dfge: "< 15", pre: "L'énoxaparine n'est pas recommandée ; la RFE suggère la tinzaparine 175 UI/kg x1/j, ou l'HNF (R10.5.4, avis d'experts)", post: "Tinzaparine ou HNF selon R10.6.3 (avis d'experts)" }
        ],
        source: S.rfe2026, pages: "p. 48 à 49 et tableaux 8 et 9, p. 55"
      },
      source: S.rfe2026, version: S.rfe2026.version
    },

    /* ---- HBPM (énoxaparine) ---- */
    hbpm: {
      classe: "Héparine de bas poids moléculaire (HBPM)",
      molecules: {
        enoxaparine: { dci: "énoxaparine sodique", noms: ["LOVENOX"], sourceNom: S.nomsCommerciaux }
      },
      regles: {
        "faible": {
          arret: { type: null, libelle: null, mention: A_RENSEIGNER + " (la RFE 2026 ne traite pas la poursuite d'une HBPM à dose curative pour une procédure à faible risque hémorragique)" },
          reprise: { libelle: null, mention: A_RENSEIGNER },
          reference: "Absence de recommandation lue pour ce croisement",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "élevé": {
          arret: { type: "derniere-injection", heuresAvant: 24, doseCurative: true, libelle: "HBPM à dose curative : dernière injection 24 heures avant la procédure", reference: "tableau 2, p. 20" },
          adaptationRenale: { parametre: "dfge", mention: "Le tableau 2 demande d'adapter le délai d'arrêt à la fonction rénale (chapitre 10) ; le délai pour une HBPM curative au long cours selon le DFGe est " + A_RENSEIGNER + ". Pour l'énoxaparine, la RFE rappelle que l'AMM propose une dose réduite de moitié (100 UI/kg x1/j au lieu de 2 fois par jour) si DFGe 15 à 29 et que le produit n'est pas recommandé si DFGe < 15." },
          doseProphylactique: { libelle: null, mention: A_RENSEIGNER + " (dernière dose prophylactique avant la procédure non lue dans la RFE 2026 ; voir la RFE MTEV 2024)" },
          reprise: { type: "curatif-differe", delaiHeures: [48, 72], libelle: "Héparine à dose curative idéalement entre 48 et 72 h après la procédure", reference: "R4.2, R4.6 (grade 2+)",
                     prophylaxieEnAttendant: "Thromboprophylaxie veineuse selon les indications habituelles (R4.7, grade 1+) ; synthèse p. 62 : dose prophylactique débutée entre la 12e et la 24e heure post-procédurale si indiquée (entre la 6e et la 12e heure si antécédent d'ETEV, IMC ≥ 40, cancer actif ou thrombophilie majeure)" },
          reference: "tableau 2, R4.x, synthèse p. 62",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "très élevé": {
          arret: { type: null, libelle: null, mention: A_RENSEIGNER + " (délai d'arrêt d'une HBPM avant un geste neuraxial : la RFE 2026 renvoie aux recommandations ESAIC/ESRA 2022 et ASRA 2025 qu'elle cite, non lues ici)" },
          reprise: { libelle: null, mention: "Avec cathéter péridural : pas de reprise curative, au moins 24 h après le retrait (annexe ALR, p. 80). Autres délais : " + A_RENSEIGNER },
          reference: "annexe ALR, p. 80",
          source: S.rfe2026, version: S.rfe2026.version
        }
      }
    },

    /* ---- AOD ---- */
    aod: {
      classe: "Anticoagulants oraux directs (AOD)",
      molecules: {
        apixaban: { dci: "apixaban", noms: null, familleRenale: "anti-Xa" },
        rivaroxaban: { dci: "rivaroxaban", noms: null, familleRenale: "anti-Xa" },
        dabigatran: { dci: "dabigatran", noms: null, familleRenale: "anti-IIa" }
      },
      noteMolecules: "La RFE traite aussi l'edoxaban (même règle que l'apixaban et le rivaroxaban). Noms commerciaux des AOD non lus à la source : champ noms = null.",
      parametre: dfge,
      regles: {
        "faible": {
          arret: { type: "sauter-prises", prises: ["soir J-1", "matin J0"], libelle: "Pas de prise la veille au soir ni le matin de la procédure, quel que soit le schéma thérapeutique (une prise le matin, une prise le soir ou deux prises par jour), quel que soit le DFGe", reference: "R2.2 et R10.2 (grade 2+, accord fort)" },
          reprise: { type: "apres-fin-du-geste", delaiHeuresMin: 6, libelle: "Reprise aux doses habituelles, au moins 6 heures après la fin du geste invasif", reference: "R2.2" },
          relais: "Pas de relais, pas de dosage (synthèse p. 62)",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "élevé": {
          arretParDfge: {
            "apixaban": [
              { dfgeMin: 50, dfgeMax: null, jMoins: 3, grade: "2+" },
              { dfgeMin: 30, dfgeMax: 49, jMoins: 3, grade: "2+" },
              { dfgeMin: 15, dfgeMax: 29, jMoins: 5, grade: "avis d'experts" },
              { dfgeMin: null, dfgeMax: 14, jMoins: 5, grade: "avis d'experts" }
            ],
            "rivaroxaban": [
              { dfgeMin: 50, dfgeMax: null, jMoins: 3, grade: "2+" },
              { dfgeMin: 30, dfgeMax: 49, jMoins: 3, grade: "2+" },
              { dfgeMin: 15, dfgeMax: 29, jMoins: 5, grade: "avis d'experts" },
              { dfgeMin: null, dfgeMax: 14, jMoins: 5, grade: "avis d'experts" }
            ],
            "dabigatran": [
              { dfgeMin: 50, dfgeMax: null, jMoins: 3, grade: "2+" },
              { dfgeMin: 30, dfgeMax: 49, jMoins: 5, grade: "2+" },
              { dfgeMin: null, dfgeMax: 29, jMoins: null, mention: "Non recommandé (tableau 6, grade 1-) : le dabigatran n'est pas recommandé si DFGe < 30 ; " + A_RENSEIGNER, grade: "1-" }
            ]
          },
          condition: "Les délais ci-dessus supposent que l'AOD est prescrit à la posologie adaptée au DFGe (R10.1, grade 2+).",
          pasDeRelais: "Pas de relais héparinique pré-procédural, pas de dosage en routine (R5.5, R7.9 ; synthèse p. 62)",
          reprise: { type: "differee", delaiHeures: [48, 72], libelle: "Reprise du traitement curatif habituel, selon le schéma habituel, idéalement entre 48 et 72 h après la procédure ; l'insuffisance rénale ne modifie pas la reprise", reference: "R4.5 (grade 2+) ; p. 53",
                     siImpossible: "Héparine à dose curative (HBPM de préférence), idéalement entre 48 et 72 h (R4.6)",
                     prophylaxieEnAttendant: "Thromboprophylaxie veineuse selon les indications habituelles (R4.7, grade 1+) ; synthèse p. 62 : dose prophylactique entre la 12e et la 24e heure si indiquée, entre la 6e et la 12e heure si antécédent d'ETEV, IMC ≥ 40, cancer actif ou thrombophilie majeure" },
          reference: "R3.3 (grade 2+), R10.3.1 et R10.3.2, tableau 6 p. 53, synthèse p. 62",
          source: S.rfe2026, version: S.rfe2026.version
        },
        "très élevé": {
          arret: { type: "derniere-prise", jMoins: 5, grade: "avis d'experts", libelle: "Dernière prise à J-5 pour la neurochirurgie intracrânienne et les procédures neuraxiales", reference: "R3.4 ; tableau 2 note §§" },
          renal: { libelle: "AOD anti-Xa avec DFGe < 30 : dernière prise à J-5 également (R10.3.2). Dabigatran avec insuffisance rénale : " + A_RENSEIGNER + ". En cas d'IRC sévère ou terminale, un dosage de l'AOD peut confirmer l'élimination (p. 52)." },
          dosage: "En cas de doute, un dosage de la concentration résiduelle d'AOD permet d'estimer le risque ; les procédures neuraxiales ne sont réalisées que si la concentration est < 30 ng/ml selon l'ESAIC et l'ASRA citées par la RFE (p. 19).",
          reprise: { libelle: null, mention: "Avec cathéter péridural : pas de reprise curative, au moins 24 h après le retrait (annexe ALR, p. 80). Autres délais : " + A_RENSEIGNER },
          reference: "R3.4, R10.3.2, tableau 2 p. 20",
          source: S.rfe2026, version: S.rfe2026.version
        }
      }
    },

    /* ---- Antiagrégants plaquettaires ---- */
    antiagregants: {
      classe: "Antiagrégants plaquettaires",
      avertissement: S.aap2018.avertissement,
      parametres: {
        indication: {
          nom: "indication",
          valeurs: [
            "prévention primaire",
            "prévention secondaire (post-AVC ischémique, coronaropathie, artériopathie des membres inférieurs)",
            "stent coronaire sous bithérapie antiplaquettaire"
          ]
        },
        risqueAAP: {
          nom: "risqueAAP",
          valeurs: ["faible", "intermédiaire", "élevé"],
          definitions: {
            "faible": "procédure réalisable sous bithérapie antiplaquettaire (exemples : chirurgie de la cataracte, endoscopies digestives diagnostiques)",
            "intermédiaire": "procédure réalisable sous aspirine seule (la majorité des procédures invasives)",
            "élevé": "procédure non réalisable sous antiplaquettaire, même sous aspirine seule (exemples : neurochirurgie intracrânienne, grandes dissections, certains actes d'urologie, hépatiques ou thoraciques)"
          }
        }
      },
      molecules: {
        aspirine: {
          dci: "acide acétylsalicylique (aspirine)",
          noms: ["KARDEGIC", "ASPEGIC"],
          noteNoms: "KARDEGIC = acétylsalicylate de lysine (pages lues). ASPEGIC : correspondance non lue à la source, " + A_RENSEIGNER,
          sourceNom: S.nomsCommerciaux
        },
        clopidogrel: { dci: "clopidogrel", noms: null }
      },
      regles: {
        aspirine: {
          derniereInterruption: { jMoins: 3, jMoinsNeurochirurgieIntracranienne: 5, libelle: "Si l'interruption est indiquée : dernière prise à J-3 (J-5 pour la neurochirurgie intracrânienne)", accord: "fort" },
          parIndication: {
            "prévention primaire": { conduite: "Arrêter l'aspirine en préopératoire", accord: "fort" },
            "prévention secondaire (post-AVC ischémique, coronaropathie, artériopathie des membres inférieurs)": { conduite: "Ne pas arrêter l'aspirine, sauf procédure à risque hémorragique élevé", accord: "fort" },
            "stent coronaire sous bithérapie antiplaquettaire": { conduite: "Poursuivre l'aspirine en préopératoire ; si elle a été interrompue, la reprendre aussi tôt que possible après la procédure, au mieux le jour même. Report de la chirurgie au-delà de la durée recommandée de bithérapie quand c'est possible ; discussion avec le cardiologue.", accord: "fort" }
          },
          posologie: "Chez les patients traités jusqu'à 300 mg/j, ne pas réduire la posologie en vue de la chirurgie",
          relais: "Ni héparine (HNF ou HBPM) ni AINS en relais des antiplaquettaires",
          reprise: "Reprise aussi précoce que possible, en fonction du risque de saignement postopératoire (monothérapie au long cours)",
          alr: "L'aspirine ne contre-indique pas une anesthésie loco-régionale rachidienne si le rapport bénéfice-risque est favorable, en l'absence d'anomalie associée de l'hémostase ; préférer si possible la rachianesthésie en ponction unique à la péridurale",
          selonRisqueAAP: {
            "faible": "Procédure réalisable sous bithérapie antiplaquettaire : pas d'arrêt à prévoir d'après la définition de la classe (le choix d'interrompre l'anti-P2Y12 reste possible si d'autres facteurs de saignement s'y ajoutent)",
            "intermédiaire": "Procédure réalisable sous aspirine seule : conduite selon l'indication ci-dessus",
            "élevé": "Procédure non réalisable sous aspirine : interruption (dernière prise J-3), après évaluation du risque thrombotique avec le cardiologue pour la prévention secondaire"
          },
          reference: "Propositions sur les durées d'interruption, la prévention cardiovasculaire en monothérapie et la bithérapie du patient stenté",
          source: S.aap2018, version: S.aap2018.version
        },
        clopidogrel: {
          derniereInterruption: { jMoins: 5, jMoinsNeurochirurgieIntracranienne: 7, libelle: "Si l'interruption est indiquée : dernière prise à J-5 (J-7 pour la neurochirurgie intracrânienne)", accord: "fort" },
          monotherapie: "Patient sous anti-P2Y12 seul et chirurgie à risque intermédiaire : remplacer l'anti-P2Y12 par de l'aspirine 75 à 100 mg par jour ; le changement peut avoir lieu plus de sept jours avant la chirurgie",
          bitherapieStent: "Reporter la chirurgie non cardiaque au-delà de la durée recommandée de bithérapie ; sinon au-delà du 1er mois après la pose du stent, aspirine poursuivie ; au-delà du 6e mois après un infarctus ou un stent à haut risque thrombotique. Si l'anti-P2Y12 est interrompu, le reprendre précocement, au mieux dans les 24 à 72 h après la chirurgie, avec la même molécule (aucune proposition sur une dose de charge).",
          alr: "Anesthésie loco-régionale rachidienne contre-indiquée sous clopidogrel, sauf interruption de 5 jours ; blocs périphériques profonds contre-indiqués sous anti-P2Y12 ; blocs superficiels possibles si le rapport bénéfice-risque est favorable ; AINS non administrés en périopératoire sous bithérapie",
          relais: "Ni héparine ni AINS en relais",
          reference: "Propositions sur les durées d'interruption, la monothérapie par anti-P2Y12, la bithérapie du patient stenté et l'anesthésie loco-régionale",
          source: S.aap2018, version: S.aap2018.version
        }
      }
    },

    /* ---- Analogues du GLP-1 ---- */
    glp1: {
      classe: "Agonistes du récepteur du GLP-1 (analogues du GLP-1)",
      molecules: null,
      noteMolecules: "La guidance lue vise la classe des agonistes du récepteur du GLP-1 sans les nommer un à un, et précise qu'elle pourra évoluer pour les agonistes doubles et triples. Liste des molécules : " + A_RENSEIGNER,
      parametres: {
        forme: { nom: "forme", valeurs: ["quotidienne", "hebdomadaire"] },
        facteursRisqueVidangeGastrique: [
          "phase d'escalade de dose (versus phase d'entretien)",
          "dose élevée",
          "forme hebdomadaire (effets digestifs plus fréquents qu'avec les formes quotidiennes)",
          "symptômes digestifs : nausées, vomissements, douleur abdominale, dyspepsie, constipation",
          "autres affections retardant la vidange gastrique (dysmotilité intestinale, gastroparésie, maladie de Parkinson, etc.)"
        ]
      },
      regle: {
        decision: "Décision partagée entre le patient et les équipes procédurale, anesthésique et prescriptrice, en pesant le besoin métabolique du traitement et le risque individuel de retard de vidange gastrique et d'inhalation",
        siRisqueNonEleve: "Le traitement peut être poursuivi en préopératoire",
        siRisqueEleve: "L'arrêt doit être mis en balance avec le risque d'hyperglycémie ; la durée d'arrêt est inconnue. À défaut, la guidance suggère de suivre l'orientation initiale de l'ASA : arrêt le jour de l'intervention pour les formes quotidiennes, une semaine avant pour les formes hebdomadaires",
        jMoinsParForme: { quotidienne: { jMoins: 0, libelle: "Suspendre le jour de la chirurgie" }, hebdomadaire: { jMoins: 7, libelle: "Suspendre une semaine avant la chirurgie" } },
        mesuresAssociees: [
          "Évaluer les symptômes évocateurs d'un retard de vidange gastrique le jour de la procédure, même si le traitement a été suspendu",
          "Si inquiétude : régime liquide d'au moins 24 h avant la procédure",
          "Échographie gastrique le jour de l'intervention si inquiétude (selon les moyens de l'établissement)",
          "Si rétention gastrique suspectée ou confirmée : discuter l'induction en séquence rapide, ou l'annulation, avec le patient"
        ],
        reprise: { libelle: null, mention: A_RENSEIGNER + " (la guidance lue ne fixe pas de délai de reprise)" },
        orientationFrancaiseRecente: "Compte rendu SFD 2026 (source secondaire) : les arrêts de 24 h (quotidiens) et de plusieurs jours (hebdomadaires) sont remis en question ; pas d'allongement du jeûne ; approche individualisée selon le risque ; pas d'arrêt des formes à action prolongée dans les 7 jours chez les patients à faible risque. À confirmer par l'équipe avant de l'afficher comme règle.",
        sourceSecondaire: S.glp1Sfd2026
      },
      reference: "Recommandations 1 (a, b, c) et 2 (a, b, c)",
      source: S.glp1Multisociete, version: S.glp1Multisociete.version
    }
  };

  /* ---------------------------------------------------------------------------------------
     4. Scores
     `donnee` indique où la fiche de donnees.js peut fournir l'item ; « non collecté » = à demander.
     --------------------------------------------------------------------------------------- */
  var scores = {
    stopBang: {
      nom: "STOP-Bang",
      objet: "Dépistage du syndrome d'apnées obstructives du sommeil (SAOS ; ne dépiste pas l'apnée centrale)",
      publicationOrigine: S.chung2008,
      publicationsComplementaires: [S.chung2012, S.chung2016],
      pagesLues: [S.mdcalcStopBang, S.aasmStopBang],
      version: "STOP-Bang (Chung 2008, 2012, 2016) ; grille lue sur deux pages le 23/10/2026",
      items: [
        { id: "S", libelle: "Ronflement fort (audible à travers une porte fermée, ou le partenaire vous donne des coups de coude)", points: 1, donnee: "non collecté (questionnaire patient)" },
        { id: "T", libelle: "Fatigue ou somnolence diurne fréquente", points: 1, donnee: "non collecté (questionnaire patient)" },
        { id: "O", libelle: "Apnées observées pendant le sommeil (arrêts respiratoires, étouffements)", points: 1, donnee: "non collecté (questionnaire patient)" },
        { id: "P", libelle: "Hypertension artérielle traitée ou connue", points: 1, donnee: "atcdMed contient HTA" },
        { id: "B", libelle: "IMC supérieur à 35 kg/m²", points: 1, donnee: "calculé depuis poids et taille" },
        { id: "A", libelle: "Âge supérieur à 50 ans", points: 1, donnee: "calculé depuis la date de naissance" },
        { id: "N", libelle: "Tour de cou de 40 cm ou plus", points: 1, seuilCm: 40, ecartEntreSources: "MDCalc : « > 40 cm » ; questionnaire AASM : « 16 pouces / 40 cm ou plus ». À confirmer par l'équipe.", donnee: "non collecté (mesure)" },
        { id: "G", libelle: "Sexe masculin", points: 1, donnee: "sexe du patient" }
      ],
      totalMax: 8,
      interpretation: {
        source: S.aasmStopBang,
        "risque faible": { min: 0, max: 2 },
        "risque intermédiaire": { min: 3, max: 4 },
        "risque élevé": {
          min: 5, max: 8,
          ou: [
            "2 réponses oui ou plus aux 4 questions STOP et sexe masculin",
            "2 réponses oui ou plus aux 4 questions STOP et IMC > 35 kg/m²",
            "2 réponses oui ou plus aux 4 questions STOP et tour de cou de 40 cm ou plus"
          ]
        }
      },
      avertissements: [
        "Le questionnaire STOP-Bang est la propriété de Dr Frances Chung et de l'University Health Network (UHN) ; le questionnaire AASM précise qu'un usage clinique exige une licence (stopbang.ca). Licence à obtenir avant tout usage au-delà de la maquette.",
        "Le site officiel stopbang.ca était en maintenance le 23/10/2026 : les articles de Chung 2012 et 2016 n'ont pas été lus."
      ]
    },

    apfel: {
      nom: "Apfel (nausées et vomissements postopératoires, NVPO)",
      publicationOrigine: S.apfel1999,
      pagesLues: [S.nvpo2008, S.mdcalcApfel],
      version: "Apfel 1999 ; tableau 1 de la conférence d'experts SFAR 2008 relu en image",
      items: [
        { id: "sexeFeminin", libelle: "Sexe féminin", points: 1, donnee: "sexe du patient" },
        { id: "nonFumeur", libelle: "Non-fumeur", points: 1, donnee: "tabac (NON ; ARRET à trancher par l'équipe)" },
        { id: "antecedentNvpo", libelle: "Antécédent de NVPO ou de mal des transports", points: 1, donnee: "non collecté",
          ecartEntreSources: "MDCalc : « antécédent de mal des transports ou de NVPO » ; tableau SFAR 2008 : ligne « Antécédent de NVPO » pour Apfel, la ligne « Mal des transports » n'étant cochée que pour le score de Koivuranta. À confirmer par l'équipe." },
        { id: "morphiniquesPostop", libelle: "Morphiniques postopératoires", points: 1, donnee: "décision d'anesthésie, non connue à la consultation (à confirmer)" }
      ],
      totalMax: 4,
      interpretation: {
        source: S.nvpo2008,
        grandeur: "Risque de NVPO selon le nombre de facteurs (tableau 1 de la SFAR 2008)",
        risquePourcent: { "0": "< 10", "1": "21", "2": "39", "3": "61", "4": "79" },
        categories: { valeur: null, mention: "Pas de seuils faible, moyen, élevé dans la source lue : " + A_RENSEIGNER }
      }
    },

    lee: {
      nom: "Lee (Revised Cardiac Risk Index, RCRI)",
      variantes: {
        original: {
          libelle: "RCRI à 6 items (Lee 1999)",
          publicationOrigine: S.lee1999,
          pagesLues: [S.mdcalcRcri, S.ccs2017],
          version: "Lee 1999 ; grille lue sur MDCalc et dans les lignes directrices CCS 2017",
          items: [
            { id: "chirurgieRisqueEleve", libelle: "Chirurgie à haut risque (intrapéritonéale, intrathoracique, vasculaire sus-inguinale)", points: 1, donnee: "dérivé de l'acte (à classer par l'équipe)" },
            { id: "cardiopathieIschemique", libelle: "Antécédent de cardiopathie ischémique (infarctus, test d'effort positif, douleur thoracique d'origine ischémique, nitrés, ondes Q)", points: 1, donnee: "atcdMed contient INFARCTUS" },
            { id: "insuffisanceCardiaque", libelle: "Antécédent d'insuffisance cardiaque congestive", points: 1, donnee: "atcdMed contient INSUFFISANCE CARDIAQUE" },
            { id: "avcAit", libelle: "Antécédent d'accident vasculaire cérébral ou d'accident ischémique transitoire", points: 1, donnee: "atcdMed contient AVC" },
            { id: "insuline", libelle: "Traitement préopératoire par insuline", points: 1, donnee: "traitements contient INSULINE ou atcdMed contient DIABETE ID" },
            { id: "creatinine", libelle: "Créatininémie préopératoire supérieure à 2 mg/dl (176,8 µmol/l ; 177 µmol/l dans CCS)", points: 1, donnee: "non collecté" }
          ],
          totalMax: 6,
          interpretation: {
            source: S.ccs2017,
            grandeur: "Risque d'infarctus du myocarde, d'arrêt cardiaque ou de décès à 30 jours (estimations poolées de validations externes, CCS 2017, tableau 2)",
            risquePourcent: { "0": "3,9 (IC 95 % 2,8 à 5,4)", "1": "6,0 (4,9 à 7,4)", "2": "10,1 (8,1 à 12,6)", "3 ou plus": "15,0 (11,1 à 20,0)" },
            risqueDerivationOrigine: { valeur: null, mention: "Pourcentages de la cohorte de dérivation de Lee 1999 : " + A_RENSEIGNER + " (article non lu)" },
            noteCcs: "La CCS note que ces valeurs sont supérieures à celles de la cohorte de dérivation (dosage de la troponine contre la CK-MB, exclusion des urgences). Selon MDCalc, citant la CCS 2017, un RCRI ≥ 1 conduit à envisager un dosage de BNP ou NT-proBNP."
          }
        },
        modifieSfar2024: {
          libelle: "Score de Lee clinique modifié à 5 items (SFAR 2024)",
          publicationOrigine: S.lee1999,
          pagesLues: [S.sfarCoeur2024],
          version: "Fellahi et Schweizer, SFAR 2024, tableau 1 « modifié d'après Lee 1999 »",
          items: [
            { id: "coronaropathie", libelle: "Antécédents de maladie coronarienne", points: 1, donnee: "atcdMed contient INFARCTUS" },
            { id: "insuffisanceCardiaque", libelle: "Antécédents d'insuffisance cardiaque", points: 1, donnee: "atcdMed contient INSUFFISANCE CARDIAQUE" },
            { id: "cerebrovasculaire", libelle: "Antécédent de maladie cérébrovasculaire (accident vasculaire cérébral ou accident ischémique transitoire)", points: 1, donnee: "atcdMed contient AVC" },
            { id: "diabete", libelle: "Tout type de diabète", points: 1, donnee: "atcdMed contient DIABETE ID ou DIABETE NID" },
            { id: "insuffisanceRenale", libelle: "Insuffisance rénale (DFG < 60 ml/min/1,73 m²)", points: 1, donnee: "non collecté" }
          ],
          totalMax: 5,
          interpretation: {
            source: S.sfarCoeur2024,
            grandeur: "Incidence des complications cardiovasculaires majeures (tableau 1 de l'article)",
            risquePourcent: { "0": "0,4", "1": "6,0 (4,9 à 7,4)", "2": "10,1 (8,1 à 10,6)", "3 ou plus": "15 (11,1 à 20,0)" },
            ecart: "Pour un score de 0, l'article imprime 0,4 % alors que la CCS 2017 donne 3,9 % pour le RCRI à 6 items ; à confirmer par l'équipe avant tout affichage.",
            risqueChirurgie: "Dans cette version, le risque lié à la chirurgie s'évalue à part (tableau de l'ESC 2022 cité par l'article, non repris ici)."
          }
        }
      }
    },

    caprini: {
      nom: "Caprini (risque thromboembolique veineux)",
      statut: "non confirmé",
      utilisableMaquette: false,
      raison: "Trois grilles circulent (2005, révision de 2006 de l'auteur, versions des calculateurs) avec des items et des seuils différents ; la publication d'origine (Dis Mon 2005) n'a pas pu être lue. La RFE GIHP 2024 précise que les scores de risque ont une valeur prédictive modérée, n'ont pas montré d'intérêt par rapport à l'estimation du clinicien, et que les seuils du Caprini varient selon la chirurgie. À afficher dans la maquette comme « grille à valider », jamais comme score calculé.",
      publicationOrigine: S.caprini2005,
      pagesLues: [S.cardvascCaprini, S.mdcalcCaprini, S.caprini2006fiche, S.mtev2024],
      version: "Grille « 2005 » telle que reproduite par cardvasc.org et MDCalc le 23/10/2026",
      itemsGrille2005: {
        "1 point": ["Âge 41 à 60 ans", "Chirurgie mineure prévue", "IMC > 25 kg/m²", "Jambes gonflées (actuel)", "Varices", "Sepsis (< 1 mois)", "Maladie pulmonaire grave dont pneumonie (< 1 mois)", "Fonction respiratoire anormale / BPCO", "Infarctus du myocarde aigu", "Insuffisance cardiaque congestive (< 1 mois)", "Antécédent de maladie inflammatoire chronique de l'intestin", "Patient médical alité", "Contraceptifs oraux ou traitement hormonal substitutif (femme)", "Grossesse ou post-partum (< 1 mois) (femme)", "Antécédent d'avortement inexpliqué ou récidivant (femme)", "Chirurgie majeure récente < 1 mois (MDCalc seulement)", "Autres facteurs de risque (MDCalc seulement)"],
        "2 points": ["Âge 61 à 74 ans", "Arthroscopie", "Chirurgie ouverte majeure (> 45 min)", "Cœlioscopie (> 45 min)", "Cancer présent ou antérieur", "Alitement > 72 h", "Plâtre immobilisant (< 1 mois)", "Abord veineux central"],
        "3 points": ["Âge ≥ 75 ans", "Antécédent de MTEV", "Antécédent familial de MTEV", "Facteur V Leiden", "Mutation 20210A de la prothrombine", "Anticoagulant circulant de type lupique", "Anticorps anticardiolipine", "Homocystéine sérique élevée", "Thrombopénie induite par l'héparine", "Autre thrombophilie congénitale ou acquise"],
        "5 points": ["AVC (< 1 mois)", "Arthroplastie majeure élective du membre inférieur", "Fracture de hanche, du bassin ou de jambe (< 1 mois)", "Lésion médullaire aiguë avec paralysie (< 1 mois)", "Polytraumatisme (MDCalc seulement)"]
      },
      ecartsEntreSources: [
        "MDCalc ajoute « chirurgie majeure < 1 mois », « polytraumatisme » et « autres facteurs de risque », absents de cardvasc.org ; cardvasc.org affiche les items féminins que MDCalc masque derrière le sexe.",
        "La fiche de Caprini révisée en 2006 utilise d'autres seuils (chirurgie majeure > 60 minutes, obésité IMC > 30, obésité morbide IMC > 40 à 2 points) et d'autres items.",
        "L'item « antécédent de mort-née inexpliquée, avortements spontanés répétés (≥ 3), naissance prématurée avec toxémie » figure sur la fiche 2006, pas dans la formulation de cardvasc.org."
      ],
      interpretationsPubliees: {
        cardvasc: { source: S.cardvascCaprini, categories: { "0 à 1": "risque faible", "2": "risque modéré", "3 à 4": "risque élevé", "5 ou plus": "risque très élevé" } },
        ficheCaprini2006: { source: S.caprini2006fiche, categories: { "0 à 1": "risque faible (incidence de TVP < 10 %)", "2": "modéré (10 à 20 %)", "3 à 4": "élevé (20 à 40 %)", "5 ou plus": "le plus élevé (40 à 80 % ; mortalité de 1 à 5 %)" } },
        mdcalc: { source: S.mdcalcCaprini, categories: { "0": "le plus bas", "1 à 4": "faible à modéré", "5 à 6": "élevé", "7 à 8": "élevé", "9 ou plus": "le plus élevé" }, seuilsParChirurgie: "≥ 5 chirurgie générale ; ≥ 10 prothèse articulaire ; ≥ 12 fracture de hanche ; ≥ 9 autres chirurgies" }
      },
      seuilEquipe: { valeur: null, mention: A_RENSEIGNER }
    }
  };

  /* ---------------------------------------------------------------------------------------
     5. Critères de tri vert / orange / rouge (D-03) : critères du score MyRISK
     --------------------------------------------------------------------------------------- */
  var triCriteres = {
    source: S.myrisk2023,
    version: "MyRISK, JMIR Perioperative Medicine 2023 (chirurgie orthopédique, CHU de Toulouse)",
    nature: "Exemple tiré d'une publication. Outil de tri, jamais une décision.",
    regle: {
      "vert": "Les 16 critères sont tous au niveau 1 (risque global présumé faible)",
      "orange": "Au moins 1 des 16 critères au niveau 2 (risque présumé intermédiaire)",
      "rouge": "Au moins 3 critères de niveau 2, ou au moins 1 critère de niveau 3 (risque présumé élevé)"
    },
    criteres: [
      { id: "age", libelle: "Âge (ans)", niveau1: "< 65", niveau2: "65 à 80", niveau3: "> 80", donnee: "calculé depuis la date de naissance" },
      { id: "imc", libelle: "IMC (kg/m²)", niveau1: "< 30", niveau2: "30 à 40", niveau3: "> 40", donnee: "calculé depuis poids et taille" },
      { id: "allergiesMedicamenteuses", libelle: "Allergies médicamenteuses", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "allergies" },
      { id: "troublesHemostase", libelle: "Troubles de l'hémostase", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "non collecté" },
      { id: "nombreMedicaments", libelle: "Nombre de médicaments", niveau1: "0", niveau2: "1 à 5", niveau3: "> 5", donnee: "traitements" },
      { id: "tabacActif", libelle: "Tabagisme actif", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "tabac" },
      { id: "asthme", libelle: "Asthme", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient ASTHME" },
      { id: "apneeSommeil", libelle: "Syndrome d'apnées du sommeil", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "non collecté" },
      { id: "niveauActivite", libelle: "Niveau d'activité maximal (METs)", niveau1: "monter 2 étages sans s'arrêter, marcher dans la rue (5 à 7 km/h), gros travaux domestiques, activités sportives", niveau2: null, niveau3: "activités de la vie quotidienne (repas, toilette), marcher dans la maison, marcher dans la rue (3 à 5 km/h)", donnee: "signes (MET > 4)" },
      { id: "symptomesCardiaquesEffort", libelle: "Symptômes cardiaques à l'effort", niveau1: "non", niveau2: null, niveau3: "oui", donnee: "signes (angor, dyspnée d'effort)" },
      { id: "hypertension", libelle: "Hypertension artérielle", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient HTA" },
      { id: "cardiopathie", libelle: "Cardiopathie", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient INFARCTUS ou INSUFFISANCE CARDIAQUE" },
      { id: "maladieRespiratoire", libelle: "Maladie respiratoire", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient BPCO" },
      { id: "maladieRenale", libelle: "Maladie rénale", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "non collecté" },
      { id: "troublesNeurologiques", libelle: "Troubles neurologiques", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient AVC" },
      { id: "diabete", libelle: "Diabète", niveau1: "non", niveau2: "oui", niveau3: null, donnee: "atcdMed contient DIABETE ID ou DIABETE NID" }
    ],
    orientation: {
      vert: { orientation: "téléconsultation", statut: "piste évoquée par les auteurs : un score numérique fiable pourrait servir à orienter objectivement les patients à faible risque vers la téléconsultation (conclusion de l'article)" },
      orange: { orientation: null, mention: "Orientation (consultation brève, standard) : " + A_RENSEIGNER },
      rouge: { orientation: null, mention: "Orientation : " + A_RENSEIGNER }
    },
    performance: {
      population: "401 patients inclus, 389 analysés, chirurgie orthopédique, un seul centre ; 16 patients (4,1 %) avec une complication à 6 mois",
      scoreRouge: "Associé aux complications (odds ratio 5,9 ; IC 95 % 1,5 à 22,3). Sensibilité 75 %, valeur prédictive négative 98 %, spécificité 66 %, valeur prédictive positive 9 % (AUC 0,70)",
      apresReclassementParApprentissageMachine: "Sensibilité 94 %, VPN 99 %, spécificité 49 %, VPP 7 % (AUC 0,71) pour l'orange reclassé vert ou rouge",
      limite: "Étude monocentrique d'un outil de tri : ne pas présenter la pastille comme une décision. Aucune validation en anesthésie hors orthopédie lue."
    }
  };

  /* ---------------------------------------------------------------------------------------
     6. Méta
     --------------------------------------------------------------------------------------- */
  var meta = {
    dateConstitution: "2026-10-23",
    mention: "Valeurs d'exemple pour maquette, à valider par écrit par l'équipe d'anesthésie avant tout usage clinique",
    aRenseigner: A_RENSEIGNER,
    aClasser: A_CLASSER,
    consultationSources: DATE,
    notes: [
      "Toute valeur sans source lue vaut null, avec la mention « à renseigner par l'équipe ».",
      "La maquette emploie « proposition », jamais « recommandation » ni « décision » (ADR 0007).",
      "Les règles s'appliquent à la procédure programmée d'un adulte ; aucune règle pédiatrique n'a été lue (patient fictif de 7 ans : à renseigner par l'équipe).",
      "Le texte FileMaker de donnees.js « A R R E T E R : SINTROM 5 JOURS AVANT, RELAIS LOVENOX » est une consigne historique fictive : la RFE 2026 propose J-4 pour l'acénocoumarol (J-6 pour la warfarine) et un relais selon l'indication de l'AVK."
    ],
    sources: S
  };

  var REGLES = {
    meta: meta,
    jeune: jeune,
    risqueHemorragique: risqueHemorragique,
    consignes: consignes,
    scores: scores,
    triCriteres: triCriteres
  };

  if (typeof window !== "undefined") { window.PREOPIA_REGLES = REGLES; }
  if (typeof module !== "undefined" && module.exports) { module.exports = REGLES; }
})();
