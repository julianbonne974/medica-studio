"use client";

import { motion } from "framer-motion";

export function EcgLogo() {
  // ECG path - ressemble à un électrocardiogramme
  const ecgPath = "M 5 20 L 15 20 L 18 12 L 20 28 L 22 20 L 25 20 L 28 18 L 30 22 L 32 20 L 42 20 L 45 15 L 47 25 L 49 20 L 75 20";

  // Grille de points (papier millimétré médical)
  const gridDots = [];
  for (let x = 5; x < 80; x += 5) {
    for (let y = 5; y < 40; y += 5) {
      gridDots.push(
        <circle
          key={`dot-${x}-${y}`}
          cx={x}
          cy={y}
          r="0.5"
          className="fill-zinc-200 dark:fill-zinc-800"
        />
      );
    }
  }

  return (
    <svg
      width="80"
      height="40"
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Rectangle outline */}
      <rect
        x="1"
        y="1"
        width="78"
        height="38"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-zinc-300 dark:text-zinc-700"
      />

      {/* Grid dots - papier millimétré */}
      {gridDots}

      {/* ECG line background (static) */}
      <path
        d={ecgPath}
        stroke="#059669"
        strokeWidth="2"
        fill="none"
        opacity="0.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ECG line animated */}
      <motion.path
        d={ecgPath}
        stroke="#059669"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
          pathOffset: 0,
        }}
        animate={{
          pathLength: [0, 1, 1, 0],
          pathOffset: [0, 0, 1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.5, 1],
        }}
      />

      {/* Pulse dot at the end */}
      <motion.circle
        cx="75"
        cy="20"
        r="2"
        fill="#059669"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, 1, 1.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.4, 0.5, 0.6],
        }}
      />
    </svg>
  );
}
