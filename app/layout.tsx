import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/navigation";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medica Studio",
  description: "Solutions numériques innovantes pour le secteur de la santé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-8 py-8">
            <p className="text-center text-sm text-zinc-500">
              © 2025 Medica Studio
            </p>
          </div>
        </footer>

        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
