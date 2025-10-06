import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedCounter } from "@/components/animated-counter";
import { TechBadge } from "@/components/tech-badge";
import { ImageLightbox } from "@/components/image-lightbox";
import { ProjectViewTracker } from "@/components/project-view-tracker";

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

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} - Medica Studio`,
      description: project.description,
      url: `https://medicastudio.com/projects/${project.slug}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ProjectViewTracker projectTitle={project.title} projectSlug={project.slug} />

      {/* Hero Section */}
      {project.image ? (
        <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-zinc-900/50" />

          {/* Back Button */}
          <div className="absolute left-8 top-8 z-10">
            <Link href="/">
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-8 pb-16">
              <div className="space-y-6">
                <Badge className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                  {project.category}
                </Badge>
                <h1 className="text-6xl font-bold tracking-tight text-white md:text-7xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-xl text-white/90">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <header className="border-b border-zinc-200">
          <div className="mx-auto max-w-4xl px-8 py-12">
            <Link href="/">
              <Button variant="ghost" className="mb-8 -ml-4 text-zinc-600 hover:bg-transparent hover:text-zinc-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
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
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-8 py-16">
        {/* Full Description */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium">À propos</h2>
          <p className="text-lg leading-relaxed text-zinc-600">{project.fullDescription}</p>
        </section>

        {/* Impact Section */}
        {project.results && Object.keys(project.results).length > 0 && (
          <>
            <Separator className="my-16 bg-zinc-200" />
            <section className="mb-16">
              <h2 className="mb-12 text-center text-2xl font-medium">Impact</h2>
              <div className="grid gap-12 md:grid-cols-3">
                {Object.entries(project.results).map(([key, value]) => (
                  <AnimatedCounter
                    key={key}
                    value={value}
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                ))}
              </div>
            </section>
          </>
        )}

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
          <h2 className="mb-8 text-2xl font-medium">Technologies</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.technologies.map((tech, index) => (
              <TechBadge key={index} tech={tech} />
            ))}
          </div>
        </section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <>
            <Separator className="my-16 bg-zinc-200" />
            <section>
              <h2 className="mb-8 text-2xl font-medium">Galerie</h2>
              <ImageLightbox images={project.gallery} projectTitle={project.title} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
