"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ApplicationProject } from "@/types/project";

interface ApplicationFeaturesProps {
  features: ApplicationProject["features"];
}

export function ApplicationFeatures({ features }: ApplicationFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Fonctionnalités
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-2 border-zinc-200 bg-white p-6 transition-all hover:border-[#059669] dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center border-2 border-[#059669] bg-[#059669]/10">
                <Check className="h-5 w-5 text-[#059669]" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
