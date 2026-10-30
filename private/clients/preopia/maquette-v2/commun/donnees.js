/* Données FICTIVES et règles de la V1 basique, communes aux maquettes A et B.
   Listes de valeurs et règles reprises de la base FileMaker décodée
   (docs/recherche/06-retro-ingenierie-filemaker.md). Aucune personne réelle. */
(function () {
  "use strict";

  var AUJOURDHUI = "2026-10-19"; // lundi, jour des consultations de démonstration
  var DEMAIN = "2026-10-20";

  var listes = {
    atcdChir: ["RAS", "APPENDICECTOMIE", "HYSTERECTOMIE", "CESARIENNE", "NEPHRECTOMIE", "FRACTURE", "ABCES", "CHOLECYSTECTOMIE", "SPLENECTOMIE", "THYROIDECTOMIE", "NEO DU SEIN OPERE", "CHIRURGIE ESTHETIQUE"],
    atcdMed: ["RAS", "ASTHME", "AVC", "BPCO", "DIABETE ID", "DIABETE NID", "HTA", "HYPERCHOLESTEROLEMIE", "HYPOTHYROIDIE", "HYPERTHYROIDIE", "INFARCTUS", "INSUFFISANCE CARDIAQUE", "HEPATITE VIRALE", "ARTHROSE CERVICALE"],
    traitements: ["PAS DE TRAITEMENT", "AUCUN", "ADALATE", "AMLOR", "ASPEGIC", "COVERSYL", "GLUCOPHAGE", "LEVOTHYROX", "LOVENOX", "SINTROM", "LASILIX", "VENTOLLINE", "INSULINE", "CORTICOIDES"],
    allergies: ["NON CONNUES", "AINS", "ALIMENTS", "ASPIRINE", "ASTHME", "IODE", "MACROLIDES", "PARACETAMOL", "PENICILLINE", "POILS D'ANIMAUX", "POLLEN", "POUSSIERE"],
    signes: ["RAS", "MET > 4", "ABSENCE DE SF ORIENTANT SUR L'APPAREIL CV", "DYSPNEE D'EFFORT", "DYSPNEE DE REPOS", "ANGOR", "PAS D'ANGOR", "PAS DE DYSPNEE", "CEPHALEES"],
    nyha: ["I", "II", "III", "IV"],
    cardio: ["B.D.C. REGULIERS", "B.D.C. IRREGULIERS", "B.D.C. SOURDS", "EXTRASYSTOLES"],
    souffle: ["SANS SOUFFLE", "SOUFFLE SYSTOLIQUE", "SOUFFLE DIASTOLIQUE", "ROULEMENT"],
    pulmo: ["RAS", "POUMONS SECS", "BRONCHITIQUE CHRONIQUE", "CREPITANTS BILATERAUX", "FIN D'EXPIRATION SPASTIQUE", "RALES BRONCHIQUES"],
    ecg: ["RS PR NL", "PAS DE SIGNE D'HVG", "PAS DE TRB DE REPOLARISATION", "AC/FA", "FLUTTER AURICULAIRE", "ESV", "HVG"],
    rx: ["RAS", "A VOIR", "BULLE D'EMPHYSEME", "DEVIATION TRACHEALE", "POUMON HYPER-CLAIR"],
    intubation: ["RAS", "RAS PAR AILLEURS", "info risque bris dentaire", "cou court", "retrognatisme", "ouverture de bouche limitee", "nuque raide", "Mauvais état bucco-dentaire / info risque chute"],
    mallampati: ["I", "II", "III", "IV"],
    dtm: ["< 7", "> 7", "= 7"],
    asa: ["I", "II", "III", "IV", "V", "E"],
    gs: ["A+", "A-", "0+", "0-", "B+", "B-", "AB+", "AB-", "?"],
    tabac: ["NON", "OUI", "VAP", "ARRET", "PAKA", "OCCASION"],
    alcool: ["NON", "OUI", "SEVRE", "OCCASION", "FESTIF", "MODERE"],
    conclusion: ["BILAN PRE OPERATOIRE A VOIR", "CS CARDIO A VOIR", "AMBU/ AG /INFOS DONNEES", "HOSPIT/ AG / INFOS DONNEES", "AMBU / AMAC / INFOS DONNEES", "INFO APD, RA, AG, TRANSFUSION", "BON ETAT GENERAL"],
    couverture: ["RS", "RST", "SS", "RNS", "HCPS", "MGEN", "DNO", "TTR", "AT", "pas de cps", "CAFAT", "HCPS +CPS", "DNO +MGEN"],
    precision: ["OEIL DROIT", "OEIL GAUCHE", "OEIL DROIT ET GAUCHE", "DROIT", "GAUCHE", "BILATERAL"],
    consignesTtt: ["- A R R E T E R :", "- NE PAS", "- A JEUN", "- a l'admission", "- A 6H DONNER :", "- 1 H AVANT"],
    classesTtt: ["ANTICOAGULANTS", "ASPIRINE", "ANTIDIABETIQUES"],
    premedication: ["PARACETAMOL 1G", "CATAPRESSAN 75 µ ALD", "CATAPRESSAN 150 µ ALD", "OU HYPNOVEL 3 mg PO", "PARACETAMOL 1g + KETOPROFENE 100mg"],
    horaire: ["A L'ADMISSION", "A 6H", "A 6H30", "A 6H45", "A 7H", "A 7H30", "1 HEURE AVANT"]
  };

  var anesthesistes = ["Dr A. Moreau", "Dr T. Raapoto", "Dr L. Garnier", "Dr H. Teriitahi"];
  var chirurgiens = ["Dr P. Lemaire", "Dr V. Tuairau", "Dr C. Blanchard", "Dr M. Hapairai", "Dr S. Faure"];

  // Patients fictifs. dn: null = sans DN (touriste, autre régime).
  var patients = [
    { id: "p01", nom: "TEHEIURA", prenom: "Moana", ddn: "1984-03-12", sexe: "F", dn: "0000123", couverture: "RS", tel: "87 00 00 01", site: "Cardella" },
    { id: "p02", nom: "LEFEBVRE", prenom: "Julien", ddn: "1961-11-02", sexe: "M", dn: "0000456", couverture: "RNS", tel: "87 00 00 02", site: "Cardella" },
    { id: "p03", nom: "TAPUTU", prenom: "Hinatea", ddn: "1993-07-21", sexe: "F", dn: "0000789", couverture: "RS", tel: "87 00 00 03", site: "Mamao", nee: "MAIHI" },
    { id: "p04", nom: "AMARU", prenom: "Teva", ddn: "2018-05-30", sexe: "M", dn: "0001012", couverture: "RS", tel: "87 00 00 04", site: "Cardella" },
    { id: "p05", nom: "SCHMIDT", prenom: "Anna", ddn: "1979-09-14", sexe: "F", dn: null, couverture: "pas de cps", tel: "+49 000 0000", site: "Cardella" },
    { id: "p06", nom: "PAMBRUN", prenom: "Raymond", ddn: "1944-01-08", sexe: "M", dn: "0001345", couverture: "RST", tel: "87 00 00 06", site: "Cardella" },
    { id: "p07", nom: "TEMAURI", prenom: "Vaea", ddn: "1957-12-19", sexe: "F", dn: "0001678", couverture: "RS", tel: "87 00 00 07", site: "Mamao" },
    { id: "p08", nom: "ROCHE", prenom: "Marc", ddn: "1972-04-03", sexe: "M", dn: "0001901", couverture: "MGEN", tel: "87 00 00 08", site: "Cardella" },
    { id: "p09", nom: "TAUTU", prenom: "Heiarii", ddn: "2001-08-27", sexe: "M", dn: "0002234", couverture: "RS", tel: "87 00 00 09", site: "Mamao" },
    { id: "p10", nom: "VANIZETTE", prenom: "Claire", ddn: "1988-02-15", sexe: "F", dn: "0002567", couverture: "RNS", tel: "87 00 00 10", site: "Cardella" },
    { id: "p11", nom: "TERIIPAIA", prenom: "Manuarii", ddn: "1966-06-06", sexe: "M", dn: "0002890", couverture: "RST", tel: "87 00 00 11", site: "Cardella" },
    { id: "p12", nom: "BONNET", prenom: "Lucie", ddn: "2009-10-09", sexe: "F", dn: "0003123", couverture: "RS", tel: "87 00 00 12", site: "Mamao" }
  ];

  function fiche(o) {
    var base = {
      intervention: "", precision: "", dateInt: DEMAIN, heure: "", chirurgien: "", anesthesiste: "",
      dateCs: AUJOURDHUI, site: "Cardella",
      poids: "", taille: "", ta: "", pouls: "",
      atcdChir: "", atcdMed: "", traitements: "", allergies: "", autresAllergies: "", signes: "", nyha: "",
      tabac: "", alcool: "", grossesses: "", transfusions: "",
      cardio: "", souffle: "", pulmo: "", ecg: "", rx: "", autresExamens: "",
      intubation: "", mallampati: "", dtm: "", dentier: "",
      gs: "", rai: "", asa: "", conclusion: "", autorisation: "",
      consignes: "", premedication: "", horaire: "", jeune: "solide h-6 / liquide clair h-2",
      docs: { consultation: "a-faire", consignes: "a-faire", consentement: "a-faire" },
      rasPose: {}
    };
    for (var k in o) base[k] = o[k];
    return base;
  }

  // Consultations de démonstration (interventions de demain + une du jour en cours).
  var consultations = [
    fiche({ id: "c01", patient: "p01", intervention: "CHOLECYSTECTOMIE", heure: "07:30", chirurgien: chirurgiens[0], anesthesiste: anesthesistes[0], poids: "68", taille: "164", ta: "12/7", pouls: "72",
      atcdChir: "RAS", atcdMed: "RAS", traitements: "PAS DE TRAITEMENT", allergies: "NON CONNUES", signes: "RAS", cardio: "B.D.C. REGULIERS", souffle: "SANS SOUFFLE", pulmo: "POUMONS SECS",
      intubation: "RAS", mallampati: "I", dtm: "> 7", asa: "I", gs: "0+", conclusion: "AMBU/ AG /INFOS DONNEES", premedication: "PARACETAMOL 1G", horaire: "A L'ADMISSION",
      docs: { consultation: "pret", consignes: "pret", consentement: "pret" } }),
    fiche({ id: "c02", patient: "p02", intervention: "PROTHESE TOTALE DE HANCHE", precision: "DROIT", heure: "08:00", chirurgien: chirurgiens[1], anesthesiste: anesthesistes[1], poids: "92", taille: "171", ta: "15/8", pouls: "64",
      atcdChir: "APPENDICECTOMIE", atcdMed: "HTA, DIABETE NID, INFARCTUS (2019)", traitements: "SINTROM, COVERSYL, GLUCOPHAGE", allergies: "PENICILLINE", signes: "DYSPNEE D'EFFORT", nyha: "II",
      cardio: "B.D.C. REGULIERS", souffle: "SANS SOUFFLE", pulmo: "POUMONS SECS", ecg: "RS PR NL", intubation: "RAS", mallampati: "II", dtm: "> 7", asa: "III", gs: "A+",
      conclusion: "HOSPIT/ AG / INFOS DONNEES", consignes: "- A R R E T E R : SINTROM 5 JOURS AVANT, RELAIS LOVENOX", premedication: "CATAPRESSAN 75 µ ALD", horaire: "A 6H",
      docs: { consultation: "pret", consignes: "a-faire", consentement: "pret" } }),
    fiche({ id: "c03", patient: "p03", intervention: "CESARIENNE", heure: "08:30", chirurgien: chirurgiens[2], anesthesiste: anesthesistes[2], poids: "74", taille: "160", ta: "11/7", pouls: "88",
      atcdChir: "RAS", atcdMed: "RAS", traitements: "PAS DE TRAITEMENT", allergies: "NON CONNUES", signes: "RAS", grossesses: "2", intubation: "RAS", mallampati: "II", dtm: "> 7", asa: "II", gs: "B+",
      conclusion: "INFO APD, RA, AG, TRANSFUSION", site: "Mamao",
      docs: { consultation: "pret", consignes: "pret", consentement: "a-faire" } }),
    fiche({ id: "c04", patient: "p04", intervention: "ADENOIDECTOMIE", heure: "09:00", chirurgien: chirurgiens[3], anesthesiste: anesthesistes[0], poids: "22", taille: "118", ta: "", pouls: "96",
      atcdChir: "RAS", atcdMed: "ASTHME", traitements: "VENTOLLINE", allergies: "NON CONNUES", signes: "RAS", intubation: "RAS", mallampati: "I", asa: "II",
      docs: { consultation: "a-faire", consignes: "a-faire", consentement: "a-faire" } }),
    fiche({ id: "c05", patient: "p06", intervention: "CATARACTE", precision: "OEIL GAUCHE", heure: "09:30", chirurgien: chirurgiens[4], anesthesiste: anesthesistes[3], poids: "70", taille: "168", ta: "14/8", pouls: "70",
      atcdChir: "CATARACTE OEIL DROIT (2024)", atcdMed: "HTA, BPCO", traitements: "AMLOR, VENTOLLINE", allergies: "IODE", signes: "DYSPNEE D'EFFORT", nyha: "II", cardio: "B.D.C. REGULIERS", souffle: "SANS SOUFFLE", pulmo: "BRONCHITIQUE CHRONIQUE",
      intubation: "RAS", mallampati: "II", asa: "III", conclusion: "AMBU / AMAC / INFOS DONNEES",
      docs: { consultation: "pret", consignes: "a-faire", consentement: "pret" } }),
    fiche({ id: "c06", patient: "p08", intervention: "HERNIE INGUINALE", precision: "DROIT", heure: "10:00", chirurgien: chirurgiens[0], anesthesiste: anesthesistes[1], poids: "104", taille: "176", ta: "13/8", pouls: "76",
      atcdChir: "RAS", atcdMed: "RAS", traitements: "PAS DE TRAITEMENT", allergies: "NON CONNUES", signes: "RAS", intubation: "cou court", mallampati: "IV", dtm: "< 7", asa: "II",
      docs: { consultation: "pret", consignes: "pret", consentement: "imprime" } }),
    fiche({ id: "c07", patient: "p07", intervention: "HYSTERECTOMIE", heure: "07:30", chirurgien: chirurgiens[2], anesthesiste: anesthesistes[2], poids: "81", taille: "158", ta: "13/7", pouls: "68", site: "Mamao",
      atcdChir: "CESARIENNE", atcdMed: "HYPOTHYROIDIE", traitements: "LEVOTHYROX", allergies: "NON CONNUES", signes: "RAS", intubation: "RAS", mallampati: "II", asa: "II",
      docs: { consultation: "imprime", consignes: "imprime", consentement: "imprime" } }),
    fiche({ id: "c08", patient: "p12", intervention: "ARTHROSCOPIE GENOU", precision: "GAUCHE", heure: "10:30", chirurgien: chirurgiens[1], anesthesiste: anesthesistes[3], poids: "52", taille: "163", ta: "11/6", pouls: "70", site: "Mamao",
      atcdChir: "RAS", atcdMed: "RAS", traitements: "PAS DE TRAITEMENT", allergies: "NON CONNUES", signes: "RAS", intubation: "RAS", mallampati: "I", asa: "I",
      docs: { consultation: "pret", consignes: "pret", consentement: "a-faire" } }),
    // Consultation du jour, à compléter (patiente qui accouche sous péridurale plus tard)
    fiche({ id: "c09", patient: "p10", intervention: "PERIDURALE", dateInt: "2026-11-24", heure: "", chirurgien: chirurgiens[2], anesthesiste: anesthesistes[0], poids: "71", taille: "167", ta: "11/7", pouls: "84",
      docs: { consultation: "a-faire", consignes: "a-faire", consentement: "a-faire" } }),
    // Touriste sans DN, consultation du jour
    fiche({ id: "c10", patient: "p05", intervention: "FRACTURE POIGNET", precision: "DROIT", dateInt: "2026-10-21", heure: "", chirurgien: chirurgiens[1], anesthesiste: anesthesistes[0], poids: "60", taille: "170", ta: "12/8", pouls: "78",
      docs: { consultation: "a-faire", consignes: "a-faire", consentement: "a-faire" } })
  ];

  // Antériorités fictives par patient (dernière consultation), pour « à partir d'un ancien dossier ».
  var anterieures = {
    p02: { date: "2019-03-11", intervention: "ANGIOPLASTIE CORONAIRE", anesthesiste: anesthesistes[1] },
    p06: { date: "2024-05-06", intervention: "CATARACTE OEIL DROIT", anesthesiste: anesthesistes[3] },
    p07: { date: "2021-09-20", intervention: "CHOLECYSTECTOMIE", anesthesiste: anesthesistes[2] },
    p11: { date: "2023-01-17", intervention: "PROSTATECTOMIE", anesthesiste: anesthesistes[1] }
  };

  // Scripts RAS de FileMaker (contenu exact).
  var RAS = {
    premiere: { atcdChir: "RAS", atcdMed: "RAS", traitements: "PAS DE TRAITEMENT", allergies: "NON CONNUES", signes: "RAS" },
    seconde: { cardio: "B.D.C. REGULIERS", souffle: "SANS SOUFFLE", pulmo: "POUMONS SECS" },
    intubation: { intubation: "RAS" }
  };

  var OPHTALMO = ["CATARACTE", "REPOSITIONNEMENT IMPLANT", "CAPSULECTOMIE", "VITRECTOMIE", "IMPLANT", "IMPLANTATION"];
  var EPHEDRINE = "SI TA < 9,5 DILUER 1 AMPOULE D'EPHEDRINE DANS 10 CC DE SERUM PHYSIOLOGIQUE. INJECTER 4 CC EN IVD ET LE RESTE EN PERFUSION DANS 500 CC DE RINGER";

  function patient(id) { for (var i = 0; i < patients.length; i++) if (patients[i].id === id) return patients[i]; return null; }

  // Âge à une date donnée : une décimale sous 3 ans (comme FileMaker : Truncate(... ; 1)), entier au-delà.
  function age(ddn, aDate) {
    if (!ddn) return null;
    var n = new Date(ddn + "T00:00:00"), d = new Date((aDate || AUJOURDHUI) + "T00:00:00");
    var a = (d - n) / (365.2425 * 864e5);
    return a < 3 ? Math.floor(a * 10) / 10 : Math.floor(a);
  }
  function ageTexte(ddn, aDate) { var a = age(ddn, aDate); if (a === null) return ""; return (a < 3 ? String(a).replace(".", ",") : a) + " ans"; }

  function imc(poids, taille) {
    var p = parseFloat(String(poids).replace(",", ".")), t = parseFloat(String(taille).replace(",", "."));
    if (!p || !t) return "";
    if (t > 3) t = t / 100; // taille saisie en cm
    return (Math.round(p / (t * t) * 100) / 100).toFixed(2).replace(".", ",");
  }

  function vide(v) { return !v || !String(v).trim(); }
  function estRasOuInconnu(v) { var s = String(v || "").trim().toUpperCase(); return s === "" || s === "RAS" || s === "NON CONNUES"; }

  // Rappels calculés : mêmes conditions que les champs ALERTE et MSG de la base.
  function rappels(c) {
    var p = patient(c.patient), out = [];
    if (c.mallampati === "IV" || c.dtm === "< 7" || (!vide(c.intubation) && String(c.intubation).trim().toUpperCase() !== "RAS" && String(c.intubation).trim().toUpperCase() !== "RAS PAR AILLEURS")) {
      out.push({ niveau: "rappel", titre: "Attention intubation", detail: [c.mallampati === "IV" ? "Mallampati IV" : "", c.dtm === "< 7" ? "DTM < 7" : "", !vide(c.intubation) && !/^RAS/i.test(c.intubation) ? c.intubation : ""].filter(Boolean).join(" · ") });
    }
    if (!estRasOuInconnu(c.allergies) || !estRasOuInconnu(c.autresAllergies)) {
      out.push({ niveau: "rappel", titre: "Attention allergie", detail: [c.allergies, c.autresAllergies].filter(function (x) { return !estRasOuInconnu(x); }).join(" · ") });
    }
    var a = p ? age(p.ddn, c.dateCs) : null;
    if (a !== null && a < 18 && vide(c.autorisation)) {
      out.push({ niveau: "vigil", titre: "Autorisation d'opérer", detail: "Patient mineur (" + ageTexte(p.ddn, c.dateCs) + ") : autorisation des parents à recueillir" });
    }
    if (/PERIDURALE|^PERI$/i.test(c.intervention) || /^APD$/i.test(c.intubation)) {
      out.push({ niveau: "info", titre: "Consigne éphédrine ajoutée", detail: EPHEDRINE });
    }
    if (estOphtalmo(c)) out.push({ niveau: "info", titre: "Consignes ophtalmologie", detail: "La feuille de consignes ophtalmologie remplace la standard" });
    if (p && !p.dn) out.push({ niveau: "neutre", titre: "Patient sans DN", detail: "Couverture : " + (p.couverture || "à préciser") });
    return out;
  }
  function estOphtalmo(c) { var i = String(c.intervention || "").toUpperCase(); return OPHTALMO.some(function (x) { return i.indexOf(x) === 0; }); }

  // Pose un bloc RAS. Ne remplace pas une saisie existante différente : la renvoie comme conflit.
  function poserRas(c, bloc) {
    var poses = [], conflits = [];
    var valeurs = RAS[bloc];
    Object.keys(valeurs).forEach(function (k) {
      if (vide(c[k]) || c.rasPose[k]) { c[k] = valeurs[k]; c.rasPose[k] = true; poses.push(k); }
      else if (c[k] !== valeurs[k]) conflits.push(k);
    });
    return { poses: poses, conflits: conflits };
  }
  function annulerRas(c, champs) { champs.forEach(function (k) { if (c.rasPose[k]) { c[k] = ""; delete c.rasPose[k]; } }); }

  function rechercher(q) {
    q = String(q || "").trim();
    if (!q) return patients.slice();
    var chiffres = q.replace(/\D/g, "");
    var date = q.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/);
    return patients.filter(function (p) {
      if (date) {
        var y = date[3].length === 2 ? (Number(date[3]) > 30 ? "19" : "20") + date[3] : date[3];
        return p.ddn === y + "-" + ("0" + date[2]).slice(-2) + "-" + ("0" + date[1]).slice(-2);
      }
      if (chiffres.length >= 3 && chiffres.length === q.replace(/\s/g, "").length) return (p.dn || "").indexOf(chiffres) >= 0;
      var t = q.toUpperCase();
      return (p.nom + " " + p.prenom).toUpperCase().indexOf(t) >= 0 || (p.prenom + " " + p.nom).toUpperCase().indexOf(t) >= 0 || (p.nee || "").indexOf(t) >= 0;
    });
  }
  function doublon(nom, prenom, ddn) {
    return patients.filter(function (p) { return p.nom === String(nom).trim().toUpperCase() && p.prenom.toUpperCase() === String(prenom).trim().toUpperCase() && p.ddn === ddn; });
  }

  function dateFr(iso, long) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (long) return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return d.toLocaleDateString("fr-FR");
  }

  var consentementModele = {
    titre: "Information médicale sur l'anesthésie",
    paragraphes: [
      ["Pourquoi ce document", "Ce document vous informe sur l'anesthésie qui vous est proposée, ses bénéfices et ses risques. Lisez-le avant votre intervention ; le médecin anesthésiste répond à vos questions pendant la consultation. Le médecin qui vous endormira le jour de l'intervention ne sera pas forcément celui que vous avez vu en consultation."],
      ["Les types d'anesthésie", "L'anesthésie générale vous plonge dans un état proche du sommeil, par des médicaments injectés ou inhalés. L'anesthésie locorégionale (rachianesthésie, péridurale, bloc d'un membre) n'endort que la partie du corps opérée. Une anesthésie générale peut lui être associée si besoin."],
      ["La surveillance", "L'anesthésie se déroule avec un matériel vérifié avant chaque utilisation. Après l'intervention, vous êtes surveillé en salle de réveil par un personnel infirmier qualifié, sous la responsabilité d'un médecin anesthésiste."],
      ["Les risques", "Les nausées et vomissements au réveil sont moins fréquents qu'autrefois. Un mal de gorge passager peut suivre l'intubation ; signalez tout appareil ou fragilité dentaire. Les complications graves sont très rares. Le respect des consignes de jeûne réduit le risque d'inhalation."],
      ["La transfusion", "S'il est possible que vous soyez transfusé, vous recevrez une information spécifique."]
    ],
    consentement: "J'ai été informé(e) des bénéfices et des risques de l'anesthésie et j'ai pu poser mes questions. J'accepte les modifications de technique qui pourraient s'avérer nécessaires pendant l'intervention, ainsi que la transfusion de sang ou de dérivés sanguins jugée indispensable par le médecin anesthésiste. Ce document n'est pas une décharge de responsabilité."
  };

  var postOp = [
    "PERFALGAN 1 G / 6 H IV, RELAI PER OS DES QUE POSSIBLE",
    "ZOPHREN 4 MG / 8 H IV SI NAUSEES OU VOMISSEMENTS POST OPERATOIRES",
    "LOVENOX 0,4 ML / JOUR EN SC A PARTIR DE H + 8 POST OPERATOIRE",
    "SURVEILLANCE CONSTANTES : POULS, SPO2, TA",
    "REPRISE BOISSONS + ALIMENTATION + TRAITEMENT DES RETOUR EN CHAMBRE"
  ];

  // Motif tīfaifai : une feuille d'uru stylisée répétée huit fois autour du centre (géométrie exacte).
  function motif(taille, couleur) {
    var c = couleur || "var(--appl)";
    var feuille = "M0,-6 C6,-14 7,-24 3,-31 L6,-36 C2,-38 0,-44 0,-48 C0,-44 -2,-38 -6,-36 L-3,-31 C-7,-24 -6,-14 0,-6 Z";
    var g = "";
    for (var i = 0; i < 8; i++) g += '<path d="' + feuille + '" transform="rotate(' + (i * 45) + ')"/>';
    var bourgeon = "";
    for (var j = 0; j < 8; j++) bourgeon += '<circle cx="0" cy="-41" r="2.2" transform="rotate(' + (j * 45 + 22.5) + ')"/>';
    return '<svg class="motif" viewBox="-52 -52 104 104" width="' + (taille || 64) + '" height="' + (taille || 64) + '" aria-hidden="true" focusable="false">' +
      '<g fill="' + c + '">' + g + bourgeon + '<circle r="6.5"/></g>' +
      '<circle r="50" fill="none" stroke="' + c + '" stroke-width="1" stroke-dasharray="2.2 2.2" opacity="0.7"/></svg>';
  }

  // Icônes : trait de 1,75, même famille.
  var icones = {
    loupe: '<path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm5.3-2.2L21 21"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    imprimante: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
    alerte: '<path d="M12 3 2 20h20L12 3Zm0 6v5m0 3v.5"/>',
    coche: '<path d="m4 12.5 5 5L20 6.5"/>',
    retour: '<path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"/>',
    calendrier: '<path d="M4 6h16v14H4zM4 10h16M9 3v4m6-4v4"/>',
    personne: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0"/>',
    document: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6m-6 4h6"/>',
    crayon: '<path d="m4 20 1-5L16 4l4 4L9 19l-5 1Z"/>',
    chrono: '<path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12v4l3 2M9 2h6"/>',
    cadenas: '<path d="M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11"/>',
    fleche: '<path d="M5 12h14m-6-6 6 6-6 6"/>'
  };
  function icone(nom) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icones[nom] || "") + "</svg>"; }

  function echap(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]; }); }

  window.Preopia = {
    AUJOURDHUI: AUJOURDHUI, DEMAIN: DEMAIN, listes: listes, anesthesistes: anesthesistes, chirurgiens: chirurgiens,
    patients: patients, consultations: consultations, anterieures: anterieures, RAS: RAS, EPHEDRINE: EPHEDRINE,
    patient: patient, age: age, ageTexte: ageTexte, imc: imc, rappels: rappels, estOphtalmo: estOphtalmo,
    poserRas: poserRas, annulerRas: annulerRas, rechercher: rechercher, doublon: doublon, dateFr: dateFr,
    consentementModele: consentementModele, postOp: postOp, motif: motif, icone: icone, echap: echap, fiche: fiche
  };
})();

/* Ajouts pour les maquettes V1 et V2 (23/10/2026). Données FICTIVES.
   Rien de ce qui précède n'est modifié : ces ajouts étendent window.Preopia
   et posent des clés nouvelles sur les consultations, que A et B ignorent. */
(function () {
  "use strict";
  var P = window.Preopia;
  if (!P) return;
  var A = P.anesthesistes;

  // Catalogue d'actes (libellés de la base). cote : précision proposée ; freq : consultations
  // des douze derniers mois par site, FICTIVES, pour ordonner les puces « actes fréquents ».
  var COTE = {
    oeil: ["OEIL DROIT", "OEIL GAUCHE", "OEIL DROIT ET GAUCHE"],
    lateral: ["DROIT", "GAUCHE", "BILATERAL"]
  };
  var actes = [
    { nom: "CATARACTE", cote: "oeil", freq: { Cardella: 212, Mamao: 4 } },
    { nom: "CHOLECYSTECTOMIE", cote: null, freq: { Cardella: 96, Mamao: 41 } },
    { nom: "HERNIE INGUINALE", cote: "lateral", freq: { Cardella: 88, Mamao: 12 } },
    { nom: "ARTHROSCOPIE GENOU", cote: "lateral", freq: { Cardella: 74, Mamao: 38 } },
    { nom: "PROTHESE TOTALE DE HANCHE", cote: "lateral", freq: { Cardella: 61, Mamao: 3 } },
    { nom: "ADENOIDECTOMIE", cote: null, freq: { Cardella: 52, Mamao: 9 } },
    { nom: "FRACTURE POIGNET", cote: "lateral", freq: { Cardella: 47, Mamao: 6 } },
    { nom: "CANAL CARPIEN", cote: "lateral", freq: { Cardella: 44, Mamao: 2 } },
    { nom: "CESARIENNE", cote: null, profil: "obstetrique", freq: { Cardella: 0, Mamao: 118 } },
    { nom: "PERIDURALE", cote: null, profil: "obstetrique", freq: { Cardella: 0, Mamao: 164 } },
    { nom: "HYSTERECTOMIE", cote: null, freq: { Cardella: 11, Mamao: 57 } },
    { nom: "AMYGDALECTOMIE", cote: null, freq: { Cardella: 18, Mamao: 33 } },
    { nom: "COLOSCOPIE", cote: null, freq: { Cardella: 9, Mamao: 29 } },
    { nom: "VITRECTOMIE", cote: "oeil", freq: { Cardella: 21, Mamao: 22 } },
    { nom: "APPENDICECTOMIE", cote: null, freq: { Cardella: 17, Mamao: 14 } },
    { nom: "THYROIDECTOMIE", cote: null, freq: { Cardella: 13, Mamao: 5 } },
    { nom: "PROTHESE TOTALE DE GENOU", cote: "lateral", freq: { Cardella: 26, Mamao: 1 } },
    { nom: "CAPSULECTOMIE", cote: "oeil", freq: { Cardella: 8, Mamao: 0 } },
    { nom: "REPOSITIONNEMENT IMPLANT", cote: "oeil", freq: { Cardella: 3, Mamao: 0 } },
    { nom: "NEPHRECTOMIE", cote: "lateral", freq: { Cardella: 4, Mamao: 0 } }
  ];
  function acte(nom) {
    var n = String(nom || "").trim().toUpperCase();
    for (var i = 0; i < actes.length; i++) if (actes[i].nom === n) return actes[i];
    return null;
  }
  function actesFrequents(site, max) {
    return actes.filter(function (a) { return (a.freq[site] || 0) > 0; })
      .sort(function (a, b) { return (b.freq[site] || 0) - (a.freq[site] || 0); })
      .slice(0, max || 8);
  }

  // Profils de consultation et règles d'affichage « en table » (champ, opérateur, valeur, groupe affiché).
  var profils = [
    { k: "adulte", lib: "Adulte" },
    { k: "obstetrique", lib: "Obstétrique" },
    { k: "pediatrie", lib: "Pédiatrie" }
  ];
  var affichage = [
    { groupe: "pediatrie", champ: "profil", op: "=", valeur: "pediatrie", texte: "affiché car profil pédiatrie" },
    { groupe: "pediatrie", champ: "age", op: "<", valeur: 18, texte: "affiché car patient mineur" },
    { groupe: "obstetrique", champ: "profil", op: "=", valeur: "obstetrique", texte: "affiché car profil obstétrique" },
    { groupe: "grossesses", champ: "sexe", op: "=", valeur: "F", texte: "affiché car patiente" }
  ];

  // Comorbidités groupées par appareil. Les valeurs marquées ajout:true ne sont pas dans la liste
  // FileMaker : exemples de la maquette, liste à valider par l'équipe.
  var comorbidites = [
    { k: "cardio", lib: "Cardiovasculaire", items: ["HTA", "INFARCTUS", "INSUFFISANCE CARDIAQUE"], ajouts: ["TROUBLE DU RYTHME", "VALVULOPATHIE"] },
    { k: "respi", lib: "Respiratoire et voies aériennes", items: ["ASTHME", "BPCO"], ajouts: ["SAOS"] },
    { k: "neuro", lib: "Neurologique", items: ["AVC"], ajouts: ["EPILEPSIE"] },
    { k: "metab", lib: "Métabolique et rénal", items: ["DIABETE ID", "DIABETE NID", "HYPERCHOLESTEROLEMIE", "HYPOTHYROIDIE", "HYPERTHYROIDIE"], ajouts: ["INSUFFISANCE RENALE"] },
    { k: "hemo", lib: "Hémostase", items: [], ajouts: ["TROUBLE DE L'HEMOSTASE CONNU", "ANTECEDENT THROMBO-EMBOLIQUE"] },
    { k: "autres", lib: "Autres", items: ["HEPATITE VIRALE", "ARTHROSE CERVICALE"], ajouts: [] }
  ];

  // Anciens dossiers repris de la base FileMaker (fictifs), pour la chronologie et le bandeau « patient connu ».
  var historique = {
    p02: [
      { date: "2008-06-02", dossier: "FM-2008-0602", intervention: "APPENDICECTOMIE", anesthesiste: A[2], anesthesie: "AG", allergies: "NON CONNUES" },
      { date: "2019-03-11", dossier: "FM-2019-0311", intervention: "ANGIOPLASTIE CORONAIRE", anesthesiste: A[1], anesthesie: "AG", allergies: "PENICILLINE" }
    ],
    p06: [
      { date: "2024-05-06", dossier: "FM-2024-0506", intervention: "CATARACTE OEIL DROIT", anesthesiste: A[3], anesthesie: "AMAC", allergies: "IODE",
        incidents: ["AGITATION AU REVEIL"] }
    ],
    // Ancien dossier avec intubation difficile : patiente de la liste de demain (HYSTERECTOMIE, Mamao).
    p07: [
      { date: "2021-09-20", dossier: "FM-2021-0920", intervention: "CHOLECYSTECTOMIE", anesthesiste: A[2], anesthesie: "AG", allergies: "NON CONNUES",
        mallampati: "III", intubation: "INTUBATION DIFFICILE", incidents: ["INTUBATION DIFFICILE"] }
    ],
    p11: [
      { date: "2023-01-17", dossier: "FM-2023-0117", intervention: "PROSTATECTOMIE", anesthesiste: A[1], anesthesie: "AG", allergies: "NON CONNUES" }
    ]
  };

  // Anesthésie prévue : valeurs reprises de la liste « conclusion » de la base (AG, RA, APD, AMAC).
  P.listes.anesthesie = ["AG", "RA", "APD", "AMAC"];

  // Clés nouvelles sur les consultations de démonstration : heure de convocation (organisation, fictive),
  // anesthésie prévue (lue dans la conclusion quand elle la porte), plan des traitements.
  var ajouts = {
    c01: { convocation: "06:30", anesthesie: "AG" },
    c02: { convocation: "06:30", anesthesie: "AG" },
    c03: { convocation: "07:00" },
    c04: { convocation: "07:30" },
    c05: { convocation: "08:00", anesthesie: "AMAC" },
    c06: { convocation: "08:30" },
    c07: { convocation: "06:30", plan: { LEVOTHYROX: { choix: "continuer", confirme: true } } },
    c08: { convocation: "09:00" }
  };
  P.consultations.forEach(function (c) {
    var a = ajouts[c.id];
    if (!a) return;
    for (var k in a) c[k] = a[k];
  });

  P.COTE = COTE;
  P.actes = actes;
  P.acte = acte;
  P.actesFrequents = actesFrequents;
  P.profils = profils;
  P.affichage = affichage;
  P.comorbidites = comorbidites;
  P.historique = historique;
})();

/* Ajouts pour la maquette V2 (23/10/2026). Données FICTIVES, rangées sous window.Preopia.v2 :
   A, B et V1 ne les lisent pas. La V2 ajoute elle-même la consultation c11 au démarrage. */
(function () {
  "use strict";
  var P = window.Preopia;
  if (!P) return;
  var A = P.anesthesistes, C = P.chirurgiens;

  // Questionnaire patient (V2-02) : une question par écran, réponses oui, non, je ne sais pas.
  // signale : la réponse qui se reporte dans le compte rendu d'arrivée (« oui » par défaut).
  var questions = [
    { id: "q1", n: 1, systeme: "Cœur et vaisseaux", fr: "Avez-vous une tension artérielle trop élevée, connue ou traitée ?", en: "Do you have high blood pressure, known or treated?", precision: true },
    { id: "q2", n: 2, systeme: "Cœur et vaisseaux", fr: "Avez-vous une douleur dans la poitrine pendant un effort ?", en: "Do you get chest pain when you exert yourself?" },
    { id: "q3", n: 3, systeme: "Cœur et vaisseaux", fr: "Pouvez-vous monter deux étages sans vous arrêter ?", en: "Can you climb two flights of stairs without stopping?", signale: "non" },
    { id: "q4", n: 4, systeme: "Respiration", fr: "Avez-vous de l'asthme ou une bronchite chronique ?", en: "Do you have asthma or chronic bronchitis?" },
    { id: "q5", n: 5, systeme: "Sommeil", fr: "Ronflez-vous fort, au point d'être entendu à travers une porte fermée ?", en: "Do you snore loudly, loud enough to be heard through a closed door?" },
    { id: "q6", n: 6, systeme: "Sommeil", fr: "Vous sentez-vous souvent fatigué ou somnolent pendant la journée ?", en: "Do you often feel tired or sleepy during the day?" },
    { id: "q7", n: 7, systeme: "Sommeil", fr: "Quelqu'un a-t-il remarqué que vous arrêtiez de respirer pendant votre sommeil ?", en: "Has anyone noticed that you stop breathing during your sleep?" },
    { id: "q8", n: 8, systeme: "Anesthésies passées", fr: "Avez-vous déjà eu un problème lors d'une anesthésie ?", en: "Have you ever had a problem with an anaesthetic?", precision: true },
    { id: "q9", n: 9, systeme: "Anesthésies passées", fr: "Avez-vous eu des nausées ou des vomissements après une anesthésie ?", en: "Have you had nausea or vomiting after an anaesthetic?" },
    { id: "q10", n: 10, systeme: "Anesthésies passées", fr: "Avez-vous le mal des transports ?", en: "Do you get travel sickness?" },
    { id: "q11", n: 11, systeme: "Saignement", fr: "Saignez-vous longtemps après une coupure ou un soin dentaire ?", en: "Do you bleed for a long time after a cut or dental care?" },
    { id: "q12", n: 12, systeme: "Traitements", fr: "Prenez-vous un médicament pour fluidifier le sang ?", en: "Do you take a medicine that thins the blood?", precision: true },
    { id: "q13", n: 13, systeme: "Allergies", fr: "Êtes-vous allergique à un médicament ?", en: "Are you allergic to any medicine?", precision: true },
    { id: "q14", n: 14, systeme: "Tabac", fr: "Fumez-vous actuellement ?", en: "Do you smoke at the moment?" },
    { id: "q15", n: 15, systeme: "Dents", fr: "Avez-vous des dents fragiles ou mobiles, ou une prothèse dentaire ?", en: "Do you have fragile or loose teeth, or dentures?" }
  ];
  function rep(chaine, precisions) {
    // chaine : 15 lettres, o = oui, n = non, ? = je ne sais pas, . = sans réponse
    var r = {}, m = { o: "oui", n: "non", "?": "nsp" };
    chaine.split("").forEach(function (x, i) { if (m[x]) r["q" + (i + 1)] = m[x]; });
    for (var k in (precisions || {})) r[k + "-precision"] = precisions[k];
    return r;
  }
  // État du questionnaire par consultation (V2-03). recu : date et heure de Tahiti.
  var questionnaires = {
    c01: { etat: "recu", envoye: "2026-10-14T09:10", recu: "2026-10-16T20:14", langue: "fr", reponses: rep("nnonnnnnnnnnnnn") },
    c02: { etat: "envoye", envoye: "2026-10-15T08:30", langue: "fr", reponses: {} },
    c03: { etat: "recu", envoye: "2026-10-12T10:05", recu: "2026-10-13T21:40", langue: "fr", reponses: rep("nnonnnnnnnn??nn") },
    c04: { etat: "encours", envoye: "2026-10-16T11:00", langue: "fr", reponses: rep("nnonnn") },
    c05: { etat: "envoye", envoye: "2026-10-17T09:45", langue: "fr", reponses: {} },
    c06: { etat: "recu", envoye: "2026-10-13T14:20", recu: "2026-10-14T07:02", langue: "fr", reponses: rep("nnonoo?nnnnnnnn") },
    c07: { etat: "recu", envoye: "2026-10-10T09:00", recu: "2026-10-11T18:30", langue: "fr", reponses: rep("nnonnnnonnnnnnn", { q8: "intubation difficile en 2021, on me l'a dit au réveil" }) },
    c08: { etat: "non-envoye", langue: "fr", reponses: {} },
    c09: { etat: "non-envoye", langue: "fr", reponses: {} },
    c10: { etat: "non-envoye", langue: "en", reponses: {} },
    c11: { etat: "recu", envoye: "2026-10-17T10:00", recu: "2026-10-18T19:42", langue: "fr",
      reponses: rep("ononoo?nonnonnn", { q1: "AMLOR", q12: "KARDEGIC 75 mg, un sachet par jour" }) }
  };

  // Consultation propre à la V2 : patient connu (dossier de 2023), questionnaire reçu, CPA à faire (D-02).
  var consultationsV2 = [
    P.fiche({ id: "c11", patient: "p11", intervention: "CHOLECYSTECTOMIE", dateInt: "2026-10-27", heure: "08:00", convocation: "06:30", chirurgien: C[0], anesthesiste: A[0], site: "Cardella",
      poids: "98", taille: "172", ta: "14/8", pouls: "76", traitements: "AMLOR, KARDEGIC", allergies: "NON CONNUES",
      docs: { consultation: "a-faire", consignes: "a-faire", consentement: "a-faire" } })
  ];

  // Détail d'anciens dossiers repris de la base FileMaker (fictifs), cités par la pré-évaluation (D-02).
  var dossiersDetail = {
    "FM-2023-0117": { patient: "p11", date: "2023-01-17", intervention: "PROSTATECTOMIE", anesthesie: "AG", anesthesiste: A[1], asa: "II",
      atcdMed: "HTA", traitements: "AMLOR", allergies: "NON CONNUES", mallampati: "II", intubation: "RAS", conclusion: "HOSPIT/ AG / INFOS DONNEES" }
  };

  // Pré-évaluation d'EXEMPLE (D-02) écrite pour la maquette, pour le seul patient fictif c11.
  // Chaque phrase porte ses sources (s) ; une phrase sans source est écartée par construction.
  var preEvaluation = {
    c11: {
      modele: "modèle de démonstration, version demo-0.0 (fictive : aucun modèle n'est appelé dans la maquette)",
      genere: "2026-10-19T06:40",
      paragraphes: [
        { titre: "Intervention et terrain", phrases: [
          { t: "Homme de 60 ans, convoqué le 27/10/2026 pour une cholécystectomie à Cardella.", s: [{ type: "fiche", champ: "intervention" }, { type: "patient", champ: "ddn" }] },
          { t: "Hypertension artérielle déclarée, traitée par AMLOR.", s: [{ type: "q", id: "q1" }, { type: "ancien", dossier: "FM-2023-0117", champ: "atcdMed" }] },
          { t: "Poids 98 kg pour 1,72 m, soit un IMC de 33,13.", s: [{ type: "fiche", champ: "poids" }, { type: "fiche", champ: "taille" }] }
        ] },
        { titre: "Anesthésies antérieures", phrases: [
          { t: "Prostatectomie sous anesthésie générale le 17/01/2023 ; intubation notée RAS, Mallampati II.", s: [{ type: "ancien", dossier: "FM-2023-0117" }] },
          { t: "Nausées ou vomissements après une anesthésie, déclarés au questionnaire.", s: [{ type: "q", id: "q9" }] },
          { t: "Aucun problème d'anesthésie signalé par le patient.", s: [{ type: "q", id: "q8" }] }
        ] },
        { titre: "Sommeil", phrases: [
          { t: "Ronflement fort et somnolence diurne déclarés.", s: [{ type: "q", id: "q5" }, { type: "q", id: "q6" }] },
          { t: "Arrêts respiratoires pendant le sommeil : le patient ne sait pas.", s: [{ type: "q", id: "q7" }] }
        ] },
        { titre: "Traitements et saignement", phrases: [
          { t: "Déclare prendre KARDEGIC 75 mg, un sachet par jour ; l'indication n'est pas précisée.", s: [{ type: "q", id: "q12" }] },
          { t: "Pas de saignement prolongé déclaré.", s: [{ type: "q", id: "q11" }] },
          { t: "Patient coopérant et bien informé.", s: [] }
        ] },
        { titre: "À clarifier en consultation", phrases: [
          { t: "Indication du KARDEGIC à préciser.", s: [{ type: "q", id: "q12" }] },
          { t: "Apnées du sommeil à préciser ; tour de cou non mesuré.", s: [{ type: "q", id: "q7" }, { type: "fiche", champ: "tourCou" }] }
        ] }
      ]
    }
  };

  // Ordonnance d'exemple lue (V2-01) et référentiel FICTIF de la maquette (nom commercial → substance).
  var referentiel = {
    nom: "référentiel de démonstration (fictif)",
    entrees: {
      SINTROM: "acénocoumarol", KARDEGIC: "acétylsalicylate de lysine", LOVENOX: "énoxaparine sodique",
      COVERSYL: "périndopril", GLUCOPHAGE: "metformine", LASILIX: "furosémide", AMLOR: "amlodipine", LEVOTHYROX: "lévothyroxine"
    }
  };
  var ordonnanceExemple = {
    fichier: "ordonnance-exemple.jpg (fictive)",
    lignes: [
      { lu: "SINTROM 4 mg", molecule: "SINTROM", dose: "4 mg", posologie: "1/2 comprimé le soir" },
      { lu: "COVERSYL 5 mg", molecule: "COVERSYL", dose: "5 mg", posologie: "1 comprimé le matin" },
      { lu: "GLUCOPHAGE 1000 mg", molecule: "GLUCOPHAGE", dose: "1000 mg", posologie: "1 comprimé matin et soir" },
      { lu: "KARDEGIC 75 mg", molecule: "KARDEGIC", dose: "75 mg", posologie: "1 sachet par jour" },
      { lu: "LASlLIX 40 mg", molecule: "LASILIX", dose: "40 mg", posologie: "1 comprimé le matin", douteux: "lecture incertaine : « LASlLIX »" }
    ]
  };

  // Programme opératoire à importer (V2-10) : export FICTIF du planning de bloc.
  var programme = {
    fichier: "programme-bloc-20-10-2026.csv",
    origine: "export fictif du planning de bloc (séparateur point-virgule)",
    colonnes: ["DATE", "HEURE", "NOM", "PRENOM", "NAISSANCE", "SEXE", "DN", "ACTE", "COTE", "OPERATEUR", "SITE", "SALLE"],
    appariement: { DATE: "dateInt", HEURE: "heure", NOM: "nom", PRENOM: "prenom", NAISSANCE: "ddn", SEXE: "sexe", DN: "dn", ACTE: "intervention", COTE: "precision", OPERATEUR: "chirurgien", SITE: "site", SALLE: "" },
    lignes: [
      ["20/10/2026", "11:00", "TAUTU", "Heiarii", "27/08/2001", "M", "0002234", "CANAL CARPIEN", "DROIT", "Dr C. Blanchard", "Cardella", "2"],
      ["20/10/2026", "11:30", "MAMATUI", "Rava", "18/04/1990", "F", "0003456", "AMYGDALECTOMIE", "", "Dr M. Hapairai", "Mamao", "1"],
      ["20/10/2026", "12:00", "GIRAUD", "Paul", "11/02/1958", "M", "0003789", "COLOSCOPIE", "", "Dr S. Faure", "Mamao", "1"]
    ]
  };

  // VPA du jour J (V2-09) : arrivée, jeûne déclaré, changements depuis la CPA. FICTIF.
  var vpa = {
    c01: { arrivee: "06:25", repas: "2026-10-19T21:30", boisson: "2026-10-20T04:15", changements: [], examens: [] },
    c02: { arrivee: "06:35", repas: "2026-10-20T01:00", boisson: "2026-10-20T05:00",
      changements: [{ type: "Traitement", texte: "SINTROM : dernière prise déclarée le vendredi 16/10/2026", source: "déclaré à l'arrivée, noté par l'IDE d'accueil à 06:40" }],
      examens: ["INR de la veille : résultat non reçu dans le dossier"] },
    c06: { arrivee: "08:20", repas: "2026-10-20T00:15", boisson: "2026-10-20T06:10",
      changements: [{ type: "Allergie", texte: "LATEX, urticaire : nouvelle déclaration", source: "déclaré à l'arrivée, noté par l'IDE d'accueil à 08:24" }], examens: [] }
  };

  // Bloc (V2-12, V2-13, aperçu) : feuille per-op et SSPI d'un patient de demain. FICTIF, sans dose.
  var bloc = {
    c01: {
      salle: "Salle 2, Cardella",
      etapes: ["Entrée en salle", "Induction", "Incision", "Fin d'intervention", "Sortie de salle"],
      evenements: [
        { cat: "evenements", h: "07:31", lib: "Entrée en salle" },
        { cat: "evenements", h: "07:38", lib: "Induction" },
        { cat: "ventilation", h: "07:39", lib: "Ventilation au masque" },
        { cat: "ventilation", h: "07:42", lib: "Intubation, ventilation contrôlée" },
        { cat: "evenements", h: "07:55", lib: "Incision" }
      ],
      sspi: {
        entree: "09:05",
        exceptions: [{ h: "09:20", lib: "Nausées signalées", qui: "IDE de SSPI" }],
        criteres: ["Conscience", "Respiration", "Hémodynamique", "Douleur", "Nausées et vomissements", "Pansement et saignement"]
      }
    }
  };

  // Activité (V2-14, aperçu) : carnet du 1er au 19/10/2026. CHIFFRES FICTIFS.
  var activite = {
    periode: "du 1er au 19 octobre 2026",
    lignes: [
      { anesthesiste: A[0], site: "Cardella", interventions: 58, cpa: 71, vpa: 55, complets: 66 },
      { anesthesiste: A[0], site: "Mamao", interventions: 9, cpa: 12, vpa: 9, complets: 11 },
      { anesthesiste: A[1], site: "Cardella", interventions: 47, cpa: 52, vpa: 46, complets: 45 },
      { anesthesiste: A[2], site: "Mamao", interventions: 61, cpa: 66, vpa: 60, complets: 64 },
      { anesthesiste: A[3], site: "Cardella", interventions: 39, cpa: 44, vpa: 37, complets: 38 },
      { anesthesiste: A[3], site: "Mamao", interventions: 14, cpa: 15, vpa: 14, complets: 15 }
    ]
  };

  P.v2 = {
    questions: questions, questionnaires: questionnaires, consultationsV2: consultationsV2, dossiersDetail: dossiersDetail,
    preEvaluation: preEvaluation, referentiel: referentiel, ordonnanceExemple: ordonnanceExemple, programme: programme,
    vpa: vpa, bloc: bloc, activite: activite
  };
})();
