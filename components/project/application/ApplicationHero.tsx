"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import type { ApplicationProject } from "@/types/project";
import { TechStack } from "../shared/TechStack";

interface ApplicationHeroProps {
  project: ApplicationProject;
}

export function ApplicationHero({ project }: ApplicationHeroProps) {
  const [showMobile, setShowMobile] = useState(false);
  const hasBothImages = project.image && project.mobileImage;
  const hasOnlyMobile = !project.image && project.mobileImage;
  const currentImage = showMobile && project.mobileImage ? project.mobileImage : (project.image || project.mobileImage);

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-16 sm:py-20 dark:bg-zinc-900">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
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

          {/* Image Container with Toggle */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative overflow-hidden border-2 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 ${
                showMobile || hasOnlyMobile ? "aspect-[9/19] w-80 rounded-xl" : "aspect-video"
              }`}
            >
              {currentImage && (
                <Image
                  src={currentImage}
                  alt={showMobile ? `${project.title} - Mobile` : `${project.title} - Desktop`}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>

            {/* Toggle Button - Only show if both images exist */}
            {hasBothImages && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setShowMobile(false)}
                  className={`flex items-center gap-2 rounded-none border-2 px-4 py-2 text-sm font-medium transition-all ${
                    !showMobile
                      ? "border-[#059669] bg-[#059669] text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setShowMobile(true)}
                  className={`flex items-center gap-2 rounded-none border-2 px-4 py-2 text-sm font-medium transition-all ${
                    showMobile
                      ? "border-[#059669] bg-[#059669] text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
