"use client";

import Link from "next/link";
import { ExternalLink, Github, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectLinksProps {
  links?: {
    demo?: string;
    github?: string;
    website?: string;
    docs?: string;
    api?: string;
  };
  className?: string;
}

export function ProjectLinks({ links, className = "" }: ProjectLinksProps) {
  if (!links || Object.values(links).every((link) => !link)) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.demo && (
        <Button
          asChild
          className="rounded-none border-2 border-[#059669] bg-[#059669] text-white hover:bg-[#047857]"
        >
          <Link href={links.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Voir la démo
          </Link>
        </Button>
      )}

      {links.website && (
        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <Link href={links.website} target="_blank" rel="noopener noreferrer">
            <Globe className="mr-2 h-4 w-4" />
            Site web
          </Link>
        </Button>
      )}

      {links.github && (
        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <Link href={links.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </Button>
      )}

      {links.docs && (
        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <Link href={links.docs} target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </Button>
      )}

      {links.api && (
        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <Link href={links.api} target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            API Reference
          </Link>
        </Button>
      )}
    </div>
  );
}
