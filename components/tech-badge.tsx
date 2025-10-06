"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiStripe,
  SiZod,
} from "react-icons/si";
import { IconType } from "react-icons";

const techIcons: Record<string, IconType> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "Prisma": SiPrisma,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "GraphQL": SiGraphql,
  "Stripe": SiStripe,
  "Zod": SiZod,
  "tRPC": SiTypescript, // Using TypeScript icon as fallback
  "D3.js": SiJavascript, // Using JavaScript icon as fallback
};

interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  const Icon = techIcons[tech];

  return (
    <div className="group flex items-center gap-3 rounded-none border border-zinc-200 bg-zinc-50 px-6 py-4 transition-all duration-300 hover:border-zinc-900">
      {Icon && (
        <Icon className="h-5 w-5 text-zinc-700 transition-transform duration-300 group-hover:scale-125" />
      )}
      <span className="font-medium text-zinc-700">{tech}</span>
    </div>
  );
}
