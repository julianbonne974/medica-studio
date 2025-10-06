"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import type { TechnologyProject } from "@/types/project";
import { TechStack } from "../shared/TechStack";

interface TechnologyHeroProps {
  project: TechnologyProject;
}

export function TechnologyHero({ project }: TechnologyHeroProps) {
  const [showMobile, setShowMobile] = useState(false);
  const hasBothImages = project.image && project.mobileImage;
  const currentImage = showMobile && project.mobileImage ? project.mobileImage : project.image;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-16 sm:py-20 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Tech grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #059669 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className={project.image ? "grid gap-12 lg:grid-cols-2 lg:gap-16" : ""}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={project.image ? "flex flex-col justify-center" : "max-w-4xl"}
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

          {/* Image Container with Toggle - Only show if image exists */}
          {project.image && (
            <div className="space-y-4">
              {/* Main Image Display */}
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden border-2 border-[#059669] ${
                  showMobile ? "aspect-[9/19] max-w-[320px] mx-auto rounded-xl" : "aspect-video"
                }`}
              >
                <Image
                  src={currentImage}
                  alt={showMobile ? `${project.title} - Mobile` : `${project.title} - Desktop`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Toggle Button - Only show if both images exist */}
              {hasBothImages && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setShowMobile(false)}
                    className={`flex items-center gap-2 rounded-none border-2 px-4 py-2 text-sm font-medium transition-all ${
                      !showMobile
                        ? "border-[#059669] bg-[#059669] text-white"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600"
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
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600"
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
