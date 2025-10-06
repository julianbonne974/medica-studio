"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function ProjectCTA({
  title = "Intéressé par ce projet ?",
  description = "Discutons de vos besoins et voyons comment nous pouvons vous aider.",
  buttonText = "Nous contacter",
  buttonLink = "/contact",
  className = "",
}: ProjectCTAProps) {
  return (
    <Card className={`border-2 border-[#059669] bg-zinc-50 shadow-none dark:bg-zinc-900 ${className}`}>
      <CardContent className="p-8 text-center">
        <h3 className="mb-3 text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">{description}</p>
        <Button
          asChild
          className="rounded-none border-2 border-[#059669] bg-[#059669] text-white hover:bg-[#047857]"
        >
          <Link href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
