"use client";

import { useEffect } from "react";
import Script from "next/script";

export function CookieConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;

    // Configuration Tarteaucitron
    if (typeof window !== "undefined" && (window as any).tarteaucitron) {
      (window as any).tarteaucitron.init({
        // Paramètres de confidentialité
        privacyUrl: "/privacy", // URL de votre politique de confidentialité

        // Position de la bannière
        orientation: "bottom", // Position : "top" ou "bottom"

        // Comportement
        groupServices: false, // Regrouper les services par catégorie
        showAlertSmall: true, // Afficher la petite alerte en bas à droite
        cookieslist: true, // Afficher la liste des cookies
        closePopup: false, // Fermer la popup avec le bouton X
        showIcon: true, // Afficher l'icône de gestion des cookies

        // Apparence
        adblocker: false, // Afficher un message si adblock est détecté
        DenyAllCta: true, // Afficher le bouton "Tout refuser"
        AcceptAllCta: true, // Afficher le bouton "Tout accepter"
        highPrivacy: true, // Désactiver tous les services par défaut
        handleBrowserDNTRequest: false, // Respecter le Do Not Track du navigateur

        // Textes personnalisés
        removeCredit: false, // Supprimer le crédit Tarteaucitron
        moreInfoLink: true, // Afficher le lien "En savoir plus"
        useExternalCss: false, // Utiliser un CSS externe
        useExternalJs: false, // Utiliser un JS externe

        // Durée de vie du consentement (en jours)
        cookieDomain: ".medicastudio.fr", // Domaine pour les cookies

        // Services à charger
        readmoreLink: "/privacy", // Lien "En savoir plus"
        mandatory: false, // Forcer l'acceptation
      });

      // Ajouter le service Google Analytics (gtag)
      (window as any).tarteaucitron.user.gtagUa = measurementId;
      ((window as any).tarteaucitron.job = (window as any).tarteaucitron.job || []).push("gtag");
    }
  }, [measurementId]);

  if (!measurementId) return null;

  return (
    <Script
      id="tarteaucitron"
      src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@latest/tarteaucitron.min.js"
      strategy="afterInteractive"
    />
  );
}
