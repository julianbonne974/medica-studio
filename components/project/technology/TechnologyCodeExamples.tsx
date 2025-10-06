"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { TechnologyProject } from "@/types/project";

interface TechnologyCodeExamplesProps {
  codeExamples: TechnologyProject["codeExamples"];
}

export function TechnologyCodeExamples({ codeExamples }: TechnologyCodeExamplesProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!codeExamples || codeExamples.length === 0) return null;

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Exemples de code
        </motion.h2>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {codeExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`rounded-none border-2 px-4 py-2 text-sm font-medium transition-all ${
                activeTab === index
                  ? "border-[#059669] bg-[#059669] text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Code Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden border-2 border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex items-center justify-between border-b-2 border-zinc-200 bg-zinc-100 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {codeExamples[activeTab].language}
            </span>
          </div>
          <SyntaxHighlighter
            language={codeExamples[activeTab].language.toLowerCase()}
            style={atomDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
            showLineNumbers
          >
            {codeExamples[activeTab].code}
          </SyntaxHighlighter>
        </motion.div>
      </div>
    </section>
  );
}
