"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (isHomePage) {
      e.preventDefault();
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-none border border-zinc-200 bg-zinc-50 transition-all duration-300 hover:border-zinc-900 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
        ) : (
          <Menu className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed right-4 top-20 z-50 w-56 overflow-hidden rounded-none border border-zinc-200 bg-white shadow-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col">
                <Link
                  href="/"
                  onClick={handleProjectsClick}
                  className="border-b border-zinc-200 px-6 py-4 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Projets
                </Link>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="border-b border-zinc-200 px-6 py-4 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="px-6 py-4 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
