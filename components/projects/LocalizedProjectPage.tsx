"use client";

import type { ReactNode } from "react";
import { projects, getProject, getNextProject } from "@/data/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import {
  ProjectGallery,
  MotionSection,
  ExternalLinkSection,
} from "@/components/projects/ProjectGallery";
import { NextProject } from "@/components/projects/NextProject";
import { useLanguage } from "@/components/LanguageProvider";

export function LocalizedProjectPage({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const project = getProject(slug);

  if (language !== "ja" || !project) return <>{children}</>;

  const next = getNextProject(project.slug);
  const position = projects.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <article>
      <ProjectHero project={project} position={position} total={projects.length} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <MotionSection project={project} />
      <ExternalLinkSection project={project} />
      <NextProject next={next} />
    </article>
  );
}
