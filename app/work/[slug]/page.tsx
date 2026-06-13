import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getNextProject } from "@/data/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import {
  ProjectGallery,
  MotionSection,
  ExternalLinkSection,
} from "@/components/projects/ProjectGallery";
import { NextProject } from "@/components/projects/NextProject";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  // Bespoke editorial pages take precedence over this dynamic route.
  return projects
    .filter(
      (p) =>
        p.slug !== "abelian" &&
        p.slug !== "atletec-zwift-racing-league" &&
        p.slug !== "venice-carnival",
    )
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.longDescription,
    openGraph: {
      title: `${project.title} — Travert Thomas`,
      description: project.longDescription,
      images: [{ url: project.hero.src, alt: project.hero.alt }],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const position =
    projects.findIndex((p) => p.slug === project.slug) + 1; // 1-based
  const total = projects.length;

  return (
    <article>
      <ProjectHero project={project} position={position} total={total} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <MotionSection project={project} />
      <ExternalLinkSection project={project} />
      <NextProject next={next} />
    </article>
  );
}
