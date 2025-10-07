"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  totalProjects: number;
}

export function Hero({ totalProjects }: HeroProps) {
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    // Animate projects count from 0 to totalProjects
    const projectsInterval = setInterval(() => {
      setProjectsCount((prev) => {
        if (prev >= totalProjects) {
          clearInterval(projectsInterval);
          return totalProjects;
        }
        return prev + 1;
      });
    }, 150);

    return () => {
      clearInterval(projectsInterval);
    };
  }, [totalProjects]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Medical grid background */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e4e4e7 1px, transparent 1px),
            linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="space-y-8 sm:space-y-16">
          {/* Title */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="animate-fade-in text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight dark:text-zinc-100">
              Ingénierie numérique dans le secteur de la santé
            </h1>
            <p className="max-w-2xl animate-fade-in-delay-1 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
              Développement d'applications et systèmes dédiés aux professionnels de santé
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-row flex-wrap items-start gap-8 sm:gap-12 lg:gap-16 animate-fade-in-delay-2">
              <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-bold text-emerald-600">{projectsCount}</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Projets</div>
                </div>
              </div>
              <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-bold text-emerald-600">5+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 max-w-[120px] sm:max-w-none">Années d'expertise</div>
                </div>
              </div>
              <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-bold text-emerald-600">Multi-supports</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Web, Mobile, Backend</div>
                </div>
              </div>
            </div>

          {/* CTA */}
          <div className="animate-fade-in-delay-3">
              <Button
                onClick={scrollToProjects}
                variant="outline"
                size="lg"
                className="group border-zinc-900 bg-transparent px-8 py-6 text-base font-medium text-zinc-900 shadow-none transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
              >
                Découvrir nos projets
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.2s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.4s forwards;
        }

        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </section>
  );
}
