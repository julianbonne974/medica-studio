import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://medicastudio.com";
const SITE_NAME = "Medica Studio";
const SITE_DESCRIPTION =
  "Studio de développement spécialisé santé : applications SaaS, CRM médicaux, plateformes de cybersécurité pour ESMS et outils fiscaux pour professionnels de santé. Architectures HDS, conformité RGPD, référentiels HAS 2025 / CaRE / HDS 2.0.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Studio de développement santé, HDS et conformité`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "Julian Bonne", url: "https://fr.linkedin.com/in/julian-bonne-bb4a75172" }],
  creator: "Julian Bonne",
  publisher: SITE_NAME,
  keywords: [
    "studio développement santé",
    "développement médical",
    "SaaS santé",
    "HDS",
    "hébergement données de santé",
    "RGPD santé",
    "HAS 2025",
    "CaRE",
    "HDS 2.0",
    "CRM médical",
    "CRM recrutement médical",
    "EVASAN",
    "évacuation sanitaire",
    "cybersécurité médico-sociale",
    "cybersécurité EHPAD",
    "simulateur fiscal médecin",
    "URSSAF CARMF",
    "Next.js santé",
    "Firebase HDS",
    "tRPC",
    "PostgreSQL HDS",
    "Flutter médical",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Studio de développement santé, HDS et conformité`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Studio de développement santé`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Studio de développement santé`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description: SITE_DESCRIPTION,
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}#founder`,
        name: "Julian Bonne",
      },
      sameAs: ["https://fr.linkedin.com/in/julian-bonne-bb4a75172"],
      areaServed: "FR",
      knowsAbout: [
        "Hébergement de données de santé (HDS)",
        "Conformité RGPD santé",
        "Référentiels HAS 2025 / CaRE / HDS 2.0",
        "Développement SaaS médical",
        "CRM médicaux",
        "Cybersécurité médico-sociale",
        "Fiscalité des professionnels de santé",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#founder`,
      name: "Julian Bonne",
      jobTitle: "Associé Fondateur & Full-Stack Developer",
      email: "julianbonne@optimasantesolutions.com",
      url: SITE_URL,
      sameAs: ["https://fr.linkedin.com/in/julian-bonne-bb4a75172"],
      worksFor: { "@id": `${SITE_URL}#organization` },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Master Droit Fiscal des Entreprises" },
        { "@type": "EducationalOrganization", name: "Master 2 Ingénierie et Gestion de Patrimoine" },
      ],
      hasCredential: "Certification AMF",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <CookieConsent />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>

        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="lazyOnload"
        />

        <Script id="netlify-identity-redirect" strategy="lazyOnload">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });

              // Hide the widget on public pages
              if (!window.location.pathname.startsWith('/admin')) {
                const style = document.createElement('style');
                style.innerHTML = '.netlify-identity-widget { display: none !important; }';
                document.head.appendChild(style);
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
