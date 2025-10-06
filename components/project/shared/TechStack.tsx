"use client";

import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  technologies: string[];
  className?: string;
}

export function TechStack({ technologies, className = "" }: TechStackProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech, index) => (
        <Badge
          key={index}
          variant="outline"
          className="border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}
