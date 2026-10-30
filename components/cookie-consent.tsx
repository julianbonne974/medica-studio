"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as CookieConsentLib from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import Script from "next/script";

function estEspaceClients(chemin: string | null) {
  return chemin === "/clients" || Boolean(chemin?.startsWith("/clients/"));
}

export function CookieConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  // Espace clients (/clients) : aucune mesure d'audience, même si elle a été acceptée ailleurs
  // sur le site (désactivation officielle de gtag par la variable ga-disable-<ID>).
  useEffect(() => {
    if (!measurementId) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] =
      estEspaceClients(pathname);
  }, [pathname, measurementId]);

  useEffect(() => {
    CookieConsentLib.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
      },

      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Nous utilisons des cookies",
              description:
                "Ce site utilise des cookies essentiels pour son fonctionnement et des cookies analytiques pour comprendre comment vous l'utilisez.",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout rejeter",
              showPreferencesBtn: "Gérer mes préférences",
            },
            preferencesModal: {
              title: "Préférences de cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout rejeter",
              savePreferencesBtn: "Enregistrer les préférences",
              closeIconLabel: "Fermer",
              sections: [
                {
                  title: "Utilisation des cookies",
                  description:
                    "Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez choisir les catégories de cookies que vous souhaitez autoriser.",
                },
                {
                  title: "Cookies strictement nécessaires",
                  description:
                    "Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés. Dans l'espace client (/clients), un cookie de session strictement nécessaire garde votre connexion et votre prénom pendant 30 jours ; il se supprime à la déconnexion.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies analytiques",
                  description:
                    "Ces cookies nous permettent de mesurer l'audience et d'améliorer notre site.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },

      onConsent: () => {
        if (CookieConsentLib.acceptedCategory("analytics")) {
          loadGoogleAnalytics();
        }
      },

      onChange: () => {
        if (CookieConsentLib.acceptedCategory("analytics")) {
          loadGoogleAnalytics();
        }
      },
    });
  }, []);

  const loadGoogleAnalytics = () => {
    if (!measurementId || window.gtag || estEspaceClients(window.location.pathname)) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const dataLayer = window.dataLayer ?? [];
      window.dataLayer = dataLayer;
      const gtag = (...args: any[]) => {
        dataLayer.push(args);
      };
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", measurementId, {
        page_path: window.location.pathname,
      });
    };
  };

  if (!measurementId) {
    return null;
  }

  return null;
}
