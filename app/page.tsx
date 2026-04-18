import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { getSortedProjects, getProjectsCount } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio de développement santé — HDS, CRM médicaux, cybersécurité ESMS",
  description:
    "Medica Studio conçoit et opère des applications SaaS santé, des CRM médicaux, des plateformes de cybersécurité ESMS et des outils fiscaux pour professionnels de santé. Architectures HDS conformes RGPD, HAS 2025, CaRE et HDS 2.0.",
  alternates: { canonical: "https://medicastudio.com" },
  openGraph: {
    title: "Medica Studio — Studio de développement santé, HDS et conformité",
    description:
      "Applications SaaS santé, CRM médicaux, cybersécurité ESMS et outils fiscaux. Next.js, tRPC, PostgreSQL HDS, Firebase, Flutter, publicodes.",
    url: "https://medicastudio.com",
  },
};

export default function Home() {
  const sortedProjects = getSortedProjects();
  // Convert to legacy format for compatibility with ProjectsSection
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
    technologies: "technologies" in project ? project.technologies : [],
    image: project.image,
    gallery: "gallery" in project ? project.gallery : undefined,
    results: undefined,
  }));
  const totalProjects = getProjectsCount();

  return (
    <div>
      <Hero totalProjects={totalProjects} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
