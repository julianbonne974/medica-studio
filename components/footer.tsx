"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Mailchimp API
    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              À propos
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Solutions numériques innovantes pour le secteur de la santé
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@medicastudio.com"
                className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Projets */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Projets
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects/linkemed"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Linkemed
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/the-doctors-club"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  The Doctor&apos;s Club
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/hadconnect-plus"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  HADconnect+
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/mcpmed"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  MCPmed
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@medicastudio.com"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  contact@medicastudio.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Newsletter
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Restez informé de nos dernières innovations
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-zinc-300 bg-white shadow-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-100"
              />
              <Button
                type="submit"
                className="group w-full rounded-none border border-zinc-900 bg-zinc-900 font-medium shadow-none transition-all hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {subscribed ? (
                  "Abonné ✓"
                ) : (
                  <>
                    S&apos;abonner
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row dark:text-zinc-400">
            <p>© 2025 Medica Studio. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link
                href="/legal"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Mentions légales
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
