"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { EcgLogo } from "@/components/ecg-logo";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 transition-all duration-300 dark:bg-zinc-950/80 ${
        isScrolled ? "border-b border-zinc-200 dark:border-zinc-800" : "border-b border-zinc-200/0 dark:border-zinc-800/0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-4 sm:py-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-4 text-lg sm:text-2xl font-medium tracking-tight transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
            <div className="scale-75 sm:scale-100">
              <EcgLogo />
            </div>
            <span className="whitespace-nowrap">
              Medica Stud
              <span className="text-emerald-600 transition-all duration-300 group-hover:animate-pulse">
                io
              </span>
            </span>
          </Link>

          {/* Navigation Links & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Navigation */}
            <div className="hidden gap-12 lg:flex">
              <Link
                href="/"
                onClick={handleProjectsClick}
                className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Projets
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Contact
              </Link>
            </div>
            <ThemeToggle />
            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
