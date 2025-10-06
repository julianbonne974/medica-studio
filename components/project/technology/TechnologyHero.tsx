"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TechnologyProject } from "@/types/project";
import { TechStack } from "../shared/TechStack";

interface TechnologyHeroProps {
  project: TechnologyProject;
}

export function TechnologyHero({ project }: TechnologyHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Tech grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #059669 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-block">
              <span className="rounded-none bg-[#059669] px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                {project.techType}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mb-8 text-lg text-zinc-300">{project.description}</p>

            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
                  Stack Technique
                </h3>
                <TechStack technologies={project.stack} />
              </div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video overflow-hidden border-2 border-[#059669]"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-800">
                <span className="text-zinc-400">Image non disponible</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
