"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

interface HeroProps {
  totalProjects: number;
}

// Messages affichés sur le board (sans accents : le split-flap ne gère que A-Z/0-9).
const BOARD_MESSAGES: string[] = [
  "INGENIERIE NUMERIQUE\nDANS LA SANTE",
  "APPLICATIONS &\nSYSTEMES METIER",
  "DONNEES DE SANTE\nHEBERGEES HDS",
  "WEB . MOBILE . BACKEND",
];

export function Hero({ totalProjects }: HeroProps) {
  const [projectsCount, setProjectsCount] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Le board est rendu uniquement côté client (après hydratation) : le HTML initial
    // reste léger (aucune des ~130 cellules à hydrater) et le board se monte une seule
    // fois directement à la bonne taille — réduite sur mobile pour alléger le DOM et
    // le compositing. setIsMobile + setMounted sont batchés -> pas de double rendu.
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setMounted(true);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Animation counter 0 → totalProjects
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

  useEffect(() => {
    // Rotation des messages du board, désactivée si l'utilisateur réduit les animations.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    // La rotation (et donc l'animation des 132 cellules) ne tourne QUE lorsque le
    // board est visible à l'écran ET l'onglet actif : aucun coût CPU en arrière-plan
    // ou quand l'utilisateur a scrollé plus bas.
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let onScreen = true;

    const start = () => {
      if (
        intervalId === null &&
        onScreen &&
        document.visibilityState === "visible"
      ) {
        intervalId = setInterval(() => {
          setMsgIdx((i) => (i + 1) % BOARD_MESSAGES.length);
        }, 8000);
      }
    };
    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.15 },
    );
    observer.observe(section);

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Medical grid background */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e4e4e7 1px, transparent 1px),
            linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-8">
        <div className="space-y-10 sm:space-y-14">
          {/* Signature : split-flap board. Le H1 sémantique reste accessible pour le SEO. */}
          <div className="space-y-6">
            <h1 className="sr-only">
              Ingénierie numérique dans le secteur de la santé
            </h1>
            <div
              className="flex min-h-[260px] items-center justify-center animate-fade-in sm:min-h-[300px]"
              aria-hidden="true"
            >
              {mounted && (
                <TextFlippingBoard
                  text={BOARD_MESSAGES[msgIdx]}
                  boardRows={isMobile ? 5 : 4}
                  boardCols={isMobile ? 14 : 22}
                />
              )}
            </div>
            <p className="mx-auto max-w-2xl animate-fade-in-delay-1 text-center text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
              Développement d&apos;applications et systèmes dédiés aux
              professionnels de santé
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-row flex-wrap items-start justify-center gap-8 sm:gap-12 lg:gap-16 animate-fade-in-delay-2">
            <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600">
                  {projectsCount}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Projets
                </div>
              </div>
            </div>
            <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600">
                  5+
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 max-w-[120px] sm:max-w-none">
                  Années d&apos;expertise
                </div>
              </div>
            </div>
            <div className="group border-l-4 border-emerald-600 pl-4 sm:pl-6 transition-all hover:border-l-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600">
                  Multi-supports
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Web, Mobile, Backend
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center animate-fade-in-delay-3">
            <Button
              onClick={scrollToProjects}
              variant="outline"
              size="lg"
              className="group border-zinc-900 bg-transparent px-8 py-6 text-base font-medium text-zinc-900 shadow-none transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              Découvrir nos projets
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Animations CSS (respectent prefers-reduced-motion) */}
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
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-fade-in-delay-1,
          .animate-fade-in-delay-2,
          .animate-fade-in-delay-3 {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
