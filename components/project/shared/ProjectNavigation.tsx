"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectNavigationProps {
  prevProject?: {
    slug: string;
    title: string;
  };
  nextProject?: {
    slug: string;
    title: string;
  };
  className?: string;
}

export function ProjectNavigation({
  prevProject,
  nextProject,
  className = "",
}: ProjectNavigationProps) {
  if (!prevProject && !nextProject) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-between gap-2 sm:gap-4 ${className}`}>
      {prevProject ? (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="group rounded-none border-2 border-zinc-900 text-xs sm:text-sm dark:border-zinc-100"
        >
          <Link href={`/projects/${prevProject.slug}`}>
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Projet précédent</span>
            <span className="sm:hidden">Préc.</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextProject && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="group rounded-none border-2 border-zinc-900 text-xs sm:text-sm dark:border-zinc-100"
        >
          <Link href={`/projects/${nextProject.slug}`}>
            <span className="hidden sm:inline">Projet suivant</span>
            <span className="sm:hidden">Suiv.</span>
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </nav>
  );
}
