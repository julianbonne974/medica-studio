"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ApplicationProject } from "@/types/project";
import { TechStack } from "../shared/TechStack";

interface ApplicationHeroProps {
  project: ApplicationProject;
}

export function ApplicationHero({ project }: ApplicationHeroProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-50 py-20 dark:bg-zinc-900">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
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
                Application
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-zinc-100">
              {project.title}
            </h1>

            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
                  Technologies
                </h3>
                <TechStack technologies={project.technologies} />
              </div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video overflow-hidden border-2 border-zinc-200 dark:border-zinc-800"
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
              <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                <span className="text-zinc-400">Image non disponible</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
