import { ContactForm } from "@/components/contact-form";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      {/* Formulaire HTML statique pour Netlify Forms */}
      <form
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <input type="hidden" name="bot-field" />
      </form>

      <main className="mx-auto max-w-2xl px-8 py-32">
        <div className="space-y-16">
          {/* Title */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-medium tracking-tight md:text-6xl dark:text-zinc-100">Contact</h1>
            <Separator className="mx-auto w-24 bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Envoyez-nous un message, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  );
}