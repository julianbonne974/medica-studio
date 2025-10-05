import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto max-w-4xl px-8 py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4 text-zinc-600 hover:bg-transparent hover:text-zinc-900">
              ← Retour
            </Button>
          </Link>
          <div className="space-y-4">
            <Badge variant="secondary" className="border-zinc-200 bg-zinc-50 font-normal">
              {project.category}
            </Badge>
            <h1 className="text-5xl font-medium tracking-tight">{project.title}</h1>
            <p className="text-xl text-zinc-600">{project.description}</p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {project.image && (
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="relative aspect-video w-full overflow-hidden border border-zinc-200 bg-zinc-50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-8 py-16">
        {/* Full Description */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium">À propos</h2>
          <p className="text-lg leading-relaxed text-zinc-600">{project.fullDescription}</p>
        </section>

        <Separator className="my-16 bg-zinc-200" />

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium">Fonctionnalités</h2>
          <ul className="space-y-3">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                <span className="text-lg leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator className="my-16 bg-zinc-200" />

        {/* Technologies */}
        <section>
          <h2 className="mb-6 text-2xl font-medium">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-zinc-200 bg-zinc-50 px-4 py-2 font-normal text-zinc-700"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <>
            <Separator className="my-16 bg-zinc-200" />
            <section>
              <h2 className="mb-8 text-2xl font-medium">Galerie</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video w-full overflow-hidden border border-zinc-200 bg-zinc-50"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
