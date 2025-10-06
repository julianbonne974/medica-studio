import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { getProjects } from "@/lib/projects";

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
  const projects = getProjects();

  return (
    <div>
      <Hero />
      <ProjectsSection projects={projects} />
    </div>
  );
}
