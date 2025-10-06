"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import type { TechnologyProject } from "@/types/project";

interface TechnologyTimelineProps {
  timeline: TechnologyProject["timeline"];
}

export function TechnologyTimeline({ timeline }: TechnologyTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Roadmap du projet
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#059669] via-[#059669] to-transparent hidden md:block" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center border-2 border-[#059669] bg-white dark:bg-zinc-950">
                    <Calendar className="h-6 w-6 text-[#059669]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 border-2 border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {item.milestone}
                    </h3>
                    <span className="text-sm font-medium text-[#059669]">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                  {item.status === "completed" && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#059669]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Complété</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}