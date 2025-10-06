"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Database, Globe, Cpu, Lock, BarChart } from "lucide-react";
import type { TechnologyProject } from "@/types/project";

const iconMap = {
  Zap,
  Shield,
  Database,
  Globe,
  Cpu,
  Lock,
  BarChart,
};

interface TechnologyCharacteristicsProps {
  characteristics: TechnologyProject["characteristics"];
}

export function TechnologyCharacteristics({
  characteristics,
}: TechnologyCharacteristicsProps) {
  if (!characteristics || characteristics.length === 0) return null;

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Caractéristiques
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {characteristics.map((char, index) => {
            const Icon = iconMap[char.icon as keyof typeof iconMap] || Zap;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-2 border-zinc-200 bg-white p-6 transition-all hover:border-[#059669] dark:border-zinc-800 dark:bg-zinc-950"
              >
                <Icon className="mb-3 h-8 w-8 text-[#059669]" />
                <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {char.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{char.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
