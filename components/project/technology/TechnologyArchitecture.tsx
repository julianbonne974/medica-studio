"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TechnologyProject } from "@/types/project";
import { TechnologyArchitectureDiagram } from "./TechnologyArchitectureDiagram";

interface TechnologyArchitectureProps {
  architecture: TechnologyProject["architecture"];
  title?: string;
}

export function TechnologyArchitecture({
  architecture,
  title = "Architecture",
}: TechnologyArchitectureProps) {
  if (!architecture) return null;

  // If architecture is "custom", render the custom diagram component
  if (architecture === "custom") {
    return <TechnologyArchitectureDiagram />;
  }

  // Otherwise render the image as before
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video w-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800"
        >
          <Image
            src={architecture}
            alt="Diagramme d'architecture"
            fill
            className="object-contain bg-white p-8 dark:bg-zinc-950"
          />
        </motion.div>
      </div>
    </section>
  );
}
