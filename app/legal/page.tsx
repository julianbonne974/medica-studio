import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales - Medica Studio",
  description: "Mentions légales du site Medica Studio",
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-8 py-24">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Mentions légales
        </h1>

        <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
          {/* Éditeur du site */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              1. Éditeur du site
            </h2>
            <p className="mb-2">
              Le site <strong>medicastudio.com</strong> (ci-après "le Site") est édité par :
            </p>
            <div className="ml-4 space-y-1">
              <p><strong>OPTIMA SANTE SOLUTIONS</strong></p>
              <p>SARL unipersonnelle au capital social de 100 €</p>
              <p>Siège social : 9 rue des Colonnes, 75002 Paris</p>
              <p>SIRET : 951 404 854</p>
              <p>RCS : Paris 951 404 854</p>
              <p>Représentée par M. Julian Bonne, agissant en qualité de Gérant</p>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              2. Directeur de publication
            </h2>
            <p>
              Le directeur de la publication du Site est <strong>M. Julian Bonne</strong>, gérant de la société OPTIMA SANTE SOLUTIONS.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              3. Contact
            </h2>
            <div className="ml-4 space-y-1">
              <p>Email : <a href="mailto:julianbonne@optimasantesolutions.com" className="text-[#059669] hover:underline">julianbonne@optimasantesolutions.com</a></p>
              <p>Adresse : 9 rue des Colonnes, 75002 Paris</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              4. Hébergement
            </h2>
            <p className="mb-2">Le Site est hébergé par :</p>
            <div className="ml-4 space-y-1">
              <p><strong>Netlify, Inc.</strong></p>
              <p>2325 3rd Street, Suite 296</p>
              <p>San Francisco, CA 94107</p>
              <p>États-Unis</p>
              <p>Site web : <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#059669] hover:underline">www.netlify.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              5. Propriété intellectuelle
            </h2>
            <p className="mb-3">
              L'ensemble des contenus présents sur le Site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.)
              est la propriété exclusive de OPTIMA SANTE SOLUTIONS ou de ses partenaires, sauf mention contraire.
            </p>
            <p className="mb-3">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site,
              quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de OPTIMA SANTE SOLUTIONS.
            </p>
            <p>
              Toute exploitation non autorisée du Site ou de l'un quelconque des éléments qu'il contient sera considérée comme
              constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du
              Code de Propriété Intellectuelle.
            </p>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              6. Limitation de responsabilité
            </h2>
            <p className="mb-3">
              OPTIMA SANTE SOLUTIONS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site,
              dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
            </p>
            <p className="mb-3">
              Toutefois, OPTIMA SANTE SOLUTIONS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations
              mises à disposition sur le Site.
            </p>
            <p>
              En conséquence, OPTIMA SANTE SOLUTIONS décline toute responsabilité pour toute imprécision, inexactitude ou omission
              portant sur des informations disponibles sur le Site.
            </p>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              7. Liens hypertextes
            </h2>
            <p className="mb-3">
              Le Site peut contenir des liens hypertextes vers d'autres sites internet. OPTIMA SANTE SOLUTIONS n'exerce aucun
              contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
            <p>
              La création de liens hypertextes vers le Site est soumise à l'accord préalable écrit de OPTIMA SANTE SOLUTIONS.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              8. Droit applicable et juridiction compétente
            </h2>
            <p className="mb-3">
              Les présentes mentions légales sont régies par le droit français.
            </p>
            <p>
              En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément
              aux règles de compétence en vigueur.
            </p>
          </section>

          {/* Dernière mise à jour */}
          <section className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <p className="text-sm italic">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
