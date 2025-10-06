"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Lock, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PrivateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkType: "github" | "documentation" | "demo";
}

export function PrivateLinkModal({ isOpen, onClose, linkType }: PrivateLinkModalProps) {
  const getContent = () => {
    switch (linkType) {
      case "github":
        return {
          title: "Repository GitHub privé",
          description: "Le code source de ce projet est hébergé dans un repository privé pour des raisons de confidentialité."
        };
      case "documentation":
        return {
          title: "Documentation privée",
          description: "La documentation technique de ce projet est confidentielle et n'est pas accessible publiquement."
        };
      case "demo":
        return {
          title: "Démonstration sur demande",
          description: "La démonstration de ce projet nécessite une présentation personnalisée pour en comprendre toutes les fonctionnalités."
        };
      default:
        return {
          title: "Accès restreint",
          description: "Cette ressource n'est pas accessible publiquement."
        };
    }
  };

  const { title, description } = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-none p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-[#059669] bg-[#059669]/10">
              <Lock className="h-6 w-6 text-[#059669]" />
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Intéressé par ce projet ?
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Contactez-nous pour obtenir plus d'informations sur l'architecture,
                les technologies utilisées et les possibilités de collaboration.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-none border-2 border-zinc-200 dark:border-zinc-800"
              >
                Fermer
              </Button>
              <Button
                asChild
                className="flex-1 rounded-none border-2 border-[#059669] bg-[#059669] text-white hover:bg-[#047857]"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}