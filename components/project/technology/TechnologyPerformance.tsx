"use client";

import { motion } from "framer-motion";
import { Zap, BarChart, Shield } from "lucide-react";
import type { TechnologyProject } from "@/types/project";

interface TechnologyPerformanceProps {
  performance: TechnologyProject["performance"];
}

export function TechnologyPerformance({ performance }: TechnologyPerformanceProps) {
  if (!performance) return null;

  const metrics = [
    performance.latency && {
      icon: Zap,
      label: "Latence",
      value: performance.latency,
    },
    performance.throughput && {
      icon: BarChart,
      label: "Throughput",
      value: performance.throughput,
    },
    performance.uptime && {
      icon: Shield,
      label: "Uptime",
      value: performance.uptime,
    },
    ...(performance.custom || []).map((custom) => ({
      icon: BarChart,
      label: custom.label,
      value: custom.value,
    })),
  ].filter(Boolean);

  if (metrics.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Performance
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            if (!metric) return null;
            const Icon = metric.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <Icon className="mb-4 h-8 w-8 text-[#059669]" />
                <div className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
