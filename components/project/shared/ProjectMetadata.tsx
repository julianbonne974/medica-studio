"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ProjectMetadataProps {
  metadata: {
    year: string;
    [key: string]: any;
  };
  className?: string;
}

export function ProjectMetadata({ metadata, className = "" }: ProjectMetadataProps) {
  const entries = Object.entries(metadata).filter(([key]) => key !== "phase");

  return (
    <Card className={`border-2 border-zinc-200 shadow-none dark:border-zinc-800 ${className}`}>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Informations
        </h3>
        <dl className="space-y-3">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <dt className="text-sm font-medium capitalize text-zinc-600 dark:text-zinc-400">
                {key === "year"
                  ? "Année"
                  : key === "team"
                  ? "Équipe"
                  : key === "client"
                  ? "Client"
                  : key === "duration"
                  ? "Durée"
                  : key === "version"
                  ? "Version"
                  : key}
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
