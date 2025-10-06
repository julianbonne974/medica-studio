"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  const textParts = [
    { text: "Medica Stud", color: "text-zinc-900 dark:text-zinc-100" },
    { text: "io", color: "text-[#059669]" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            className="flex overflow-hidden"
          >
            {textParts.map((part, partIndex) => {
              const letters = part.text.split("");
              return letters.map((letter, letterIndex) => {
                const globalIndex = partIndex === 0 ? letterIndex : textParts[0].text.length + letterIndex;
                return (
                  <motion.span
                    key={globalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: globalIndex * 0.08 }}
                    className={`text-5xl font-bold tracking-tight md:text-6xl ${part.color}`}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              });
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
