import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects, getProjectBySlug, getSortedProjects } from "@/lib/projects";
import { isApplicationProject, isTechnologyProject, isResearchProject } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ProjectViewTracker } from "@/components/project-view-tracker";

// Application components
import { ApplicationHero } from "@/components/project/application/ApplicationHero";
import { ApplicationImpact } from "@/components/project/application/ApplicationImpact";
import { ApplicationFeatures } from "@/components/project/application/ApplicationFeatures";
import { ApplicationTimeline } from "@/components/project/application/ApplicationTimeline";
import { ApplicationGallery } from "@/components/project/application/ApplicationGallery";

// Technology components
import { TechnologyHero } from "@/components/project/technology/TechnologyHero";
import { TechnologyPerformance } from "@/components/project/technology/TechnologyPerformance";
import { TechnologyCharacteristics } from "@/components/project/technology/TechnologyCharacteristics";
import { TechnologyArchitecture } from "@/components/project/technology/TechnologyArchitecture";
import { TechnologyCodeExamples } from "@/components/project/technology/TechnologyCodeExamples";

// Shared components
import { ProjectMetadata } from "@/components/project/shared/ProjectMetadata";
import { ProjectLinks } from "@/components/project/shared/ProjectLinks";
import { ProjectCTA } from "@/components/project/shared/ProjectCTA";
import { ProjectNavigation } from "@/components/project/shared/ProjectNavigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects
    .filter((p) => p.status === "published")
    .map((project) => ({
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
    title: `${project.title} - Medica Studio`,
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
        : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.status === "draft") {
    notFound();
  }

  // Get navigation (prev/next projects)
  const allProjects = getSortedProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      <ProjectViewTracker slug={slug} title={project.title} />

      {/* Back button */}
      <div className="sticky top-20 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-8 py-4">
          <Button
            asChild
            variant="ghost"
            className="group -ml-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </div>

      {/* Conditional rendering based on template */}
      {isApplicationProject(project) && (
        <>
          <ApplicationHero project={project} />

          <div className="mx-auto max-w-7xl space-y-16 px-8 py-16">
            {/* Long Description */}
            {project.longDescription && (
              <section>
                <div className="prose prose-zinc max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.longDescription}
                  </p>
                </div>
              </section>
            )}

            {/* Metadata & Links in sidebar layout */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-16">
                <ApplicationFeatures features={project.features} />
                {project.impact && <ApplicationImpact impact={project.impact} />}
                {project.timeline && <ApplicationTimeline timeline={project.timeline} />}
                {project.gallery && <ApplicationGallery gallery={project.gallery} />}
              </div>

              <div className="space-y-6">
                <ProjectMetadata metadata={project.metadata} />
                {project.links && <ProjectLinks links={project.links} />}
              </div>
            </div>

            <ProjectCTA />
          </div>
        </>
      )}

      {isTechnologyProject(project) && (
        <>
          <TechnologyHero project={project} />

          <div className="mx-auto max-w-7xl space-y-16 px-8 py-16">
            {/* Technical Description */}
            {project.technicalDescription && (
              <section>
                <div className="prose prose-zinc max-w-none dark:prose-invert">
                  <div
                    dangerouslySetInnerHTML={{ __html: project.technicalDescription }}
                    className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                  />
                </div>
              </section>
            )}

            {/* Metadata & Links in sidebar layout */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-16">
                <TechnologyCharacteristics characteristics={project.characteristics} />
                {project.performance && <TechnologyPerformance performance={project.performance} />}
                {project.architecture && <TechnologyArchitecture architecture={project.architecture} />}
                {project.codeExamples && <TechnologyCodeExamples codeExamples={project.codeExamples} />}
              </div>

              <div className="space-y-6">
                <ProjectMetadata metadata={project.metadata} />
                {project.links && <ProjectLinks links={project.links} />}
              </div>
            </div>

            <ProjectCTA />
          </div>
        </>
      )}

      {isResearchProject(project) && (
        <>
          {/* Research template - Simple layout */}
          <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
            <div className="mx-auto max-w-4xl px-8">
              <div className="mb-4 inline-block">
                <span className="rounded-none bg-[#059669] px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  {project.metadata.phase}
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100">
                {project.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">{project.description}</p>
            </div>
          </section>

          <div className="mx-auto max-w-4xl space-y-16 px-8 py-16">
            {/* Content */}
            <div
              className="prose prose-zinc max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-none border-2 border-zinc-200 bg-zinc-50 px-3 py-1 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ProjectCTA />
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8">
          <ProjectNavigation
            prevProject={
              prevProject
                ? { slug: prevProject.slug, title: prevProject.title }
                : undefined
            }
            nextProject={
              nextProject
                ? { slug: nextProject.slug, title: nextProject.title }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
