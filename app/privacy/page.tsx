import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et gestion des cookies de Medica Studio",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-24">
      <h1 className="mb-8 text-4xl font-bold tracking-tight dark:text-zinc-100">
        Politique de confidentialité
      </h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Dernière mise à jour : 7 octobre 2025
        </p>

        <h2 className="mt-8 text-2xl font-bold dark:text-zinc-100">Collecte des données</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Medica Studio utilise Google Analytics pour analyser l'utilisation de notre site web.
          Nous collectons des données anonymisées sur votre navigation pour améliorer nos services.
        </p>

        <h2 className="mt-8 text-2xl font-bold dark:text-zinc-100">Cookies utilisés</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Notre site utilise les cookies suivants :</p>
        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400">
          <li>
            <strong>Google Analytics</strong> : Cookies analytiques pour mesurer l'audience
            (nombre de visiteurs, pages consultées, durée de visite)
          </li>
          <li>
            <strong>Tarteaucitron</strong> : Cookie de consentement pour mémoriser vos choix
            concernant les cookies
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold dark:text-zinc-100">Vos droits</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
          suppression de vos données personnelles. Vous pouvez gérer vos préférences de cookies
          à tout moment en cliquant sur l'icône en bas à gauche de votre écran.
        </p>

        <h2 className="mt-8 text-2xl font-bold dark:text-zinc-100">Données collectées par Google Analytics</h2>
        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400">
          <li>Pages visitées</li>
          <li>Durée de la visite</li>
          <li>Type d'appareil (mobile, tablette, ordinateur)</li>
          <li>Localisation géographique approximative (ville, pays)</li>
          <li>Source de trafic (moteur de recherche, lien direct, etc.)</li>
        </ul>

        <p className="mt-8 text-zinc-600 dark:text-zinc-400">
          Aucune donnée personnelle identifiable (nom, email, adresse) n'est collectée sans votre
          consentement explicite.
        </p>

        <h2 className="mt-8 text-2xl font-bold dark:text-zinc-100">Contact</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Pour toute question concernant cette politique de confidentialité, vous pouvez nous
          contacter via notre{" "}
          <a href="/contact" className="text-emerald-600 hover:underline">
            formulaire de contact
          </a>
          .
        </p>
      </div>
    </div>
  );
}
