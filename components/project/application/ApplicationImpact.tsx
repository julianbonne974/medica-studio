"use client";

import { motion } from "framer-motion";
import { Users, TrendingDown, Star } from "lucide-react";
import type { ApplicationProject } from "@/types/project";

interface ApplicationImpactProps {
  impact: ApplicationProject["impact"];
}

export function ApplicationImpact({ impact }: ApplicationImpactProps) {
  if (!impact) return null;

  const metrics = [
    impact.users && {
      icon: Users,
      label: "Utilisateurs actifs",
      value: impact.users,
    },
    impact.reduction && {
      icon: TrendingDown,
      label: "Réduction du temps",
      value: impact.reduction,
    },
    impact.satisfaction && {
      icon: Star,
      label: "Taux de satisfaction",
      value: impact.satisfaction,
    },
    ...(impact.custom || []).map((custom) => ({
      icon: Star,
      label: custom.label,
      value: custom.value,
    })),
  ].filter(Boolean);

  if (metrics.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Impact
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
                <div className="mb-2 break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100">
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
