import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <Card className="cursor-pointer border border-transparent bg-zinc-50 shadow-none transition-all hover:border-zinc-200">
        <CardHeader className="space-y-4 p-12">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-3xl font-medium">{project.title}</CardTitle>
            <span className="shrink-0 text-xs text-zinc-500">
              {project.category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-12 pb-12">
          <p className="text-zinc-600 leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
