"use client";

import type {
  Highlight,
  MotionVideo,
  Project,
  ProjectImage,
} from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";

export function useProjectCopy(project: Project) {
  const { language } = useLanguage();
  const locale = language === "ja" ? project.i18n?.ja : undefined;

  return {
    title: locale?.title ?? project.title,
    subtitle: locale?.subtitle ?? project.subtitle,
    category: locale?.category ?? project.category,
    shortDescription: locale?.shortDescription ?? project.shortDescription,
    longDescription: locale?.longDescription ?? project.longDescription,
    client: locale?.client ?? project.client,
    role: locale?.role ?? project.role,
    deliverables: locale?.deliverables ?? project.deliverables,
    disclaimer: locale?.disclaimer ?? project.disclaimer,
    galleryCaption: (img: ProjectImage, index: number) =>
      locale?.gallery?.[index]?.caption ?? img.caption,
    galleryAlt: (img: ProjectImage, index: number) =>
      locale?.gallery?.[index]?.alt ?? img.alt,
    highlights: locale?.highlights ?? project.highlights,
    motionTitle: locale?.motion?.title ?? project.motion?.title,
    motionDescription:
      locale?.motion?.description ?? project.motion?.description,
    motionCaption: locale?.motion?.caption ?? project.motion?.caption,
    motionVideoTitle: (video: MotionVideo, index: number) =>
      locale?.motion?.videos?.[index]?.title ?? video.title,
    motionVideoCaption: (video: MotionVideo, index: number) =>
      locale?.motion?.videos?.[index]?.caption ?? video.caption,
  };
}

export function resolveHighlights(project: Project, language: "en" | "ja") {
  return language === "ja"
    ? project.i18n?.ja?.highlights ?? project.highlights
    : project.highlights;
}
