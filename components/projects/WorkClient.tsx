"use client";

import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";

export function WorkClient() {
  const { t } = useLanguage();

  return (
    <div className="pt-[var(--nav-h)]">
      <section className="page-x pt-12 pb-4">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {t("work.eyebrowJp")}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-4">
          <HoverReveal y={80} delay={0.1}>
            <h1 className="h-display text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-[-0.025em]">
              {t("work.title")}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {t("work.intro")}
        </HoverReveal>
      </section>

      <section className="pt-6 pb-10">
        <ProjectGrid />
      </section>
    </div>
  );
}
