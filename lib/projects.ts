import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
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

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjects(): Project[] {
  // Check if directory exists, if not return empty array
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        id: slug,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        slug: data.slug || slug,
        fullDescription: data.fullDescription || "",
        features: data.features || [],
        technologies: data.technologies || [],
        image: data.image || undefined,
        gallery: data.gallery || undefined,
        results: data.results || undefined,
      } as Project;
    });

  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((project) => project.slug === slug);
}

// Keep the old export for backward compatibility during migration
export const projects: Project[] = [];
