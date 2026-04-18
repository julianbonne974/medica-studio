import { Metadata } from "next";
import { ProjectsSection } from "@/components/projects-section";
import { getSortedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Portfolio de Medica Studio : applications SaaS santé, CRM médicaux, plateformes de cybersécurité pour ESMS, outils fiscaux pour médecins. Next.js, Firebase, PostgreSQL HDS, tRPC, Flutter.",
  openGraph: {
    title: "Projets — Medica Studio",
    description:
      "Portfolio de Medica Studio : applications SaaS santé, CRM médicaux, cybersécurité ESMS, outils fiscaux pour médecins.",
    url: "https://medicastudio.com/projects",
  },
};

export default function ProjectsPage() {
  const sortedProjects = getSortedProjects();

  const projects = sortedProjects.map((project) => ({
    id: project.slug,
    title: project.title,
    description: project.description,
    category: project.template,
    slug: project.slug,
    fullDescription:
      "longDescription" in project
        ? project.longDescription
        : "technicalDescription" in project
        ? project.technicalDescription
        : "",
    features: [],
    technologies:
      "technologies" in project
        ? project.technologies
        : "stack" in project
        ? project.stack
        : [],
    image: project.image,
    gallery: "gallery" in project ? project.gallery : undefined,
    confidential: project.confidential,
    results: undefined,
  }));

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-100">
            Projets
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Applications santé en production, CRM médicaux conformité HDS, outils de cybersécurité et
            calculateurs fiscaux pour professionnels de santé.
          </p>
        </div>
      </section>

      <ProjectsSection projects={projects} />
    </div>
  );
}
