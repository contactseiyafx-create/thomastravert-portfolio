import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectFeatureCard } from "@/components/projects/ProjectCard";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";

export default function HomePage() {
  // Resolve the featured-project slugs declared in site.ts
  const featured = site.featuredProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  return (
    <>
      <Hero />

      {/* FEATURED PROJECTS STRIP */}
      <section className="page-x pt-24 pb-32">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-10">
          <HoverReveal y={16}>
            <p className="h-eyebrow">FEATURED PROJECTS</p>
          </HoverReveal>
          <Link
            href="/work"
            className="link-arrow text-bone hover:text-signal transition-colors"
          >
            <span>VIEW ALL PROJECTS</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="arrow">
              <path
                d="M2 8L8 2M8 2H3M8 2V7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProjectFeatureCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* SCROLL EXPERIENCE — manifesto strip */}
      <section className="page-x pb-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <HoverReveal y={16}>
              <p className="h-eyebrow">APPROACH</p>
            </HoverReveal>
            <HoverReveal y={20} delay={0.1} className="mt-4 body-lead max-w-xs">
              A practice rooted in restraint, motion, and Japanese craft.
            </HoverReveal>
          </div>

          <div className="col-span-12 lg:col-span-9 overflow-hidden">
            <HoverReveal y={70}>
              <h2 className="h-display text-[clamp(2.6rem,7vw,7rem)]">
                EVERY FRAME
                <br />
                EARNS ITS PLACE.
              </h2>
            </HoverReveal>
          </div>
        </div>
      </section>
    </>
  );
}
