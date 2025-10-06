"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

interface ProjectViewTrackerProps {
  projectTitle: string;
  projectSlug: string;
}

export function ProjectViewTracker({ projectTitle, projectSlug }: ProjectViewTrackerProps) {
  useEffect(() => {
    analytics.projectView(projectTitle, projectSlug);
  }, [projectTitle, projectSlug]);

  return null;
}
