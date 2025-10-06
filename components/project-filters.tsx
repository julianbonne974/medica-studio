"use client";

import { analytics } from "@/lib/analytics";

interface ProjectFiltersProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export function ProjectFilters({ categories, activeFilter, onFilterChange }: ProjectFiltersProps) {
  const allCategories = ["Tous", ...categories];

  const handleFilterChange = (category: string) => {
    analytics.filterChange(category);
    onFilterChange(category);
  };

  return (
    <div className="mb-16 flex flex-wrap gap-3">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilterChange(category)}
          className={`rounded-none border px-6 py-3 text-sm font-medium transition-all duration-300 ${
            activeFilter === category
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-300 bg-transparent text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
