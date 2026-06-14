import type { Metadata } from "next";
import { getProject } from "@/data/projects";
import { NikeWildRunCaseStudy } from "@/components/projects/NikeWildRunCaseStudy";

const project = getProject("nike-wild-run");

export const metadata: Metadata = {
  title: "Nike Wild Run",
  description:
    project?.longDescription ??
    "A fictional advertising campaign celebrating Nike Wild Run through art direction, graphic design and campaign design.",
  openGraph: {
    title: "Nike Wild Run — Travert Thomas",
    description:
      project?.longDescription ??
      "A fictional advertising campaign celebrating Nike Wild Run through art direction, graphic design and campaign design.",
    images: project
      ? [{ url: project.hero.src, alt: project.hero.alt }]
      : undefined,
  },
};

export default function NikeWildRunPage() {
  return <NikeWildRunCaseStudy />;
}
