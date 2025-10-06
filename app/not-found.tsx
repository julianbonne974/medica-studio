"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Circle, Square, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-8 transition-colors dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Geometric Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto mb-16 flex h-64 w-full items-center justify-center"
          >
            {/* Background shapes */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
            >
              <Square className="h-32 w-32 text-zinc-200 dark:text-zinc-800" strokeWidth={1} />
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/4 top-1/4"
            >
              <Circle className="h-20 w-20 text-zinc-300 dark:text-zinc-700" strokeWidth={1} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-1/4 top-1/3"
            >
              <Triangle className="h-24 w-24 text-zinc-200 dark:text-zinc-800" strokeWidth={1} />
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-9xl font-bold tracking-tighter md:text-[12rem] dark:text-zinc-100"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl dark:text-zinc-100">
              Cette page n'existe pas
            </h2>
            <p className="mx-auto max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              La page que vous recherchez a peut-être été déplacée ou n'existe plus.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8"
          >
            <Link href="/">
              <Button
                size="lg"
                className="group rounded-none border-2 border-zinc-900 bg-zinc-900 px-8 py-6 text-base font-medium text-white shadow-none transition-all hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
