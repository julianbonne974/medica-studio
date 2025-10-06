"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LegacyProject } from "@/lib/projects";
import { analytics } from "@/lib/analytics";

interface ProjectCardProps {
  project: LegacyProject;
  index: number;
  isFeatured?: boolean;
}

export function ProjectCard({ project, index, isFeatured = false }: ProjectCardProps) {
  const handleClick = () => {
    analytics.projectClick(project.title, project.slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/projects/${project.slug}`} onClick={handleClick} className="block h-full">
        <Card
          className={`
            relative h-full overflow-hidden cursor-pointer
            border-2 border-transparent bg-zinc-100 shadow-none
            transition-all duration-300 ease-in-out
            hover:border-emerald-600 hover:-translate-y-1 hover:shadow-lg
            dark:bg-zinc-900
            ${isFeatured ? "md:min-h-[400px] border-l-4 !border-l-emerald-600 bg-gradient-to-r from-emerald-50/5 to-transparent dark:from-emerald-950/5" : ""}
          `}
        >
          {/* Green dot accent */}
          <div className="absolute left-4 top-4 z-10 h-2 w-2 rounded-full bg-emerald-600" />

          <CardHeader className={`relative space-y-2 ${isFeatured ? "p-6 md:p-8" : "p-4"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                {isFeatured && (
                  <Badge className="border-0 bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                    FEATURED
                  </Badge>
                )}
                <CardTitle className={`font-semibold transition-transform duration-300 group-hover:-translate-y-1 dark:text-zinc-100 ${
                  isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                }`}>
                  {project.title}
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 border-zinc-300 bg-transparent px-2 py-1 text-xs text-zinc-600 transition-all duration-300 ease-in-out group-hover:border-0 group-hover:bg-emerald-600 group-hover:text-white dark:border-zinc-700 dark:text-zinc-400"
              >
                {project.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className={`mb-1 ${isFeatured ? "px-6 pb-6 md:px-8 md:pb-8" : "px-4 pb-4"}`}>
            <p className={`text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 ${
              isFeatured ? "md:text-sm" : ""
            }`}>{project.description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
