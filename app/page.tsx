import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { getSortedProjects, getProjectsCount } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Accueil - Solutions numériques pour la santé",
  description: "Découvrez nos solutions numériques innovantes pour le secteur de la santé : plateformes de télémédecine, outils de gestion pour professionnels de santé, et applications médicales sur mesure.",
  openGraph: {
    title: "Medica Studio - Solutions numériques pour la santé",
    description: "Découvrez nos solutions numériques innovantes pour le secteur de la santé",
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
