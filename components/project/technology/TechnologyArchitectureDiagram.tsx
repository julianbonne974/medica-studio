"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Globe,
  Cpu,
  Zap,
  Lock,
  Cloud,
  GitBranch,
  Activity,
  Server
} from "lucide-react";

interface ArchitectureComponent {
  title: string;
  icon: any;
  description: string;
  technologies: string[];
  color: string;
}

export function TechnologyArchitectureDiagram() {
  const coreComponents: ArchitectureComponent[] = [
    {
      title: "Core MCP Engine",
      icon: Cpu,
      description: "Moteur principal gérant les connexions MCP et le routage",
      technologies: ["TypeScript", "MCP SDK", "WebSocket"],
      color: "border-[#059669] bg-[#059669]/5"
    },
    {
      title: "FHIR Translator",
      icon: GitBranch,
      description: "Conversion bidirectionnelle formats propriétaires ↔ FHIR R4",
      technologies: ["FHIR R4", "HL7", "JSON-LD"],
      color: "border-blue-600 bg-blue-600/5"
    },
    {
      title: "Security Gateway",
      icon: Shield,
      description: "Authentification OAuth 2.0 et chiffrement bout-en-bout",
      technologies: ["OAuth 2.0", "AES-256", "JWT"],
      color: "border-orange-600 bg-orange-600/5"
    }
  ];

  const dataComponents: ArchitectureComponent[] = [
    {
      title: "Cache Layer",
      icon: Zap,
      description: "Optimisation des performances avec mise en cache",
      technologies: ["Redis", "In-Memory Cache"],
      color: "border-purple-600 bg-purple-600/5"
    },
    {
      title: "Data Store",
      icon: Database,
      description: "Stockage persistant et indexation FHIR",
      technologies: ["PostgreSQL", "Elasticsearch"],
      color: "border-indigo-600 bg-indigo-600/5"
    },
    {
      title: "Event Bus",
      icon: Activity,
      description: "Architecture événementielle temps réel",
      technologies: ["RabbitMQ", "WebSocket"],
      color: "border-pink-600 bg-pink-600/5"
    }
  ];

  const externalConnectors: ArchitectureComponent[] = [
    {
      title: "EMR/DPI",
      icon: Server,
      description: "Dossiers Patients Informatisés",
      technologies: ["REST API", "SOAP"],
      color: "border-zinc-600 bg-zinc-600/5"
    },
    {
      title: "IoT Medical",
      icon: Activity,
      description: "Dispositifs médicaux connectés",
      technologies: ["MQTT", "Bluetooth"],
      color: "border-zinc-600 bg-zinc-600/5"
    },
    {
      title: "Télémédecine",
      icon: Globe,
      description: "Plateformes de consultation",
      technologies: ["WebRTC", "HTTPS"],
      color: "border-zinc-600 bg-zinc-600/5"
    }
  ];

  const renderComponentCard = (component: ArchitectureComponent, index: number, delay: number) => {
    const Icon = component.icon;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + index * 0.1 }}
        className={`border-2 p-4 sm:p-6 ${component.color} hover:scale-105 transition-transform`}
      >
        <Icon className="mb-3 h-8 w-8 text-current opacity-80" />
        <h4 className="mb-2 text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          {component.title}
        </h4>
        <p className="mb-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {component.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-[10px] sm:text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Architecture du système
        </motion.h2>

        <div className="space-y-12">
          {/* Core Components */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Composants principaux
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coreComponents.map((component, index) =>
                renderComponentCard(component, index, 0)
              )}
            </div>
          </div>

          {/* Flow Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#059669]" />
              <Cloud className="h-8 w-8 text-[#059669]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#059669]" />
            </div>
          </motion.div>

          {/* Data Components */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Gestion des données
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dataComponents.map((component, index) =>
                renderComponentCard(component, index, 0.2)
              )}
            </div>
          </div>

          {/* Flow Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#059669]" />
              <Lock className="h-8 w-8 text-[#059669]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#059669]" />
            </div>
          </motion.div>

          {/* External Connectors */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Connecteurs externes
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {externalConnectors.map((component, index) =>
                renderComponentCard(component, index, 0.4)
              )}
            </div>
          </div>

          {/* Central Hub Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 border-2 border-[#059669] bg-gradient-to-br from-[#059669]/5 to-[#059669]/10 p-8"
          >
            <div className="text-center">
              <Cpu className="mx-auto mb-4 h-12 w-12 text-[#059669]" />
              <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Hub MCPmed
              </h3>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                Point central d'interconnexion FHIR
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="rounded-none bg-[#059669] px-3 py-1 text-xs text-white">
                  10K req/s
                </span>
                <span className="rounded-none bg-[#059669] px-3 py-1 text-xs text-white">
                  &lt; 100ms latence
                </span>
                <span className="rounded-none bg-[#059669] px-3 py-1 text-xs text-white">
                  99.99% uptime
                </span>
                <span className="rounded-none bg-[#059669] px-3 py-1 text-xs text-white">
                  140+ ressources FHIR
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}