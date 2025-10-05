"use client";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-2xl px-8 py-32">
        <div className="space-y-16">
          {/* Title */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-medium tracking-tight md:text-6xl">Contact</h1>
            <Separator className="mx-auto w-24 bg-zinc-200" />
            <p className="text-lg text-zinc-600">
              Envoyez-nous un message, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-700">
                Nom
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                className="border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                className="border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-700">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Votre message..."
                rows={8}
                className="resize-none border-zinc-200 bg-zinc-50 shadow-none transition-colors focus:bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full border border-zinc-900 bg-zinc-900 py-6 font-medium shadow-none transition-colors hover:bg-zinc-800"
            >
              Envoyer
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
