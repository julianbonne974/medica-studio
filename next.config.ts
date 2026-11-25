import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Espace clients : les prototypes (private/) et la configuration des projets (content/clients/)
  // sont lus avec fs ; on les inclut dans le bundle des fonctions qui les servent.
  outputFileTracingIncludes: {
    "/clients/**/*": ["./private/clients/**/*", "./content/clients/**/*"],
    // L'API des questionnaires valide le fichier de contenu, dont l'existence des images citées.
    "/api/clients/**/*": ["./content/clients/**/*", "./private/clients/*/questions/**/*"],
  },
  async headers() {
    return [
      {
        source: "/clients/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/clients",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/clients/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
