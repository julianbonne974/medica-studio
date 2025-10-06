"use client";

import { motion } from "framer-motion";
import type { ApplicationProject } from "@/types/project";

interface ApplicationTimelineProps {
  timeline: ApplicationProject["timeline"];
}

export function ApplicationTimeline({ timeline }: ApplicationTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Timeline
        </motion.h2>

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-4 before:w-4 before:border-2 before:border-[#059669] before:bg-white after:absolute after:left-[7px] after:top-6 after:h-full after:w-0.5 after:bg-zinc-200 last:after:hidden dark:before:bg-zinc-950 dark:after:bg-zinc-800"
            >
              <div className="mb-1 text-sm font-medium text-[#059669]">{item.date}</div>
              <h3 className="mb-2 text-xl font-medium text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
