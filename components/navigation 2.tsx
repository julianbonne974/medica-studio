"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { EcgLogo } from "@/components/ecg-logo";

export function Navigation() {
  return (
    <header className="border-b border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-8 py-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4 text-2xl font-medium tracking-tight transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
            <EcgLogo />
            <span>
              Medica Stud
              <span className="text-emerald-600 transition-all duration-300 group-hover:animate-pulse">
                io
              </span>
            </span>
          </Link>

          {/* Navigation Links & Theme Toggle */}
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex gap-6 md:gap-12">
              <Link
                href="/"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Projets
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Contact
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
