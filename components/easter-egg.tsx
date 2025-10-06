"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const targetSequence = ["m", "e", "d", "i", "c", "a"];

  useEffect(() => {
    let keySequence: string[] = [];

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keySequence = [...keySequence, key].slice(-targetSequence.length);

      // Check if the sequence matches
      if (keySequence.join("") === targetSequence.join("")) {
        triggerEasterEgg();
        keySequence = [];
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [targetSequence]);

  const triggerEasterEgg = () => {
    setIsVisible(true);

    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-8 max-w-2xl rounded-none border-4 border-zinc-900 bg-zinc-50 p-12 text-center shadow-2xl dark:border-zinc-100 dark:bg-zinc-900"
          >
            {/* Decorative corners */}
            <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-zinc-900 dark:border-zinc-100" />
            <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-zinc-900 dark:border-zinc-100" />
            <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-zinc-900 dark:border-zinc-100" />
            <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-zinc-900 dark:border-zinc-100" />

            {/* Animated icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="mb-6 flex justify-center"
            >
              <div className="rounded-full bg-zinc-900 p-6 dark:bg-zinc-100">
                <Sparkles className="h-12 w-12 text-zinc-50 dark:text-zinc-900" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Vous avez trouvé l'easter egg! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6 text-lg text-zinc-600 dark:text-zinc-400"
            >
              Contactez-nous avec le code{" "}
              <span className="rounded-none bg-zinc-900 px-3 py-1 font-mono font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                INSIDER
              </span>{" "}
              pour une démo exclusive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-zinc-500 dark:text-zinc-500"
            >
              Ce message disparaîtra dans quelques secondes...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
