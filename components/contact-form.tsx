"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        analytics.contactFormSubmit();
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          {/* Honeypot field */}
          <p className="hidden">
            <label>
              Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
            </label>
          </p>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nom
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              required
              className="border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre.email@exemple.com"
              required
              className="border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Votre message..."
              rows={8}
              required
              className="resize-none border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
            />
          </div>

          <Button
            type="submit"
            className="w-full border border-zinc-900 bg-zinc-900 py-6 font-medium shadow-none transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Envoyer
          </Button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 py-16"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900">
            <Check className="h-10 w-10 text-zinc-900 dark:text-zinc-100" strokeWidth={2.5} />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Message envoyé !</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-8 border-zinc-200 bg-white shadow-none transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Envoyer un autre message
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}