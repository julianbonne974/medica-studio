import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-3xl px-8 py-32">
        <div className="space-y-16 text-center">
          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-5xl font-medium tracking-tight md:text-6xl">À propos</h1>
            <Separator className="mx-auto w-24 bg-zinc-200" />
          </div>

          {/* Content */}
          <div className="space-y-12">
            <p className="text-xl leading-relaxed text-zinc-600 md:text-2xl">
              Medica Studio est une société tech spécialisée dans les projets médicaux innovants.
            </p>

            <p className="text-lg leading-relaxed text-zinc-600 md:text-xl">
              Notre mission est de créer des solutions technologiques qui améliorent le quotidien
              des professionnels de santé.
            </p>

            <div className="pt-8">
              <p className="text-base leading-relaxed text-zinc-500">
                Nous combinons expertise technique et compréhension approfondie des enjeux du
                secteur médical pour développer des outils numériques sur mesure, pensés pour
                répondre aux besoins réels des praticiens et établissements de santé.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
