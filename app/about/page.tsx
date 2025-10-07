"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import {
  Code2,
  Heart,
  Shield,
  Sparkles,
  Users,
  Mail,
  MapPin,
  Linkedin,
  ChevronRight,
  CheckCircle2,
  Zap,
  Target,
  Award
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Projets réalisés", value: "20+", icon: Award },
    { label: "Années d'expérience", value: "5+", icon: Zap },
    { label: "Technologies maîtrisées", value: "25+", icon: Code2 },
    { label: "Domaines d'expertise", value: "3", icon: Target },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Adopter les dernières technologies pour créer des solutions avant-gardistes adaptées aux besoins du secteur médical."
    },
    {
      icon: Shield,
      title: "Confidentialité & Sécurité",
      description: "Protection rigoureuse des données de santé conformément aux normes RGPD et respect du secret médical."
    },
    {
      icon: Heart,
      title: "Impact Social",
      description: "Développer des outils qui améliorent concrètement le quotidien des professionnels de santé et de leurs patients."
    },
    {
      icon: Users,
      title: "Excellence Technique",
      description: "Maîtrise approfondie des technologies modernes et méthodologies agiles pour garantir la qualité des projets."
    }
  ];

  const technologies = [
    "Flutter", "FlutterFlow", "Firebase", "Node.js", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "Firebase Auth", "Firebase Firestore", "Firebase Cloud Functions",
    "Algolia Search", "Stripe", "Google Maps API", "Push Notifications", "OCR",
    "Biometric Auth", "iOS", "Android", "PWA", "pdf-parse", "Regex", "Framer Motion",
    "GitHub Actions", "Netlify"
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Analyse",
      description: "Audit des besoins métier, cartographie des processus existants, identification des points de friction et définition des objectifs mesurables."
    },
    {
      number: "02",
      title: "Design & Architecture",
      description: "Conception UX/UI adaptée aux professionnels de santé, architecture technique scalable, wireframes et prototypes interactifs."
    },
    {
      number: "03",
      title: "Développement",
      description: "Sprints de 2 semaines, livraisons incrémentales, feedback continu, tests automatisés et reviews de code systématiques."
    },
    {
      number: "04",
      title: "Déploiement & Monitoring",
      description: "CI/CD automatisé, déploiement progressif, monitoring temps réel, support post-lancement et itérations basées sur les données."
    }
  ];

  const expertise = [
    {
      title: "Healthtech & Santé Numérique",
      items: [
        "Applications mobiles médicales (iOS/Android/PWA)",
        "Plateformes de télémédecine et coordination de soins",
        "Systèmes de gestion HAD (Hospitalisation À Domicile)",
        "Outils de matching et recrutement médical",
        "Parsers de nomenclature (NGAP, CCAM)"
      ]
    },
    {
      title: "Backend & Infrastructure",
      items: [
        "Architecture Firebase (Auth, Firestore, Functions, Storage)",
        "APIs Node.js et Cloud Functions serverless",
        "Intégrations tierces (Stripe, Algolia, Google Maps)",
        "Parsing PDF et traitement de documents",
        "Webhooks et automatisations"
      ]
    },
    {
      title: "Frontend & UX",
      items: [
        "Applications Flutter natives et FlutterFlow",
        "Interfaces React/Next.js avec Tailwind CSS",
        "Design systems cohérents et accessibles",
        "Animations Framer Motion",
        "Progressive Web Apps (PWA)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-900">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-100">
              À propos
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-zinc-600 dark:text-zinc-400">
              Medica Studio développe des solutions technologiques innovantes pour le secteur médical,
              en combinant expertise juridique et excellence technique.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border-2 border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-[#059669]" />
                <div className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block rounded-none bg-[#059669] px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  Fondateur
                </span>
              </div>
              <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                Julian Bonne
              </h2>
              <p className="mb-4 text-xl font-medium text-[#059669]">
                Associé Fondateur & Full-Stack Developer
              </p>

              <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <p>
                  Diplômé d'un Master en Droit Fiscal des Entreprises et d'un Master 2 en Ingénierie et Gestion de Patrimoine
                  (certification AMF), j'ai fondé <strong>Optima Santé Solutions</strong>, cabinet de conseil spécialisé dans
                  l'accompagnement juridique et fiscal des professionnels de santé.
                </p>
                <p>
                  Face aux défis technologiques rencontrés dans l'exercice du conseil juridique, j'ai développé une expertise
                  en ingénierie logicielle pour créer des solutions sur mesure. Cette double compétence m'a conduit à fonder
                  <strong> Medica Studio</strong>, structure dédiée au développement d'applications et de systèmes innovants
                  pour le secteur médical.
                </p>
                <p>
                  Aujourd'hui, ces deux entités complémentaires permettent d'offrir une approche unique : une compréhension
                  approfondie des enjeux juridiques et opérationnels du secteur médical, combinée à une maîtrise des
                  technologies les plus avancées pour y répondre efficacement.
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:julianbonne@optimasantesolutions.com"
                  className="flex items-center gap-3 text-zinc-600 transition-colors hover:text-[#059669] dark:text-zinc-400"
                >
                  <Mail className="h-5 w-5" />
                  <span>julianbonne@optimasantesolutions.com</span>
                </a>
                <a
                  href="https://fr.linkedin.com/in/julian-bonne-bb4a75172"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-600 transition-colors hover:text-[#059669] dark:text-zinc-400"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Julian Bonne</span>
                </a>
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-5 w-5" />
                  <span>Bordeaux • Paris • Île de la Réunion</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Formation
                </h3>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Master Droit Fiscal des Entreprises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Master 2 Ingénierie et Gestion de Patrimoine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Certification AMF</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Stack Technique Favorite
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["FlutterFlow", "Firebase", "Node.js", "TypeScript", "Next.js"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-none border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Expertise
                </h3>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Applications mobiles santé (Flutter/FlutterFlow)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Architectures Firebase scalables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Optimisation juridique et tech pour médecins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#059669]" />
                    <span>Intégrations IA (Gemini, chatbots médicaux)</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Notre Mission
            </h2>
            <div className="mx-auto max-w-4xl space-y-6">
              <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-zinc-100">Medica Studio</strong> développe des projets innovants dans la santé
                et intègre des solutions technologiques sur mesure pour les entreprises du secteur médical.
              </p>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Notre double expertise juridique et technique nous permet de comprendre en profondeur les enjeux métier
                des professionnels de santé et de créer des outils numériques qui répondent à leurs besoins réels,
                tout en respectant les contraintes réglementaires du secteur.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Nos Valeurs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Les principes qui guident chaque projet que nous développons
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-2 border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <value.icon className="mb-4 h-10 w-10 text-[#059669]" />
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Notre Processus
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Une méthodologie éprouvée pour transformer vos idées en solutions concrètes
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="border-2 border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="mb-4 text-5xl font-bold text-[#059669] opacity-20">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ChevronRight className="h-8 w-8 text-[#059669]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Domaines d'Expertise
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {expertise.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-2 border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {domain.title}
                </h3>
                <ul className="space-y-3">
                  {domain.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#059669]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Technologies Maîtrisées
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              25+ technologies et frameworks pour créer des solutions performantes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-none border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-[#059669] hover:text-[#059669] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Un projet en tête ?
            </h2>
            <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
              Discutons de votre projet et voyons comment Medica Studio peut vous accompagner
              dans la création de votre solution numérique médicale.
            </p>
            <a
              href="mailto:julianbonne@optimasantesolutions.com"
              className="inline-flex items-center gap-2 border-2 border-[#059669] bg-[#059669] px-8 py-4 font-medium text-white transition-all hover:bg-transparent hover:text-[#059669]"
            >
              <Mail className="h-5 w-5" />
              Contactez-nous
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
