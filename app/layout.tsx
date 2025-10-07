import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientLayout } from "@/components/client-layout";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Medica Studio - Solutions numériques pour la santé",
    template: "%s | Medica Studio",
  },
  description: "Solutions numériques innovantes pour le secteur de la santé",
  metadataBase: new URL("https://medicastudio.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://medicastudio.com",
    siteName: "Medica Studio",
    title: "Medica Studio - Solutions numériques pour la santé",
    description: "Solutions numériques innovantes pour le secteur de la santé",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Medica Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medica Studio - Solutions numériques pour la santé",
    description: "Solutions numériques innovantes pour le secteur de la santé",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ClientLayout>
            <GoogleAnalytics />
            <Navigation />
            <main>{children}</main>
            <Footer />
          </ClientLayout>
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
