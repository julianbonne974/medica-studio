import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types/project";

// Re-export Project type for convenience
export type { Project } from "@/types/project";
export type { ApplicationProject, TechnologyProject, ResearchProject } from "@/types/project";

const contentDirectory = path.join(process.cwd(), "content/projects");

/**
 * Lit récursivement tous les fichiers .md dans un dossier
 */
function readMarkdownFiles(dir: string): Array<{ filePath: string; slug: string }> {
  const files: Array<{ filePath: string; slug: string }> = [];

  try {
    if (!fs.existsSync(dir)) {
      return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Récursion dans les sous-dossiers
        files.push(...readMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(/\.md$/, "");
        files.push({ filePath: fullPath, slug });
      }
    }
  } catch (error) {
    console.error(`Erreur lors de la lecture du dossier ${dir}:`, error);
  }

  return files;
}

/**
 * Récupère tous les projets de tous les templates
 */
export function getAllProjects(): Project[] {
  try {
    const markdownFiles = readMarkdownFiles(contentDirectory);
    const projects: Project[] = [];

    for (const { filePath, slug } of markdownFiles) {
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Validation du template
        if (!data.template || !["application", "technology", "research"].includes(data.template)) {
          console.warn(`Template invalide ou manquant pour ${slug}, ignoré`);
          continue;
        }

        const project = {
          slug: data.slug || slug,
          content,
          ...data,
        } as Project;

        projects.push(project);
      } catch (error) {
        console.error(`Erreur lors du parsing de ${filePath}:`, error);
      }
    }

    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return [];
  }
}

/**
 * Récupère un projet spécifique par son slug
 */
export function getProjectBySlug(slug: string): Project | null {
  try {
    const allProjects = getAllProjects();
    const project = allProjects.find((p) => p.slug === slug);
    return project || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet ${slug}:`, error);
    return null;
  }
}

/**
 * Filtre les projets par template
 */
export function getProjectsByTemplate(
  template: "application" | "technology" | "research"
): Project[] {
  try {
    const allProjects = getAllProjects();
    return allProjects.filter((p) => p.template === template);
  } catch (error) {
    console.error(`Erreur lors du filtrage par template ${template}:`, error);
    return [];
  }
}

/**
 * Récupère les projets triés par order (ascendant) puis par titre
 */
export function getSortedProjects(): Project[] {
  try {
    const allProjects = getAllProjects();
    return allProjects
      .filter((p) => p.status === "published") // Uniquement les projets publiés
      .sort((a, b) => {
        // Tri par ordre d'affichage
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        // Si même ordre, tri alphabétique par titre
        return a.title.localeCompare(b.title);
      });
  } catch (error) {
    console.error("Erreur lors du tri des projets:", error);
    return [];
  }
}

/**
 * Récupère les projets triés filtrés par template
 */
export function getSortedProjectsByTemplate(
  template: "application" | "technology" | "research"
): Project[] {
  try {
    const allProjects = getSortedProjects();
    return allProjects.filter((p) => p.template === template);
  } catch (error) {
    console.error(`Erreur lors du tri par template ${template}:`, error);
    return [];
  }
}

/**
 * Compte le nombre total de projets publiés (applications + technologies)
 */
export function getProjectsCount(): number {
  try {
    const allProjects = getSortedProjects();
    return allProjects.length;
  } catch (error) {
    console.error("Erreur lors du comptage des projets:", error);
    return 0;
  }
}

// === Backward compatibility ===
// Ces fonctions maintiennent la compatibilité avec l'ancien système

export interface LegacyProject {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  image?: string;
  gallery?: string[];
  results?: {
    [key: string]: string;
  };
}

export function getProjects(): LegacyProject[] {
  const allProjects = getAllProjects();

  return allProjects.map((project) => ({
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
        : "content" in project
        ? project.content
        : "",
    features:
      "features" in project && Array.isArray(project.features)
        ? project.features.map((f) => (typeof f === "string" ? f : f.title))
        : [],
    technologies:
      "technologies" in project
        ? project.technologies
        : "stack" in project
        ? project.stack
        : [],
    image: project.image,
    gallery: "gallery" in project ? project.gallery : undefined,
    results: undefined,
  }));
}

export const projects: LegacyProject[] = [];
