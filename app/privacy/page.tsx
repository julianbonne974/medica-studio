import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Medica Studio",
  description: "Politique de confidentialité et protection des données personnelles",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-8 py-24">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
          {/* Introduction */}
          <section>
            <p className="mb-4">
              OPTIMA SANTE SOLUTIONS, éditeur du site <strong>medicastudio.com</strong>, accorde une grande importance
              à la protection de vos données personnelles et au respect de votre vie privée.
            </p>
            <p>
              La présente politique de confidentialité a pour objectif de vous informer de la manière dont nous collectons,
              utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi Informatique et Libertés.
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              1. Responsable du traitement des données
            </h2>
            <p className="mb-2">Le responsable du traitement des données personnelles est :</p>
            <div className="ml-4 space-y-1">
              <p><strong>OPTIMA SANTE SOLUTIONS</strong></p>
              <p>SARL unipersonnelle au capital social de 100 €</p>
              <p>Siège social : 9 rue des Colonnes, 75002 Paris</p>
              <p>SIRET : 951 404 854</p>
              <p>Email : <a href="mailto:julianbonne@optimasantesolutions.com" className="text-[#059669] hover:underline">julianbonne@optimasantesolutions.com</a></p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              2. Données personnelles collectées
            </h2>
            <p className="mb-4">Nous collectons les données personnelles suivantes :</p>

            <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              2.1 Formulaire de contact et newsletter
            </h3>
            <ul className="mb-4 ml-6 list-disc space-y-1">
              <li>Adresse email</li>
              <li>Nom et prénom (si fournis)</li>
              <li>Message (formulaire de contact)</li>
            </ul>

            <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              2.2 Données de navigation
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Adresse IP</li>
              <li>Type et version du navigateur</li>
              <li>Pages visitées et durée de visite</li>
              <li>Données de localisation approximative (pays, ville)</li>
              <li>Données techniques de connexion</li>
            </ul>
          </section>

          {/* Finalités du traitement */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              3. Finalités du traitement
            </h2>
            <p className="mb-3">Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Gestion des demandes de contact :</strong> Traiter vos demandes d'information et y répondre
              </li>
              <li>
                <strong>Newsletter :</strong> Vous envoyer notre newsletter et nos actualités (avec votre consentement préalable)
              </li>
              <li>
                <strong>Amélioration du site :</strong> Analyser l'utilisation du site pour en améliorer les fonctionnalités et le contenu
              </li>
              <li>
                <strong>Statistiques :</strong> Mesurer l'audience et analyser le comportement des visiteurs de manière anonymisée
              </li>
              <li>
                <strong>Sécurité :</strong> Détecter et prévenir les fraudes et abus
              </li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              4. Base légale du traitement
            </h2>
            <p className="mb-3">Le traitement de vos données repose sur :</p>
            <ul className="ml-6 list-disc space-y-1">
              <li><strong>Votre consentement</strong> pour l'envoi de la newsletter</li>
              <li><strong>Notre intérêt légitime</strong> pour l'amélioration du site et les statistiques</li>
              <li><strong>L'exécution d'un contrat</strong> ou de mesures précontractuelles pour les demandes de devis/contact</li>
            </ul>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              5. Destinataires des données
            </h2>
            <p className="mb-3">Vos données personnelles sont destinées aux services internes de OPTIMA SANTE SOLUTIONS.</p>
            <p className="mb-3">Nous pouvons également partager vos données avec les prestataires suivants :</p>
            <ul className="ml-6 list-disc space-y-1">
              <li><strong>Netlify</strong> (hébergement du site) - États-Unis</li>
              <li><strong>Plausible Analytics</strong> (statistiques anonymisées du site) - Union Européenne</li>
            </ul>
            <p className="mt-3">
              Ces prestataires agissent en tant que sous-traitants et sont contractuellement tenus de garantir la sécurité
              et la confidentialité de vos données.
            </p>
          </section>

          {/* Transfert hors UE */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              6. Transfert de données hors de l'Union Européenne
            </h2>
            <p className="mb-3">
              Certaines de vos données peuvent être transférées vers des pays situés en dehors de l'Union Européenne,
              notamment les États-Unis (hébergement Netlify).
            </p>
            <p>
              Ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types,
              mécanismes de certification).
            </p>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              7. Durée de conservation des données
            </h2>
            <p className="mb-3">Vos données sont conservées pendant les durées suivantes :</p>
            <ul className="ml-6 list-disc space-y-1">
              <li><strong>Newsletter :</strong> Jusqu'à votre désinscription ou 3 ans d'inactivité</li>
              <li><strong>Demandes de contact :</strong> 3 ans à compter de la dernière interaction</li>
              <li><strong>Données de navigation :</strong> 13 mois (cookies) ou anonymisées immédiatement (Plausible)</li>
            </ul>
            <p className="mt-3">
              À l'issue de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.
            </p>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              8. Vos droits
            </h2>
            <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul className="ml-6 list-disc space-y-2">
              <li><strong>Droit d'accès :</strong> Obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
              <li><strong>Droit de rectification :</strong> Corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données dans certains cas</li>
              <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données dans certaines situations</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données pour des raisons légitimes</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et les transmettre à un autre responsable</li>
              <li><strong>Droit de retirer votre consentement :</strong> Pour les traitements basés sur le consentement (newsletter)</li>
            </ul>
            <p className="mt-4">
              Pour exercer vos droits, contactez-nous à l'adresse email :{" "}
              <a href="mailto:julianbonne@optimasantesolutions.com" className="text-[#059669] hover:underline">
                julianbonne@optimasantesolutions.com
              </a>
            </p>
            <p className="mt-3">
              Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés)
              si vous estimez que vos droits ne sont pas respectés :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#059669] hover:underline">
                www.cnil.fr
              </a>
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              9. Sécurité des données
            </h2>
            <p className="mb-3">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              personnelles contre la destruction, la perte, l'altération, la divulgation non autorisée ou l'accès non autorisé.
            </p>
            <p>
              Ces mesures incluent notamment : chiffrement HTTPS, hébergement sécurisé, accès restreint aux données,
              sauvegardes régulières.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              10. Cookies et traceurs
            </h2>
            <p className="mb-3">
              Le site utilise des cookies et traceurs pour améliorer votre expérience de navigation et analyser l'audience.
            </p>

            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Cookies utilisés :
            </h3>
            <ul className="mb-4 ml-6 list-disc space-y-1">
              <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site (préférences thème dark/light)</li>
              <li><strong>Cookies analytiques :</strong> Plausible Analytics (respect de la vie privée, pas de consentement requis selon la CNIL)</li>
            </ul>

            <p className="mb-3">
              Plausible Analytics est un outil d'analyse respectueux de la vie privée qui :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Ne collecte aucune donnée personnelle</li>
              <li>N'utilise pas de cookies</li>
              <li>Anonymise les adresses IP</li>
              <li>Est conforme RGPD sans nécessiter de bandeau de consentement</li>
            </ul>

            <p className="mt-3">
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti de leur dépôt.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              11. Modifications de la politique de confidentialité
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification
              sera publiée sur cette page avec une nouvelle date de mise à jour. Nous vous encourageons à consulter
              régulièrement cette page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              12. Contact
            </h2>
            <p className="mb-2">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles,
              vous pouvez nous contacter :
            </p>
            <div className="ml-4 space-y-1">
              <p>Par email : <a href="mailto:julianbonne@optimasantesolutions.com" className="text-[#059669] hover:underline">julianbonne@optimasantesolutions.com</a></p>
              <p>Par courrier : OPTIMA SANTE SOLUTIONS - 9 rue des Colonnes, 75002 Paris</p>
            </div>
          </section>

          {/* Dernière mise à jour */}
          <section className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <p className="text-sm italic">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
