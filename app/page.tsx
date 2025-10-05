import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-20 space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">Projets</h1>
        <p className="max-w-2xl text-xl text-zinc-600">
          Solutions numériques innovantes pour le secteur de la santé
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-12 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
