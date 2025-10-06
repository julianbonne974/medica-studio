"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilters } from "@/components/project-filters";
import type { LegacyProject } from "@/lib/projects";

interface ProjectsSectionProps {
  projects: LegacyProject[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("Tous");

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
    return uniqueCategories;
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div id="projects" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-20 space-y-6">
        <h2 className="text-6xl font-bold tracking-tight dark:text-zinc-100">Projets</h2>
        <p className="max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
          Découvrez nos solutions numériques pour le secteur de la santé
        </p>
      </div>

      {/* Filters */}
      <ProjectFilters
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Bento Grid */}
      <motion.div
        layout
        className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.0, 0, 0.2, 1],
              }}
              className={
                index === 0
                  ? "md:col-span-2 lg:col-span-2 lg:row-span-1"
                  : ""
              }
            >
              <ProjectCard project={project} index={index} isFeatured={index === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
