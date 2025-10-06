"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// This would normally be server-side, but for simplicity with client-side filtering
// we'll fetch in a client component. In production, consider using server components
// with URL search params for filtering

type Template = "all" | "application" | "technology" | "research";

type MockProject = {
  slug: string;
  title: string;
  description: string;
  template: "application" | "technology" | "research";
  image: string;
  technologies: string[];
};

const MOCK_PROJECTS: MockProject[] = [
  {
    slug: "hadconnect-plus",
    title: "HADconnect+",
    description:
      "Solution complète de gestion pour les établissements d'Hospitalisation À Domicile",
    template: "application",
    image: "/images/projects/hadconnect-hero.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    slug: "medical-ai-enrichment",
    title: "Medical AI Enrichment System",
    description:
      "Système backend intelligent pour enrichir automatiquement les annonces médicales grâce à l'IA",
    template: "technology",
    image: "/images/projects/ai-enrichment.jpg",
    technologies: ["Python", "FastAPI", "OpenAI GPT-4", "PostgreSQL"],
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Template>("all");

  const filteredProjects =
    activeFilter === "all"
      ? MOCK_PROJECTS
      : MOCK_PROJECTS.filter((p) => p.template === activeFilter);

  const filters: Array<{ key: Template; label: string; count: number }> = [
    {
      key: "all",
      label: "Tous les projets",
      count: MOCK_PROJECTS.length,
    },
    {
      key: "application",
      label: "Applications",
      count: MOCK_PROJECTS.filter((p) => p.template === "application").length,
    },
    {
      key: "technology",
      label: "Technologies",
      count: MOCK_PROJECTS.filter((p) => p.template === "technology").length,
    },
    {
      key: "research",
      label: "Research",
      count: MOCK_PROJECTS.filter((p) => p.template === "research").length,
    },
  ];

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-100">
              Nos Projets
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Découvrez notre portfolio d'applications, technologies et recherches dans le domaine
              médical
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-none border-2 px-6 py-3 text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "border-[#059669] bg-[#059669] text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="group h-full overflow-hidden border-2 border-zinc-200 shadow-none transition-all hover:border-[#059669] dark:border-zinc-800">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-zinc-400">Image non disponible</span>
                      </div>
                    )}
                    {/* Template badge */}
                    <div className="absolute left-4 top-4">
                      <Badge className="rounded-none border-2 border-white bg-white/90 text-zinc-900 backdrop-blur-sm">
                        {project.template === "application"
                          ? "Application"
                          : project.template === "technology"
                          ? "Technology"
                          : "Research"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-medium text-zinc-900 transition-colors group-hover:text-[#059669] dark:text-zinc-100">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="rounded-none border-zinc-200 bg-zinc-50 text-xs dark:border-zinc-800 dark:bg-zinc-900"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge
                            variant="outline"
                            className="rounded-none border-zinc-200 bg-zinc-50 text-xs dark:border-zinc-800 dark:bg-zinc-900"
                          >
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-sm font-medium text-[#059669]">
                      Voir le projet
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              Aucun projet trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
