// Base commune
interface ProjectBase {
  slug: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string; // Image optionnelle pour mobile/app
  order: number;
  status: "draft" | "published";
  metadata: {
    year: string;
    [key: string]: any;
  };
}

// Template Application
export interface ApplicationProject extends ProjectBase {
  template: "application";
  longDescription: string;
  technologies: string[];
  features: Array<{
    title: string;
    description?: string;
  }>;
  impact?: {
    users?: string;
    reduction?: string;
    satisfaction?: string;
    custom?: Array<{
      label: string;
      value: string;
    }>;
  };
  timeline?: Array<{
    date: string;
    title: string;
    description: string;
  }>;
  gallery?: string[];
  links?: {
    demo?: string;
    github?: string;
    website?: string;
  };
}

// Template Technology
export interface TechnologyProject extends ProjectBase {
  template: "technology";
  techType: "Backend" | "API" | "AI/ML" | "Infrastructure" | "Library" | "Tool";
  technicalDescription: string;
  stack: string[];
  characteristics: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  performance?: {
    latency?: string;
    throughput?: string;
    uptime?: string;
    custom?: Array<{
      label: string;
      value: string;
    }>;
  };
  architecture?: string;
  codeExamples?: Array<{
    title: string;
    language: string;
    code: string;
  }>;
  timeline?: Array<{
    date: string;
    milestone: string;
    description: string;
    status?: "completed" | "in-progress" | "upcoming";
  }>;
  links?: {
    docs?: string;
    github?: string;
    api?: string;
  };
}

// Template Research
export interface ResearchProject extends ProjectBase {
  template: "research";
  content: string;
  tags: string[];
  metadata: {
    year: string;
    phase: "Concept" | "POC" | "Prototype" | "Beta";
  };
}

// Union type
export type Project = ApplicationProject | TechnologyProject | ResearchProject;

// Type guards
export function isApplicationProject(project: Project): project is ApplicationProject {
  return project.template === "application";
}

export function isTechnologyProject(project: Project): project is TechnologyProject {
  return project.template === "technology";
}

export function isResearchProject(project: Project): project is ResearchProject {
  return project.template === "research";
}
