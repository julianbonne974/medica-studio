"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivateLinkModal } from "@/components/private-link-modal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"github" | "documentation" | "demo">("github");

  if (!links || Object.values(links).every((link) => !link)) {
    return null;
  }

  const handlePrivateLink = (type: "github" | "documentation" | "demo") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.demo && (
        <Button
          onClick={() => handlePrivateLink("demo")}
          className="rounded-none border-2 border-[#059669] bg-[#059669] text-white hover:bg-[#047857]"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Voir la démo
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
          onClick={() => handlePrivateLink("github")}
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      )}

      {links.docs && (
        <Button
          onClick={() => handlePrivateLink("documentation")}
          variant="outline"
          className="rounded-none border-2 border-zinc-900 dark:border-zinc-100"
        >
          <FileText className="mr-2 h-4 w-4" />
          Documentation
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

      <PrivateLinkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        linkType={modalType}
      />
    </div>
  );
}
