"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-none border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative flex h-10 w-10 items-center justify-center rounded-none border border-zinc-200 bg-zinc-50 transition-all duration-300 hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
      aria-label="Toggle theme"
    >
      <Sun className="absolute h-5 w-5 rotate-0 scale-100 text-zinc-700 transition-all duration-300 group-hover:text-zinc-900 dark:-rotate-90 dark:scale-0 dark:text-zinc-400" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 text-zinc-400 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:text-zinc-300 dark:group-hover:text-zinc-100" />
    </motion.button>
  );
}
