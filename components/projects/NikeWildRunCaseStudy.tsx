"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getNextProject, getProject, projects } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";
import { motionDurations, premiumEase } from "@/components/motionConfig";
import { ProjectHero } from "./ProjectHero";
import { ExternalLinkSection } from "./ProjectGallery";
import { NextProject } from "./NextProject";

const nikeProject = getProject("nike-wild-run");

const copy = {
  en: {
    introEyebrow: "INTRODUCTION",
    introTitle: "Wild energy, built for motion.",
    introBody:
      "A fictional campaign system exploring the expressive visual world of Nike Wild Run. The project translates movement, speed and individuality into a bold advertising direction across outdoor, digital and social formats.",
    systemEyebrow: "CAMPAIGN SYSTEM",
    systemBody:
      "The campaign language combines torn-paper textures, high-contrast sports photography, loud graphic patterns and layered typography to create a raw, energetic visual system.",
    outdoorEyebrow: "OUTDOOR / ENVIRONMENT",
    outdoorBody:
      "Outdoor applications explore how the campaign could live in urban environments, from street banners to large-scale retail windows.",
    socialEyebrow: "SOCIAL MEDIA ADVERTISING",
    socialBody:
      "A set of campaign extensions designed for social media advertising, Instagram stories and digital promotion.",
    outcomeEyebrow: "OUTCOME",
    outcomeBody:
      "Nike Wild Run became an exercise in building a complete campaign language from product energy alone — turning apparel graphics into a flexible system for advertising, retail and social media.",
  },
  ja: {
    introEyebrow: "イントロダクション",
    introTitle: "野生的なエネルギーを、動きのために構築する。",
    introBody:
      "Nike Wild Runの表現豊かなビジュアル世界を探求した架空のキャンペーンシステムです。動き、スピード、個性を、屋外広告、デジタル、SNSフォーマットに展開できる大胆な広告ディレクションへ翻訳しました。",
    systemEyebrow: "キャンペーンシステム",
    systemBody:
      "破れた紙のテクスチャー、コントラストの強いスポーツフォト、強いグラフィックパターン、レイヤーされたタイポグラフィを組み合わせ、生々しくエネルギッシュなビジュアルシステムを構築しました。",
    outdoorEyebrow: "屋外広告 / 環境展開",
    outdoorBody:
      "ストリートバナーから大型リテールウィンドウまで、キャンペーンが都市環境の中でどのように存在できるかを検証しました。",
    socialEyebrow: "SNS広告",
    socialBody:
      "SNS広告、Instagramストーリーズ、デジタルプロモーションに向けたキャンペーン拡張ビジュアルです。",
    outcomeEyebrow: "アウトカム",
    outcomeBody:
      "Nike Wild Runは、プロダクトのエネルギーだけを起点に、広告、リテール、SNSへ展開できる柔軟なキャンペーン言語を構築するための実験になりました。",
  },
};

export function NikeWildRunCaseStudy() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const c = copy[language];

  if (!nikeProject) return null;

  const next = getNextProject(nikeProject.slug);
  const position = projects.findIndex((p) => p.slug === nikeProject.slug) + 1;

  return (
    <article>
      <ProjectHero
        project={nikeProject}
        position={position}
        total={projects.length}
      />

      <EditorialSection
        eyebrow={c.introEyebrow}
        title={c.introTitle}
        body={c.introBody}
      />

      <section className="page-x py-16 md:py-24 border-t border-bone-line">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <HoverReveal y={8}>
              <p className="h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
                {c.systemEyebrow}
              </p>
            </HoverReveal>
            <HoverReveal y={16} delay={0.1}>
              <p className="mt-6 body-lead leading-[1.7] max-w-md">
                {c.systemBody}
              </p>
            </HoverReveal>
          </div>
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: reduce ? 0.18 : motionDurations.media,
              ease: premiumEase,
            }}
            className="col-span-12 lg:col-span-8 overflow-hidden bg-ink-700"
          >
            <Image
              src="/projects/nike-wild-run/campaign-system.jpg"
              alt="Nike Wild Run campaign system with product visuals and graphic patterns"
              width={1838}
              height={2600}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-auto w-full"
            />
          </motion.figure>
        </div>
      </section>

      <section className="page-x py-16 md:py-24 border-t border-bone-line">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <HoverReveal y={8}>
              <p className="h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
                {c.outdoorEyebrow}
              </p>
            </HoverReveal>
            <HoverReveal y={16} delay={0.1}>
              <p className="mt-6 body-lead leading-[1.7] max-w-md">
                {c.outdoorBody}
              </p>
            </HoverReveal>
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
            <EditorialImage
              src="/projects/nike-wild-run/outdoor-1.jpg"
              alt="Nike Wild Run outdoor banner concept on a street fence"
              width={584}
              height={438}
              delay={0.12}
            />
            <EditorialImage
              src="/projects/nike-wild-run/outdoor-2.jpg"
              alt="Nike Wild Run outdoor retail banner concept"
              width={584}
              height={438}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      <section className="page-x py-16 md:py-24 border-t border-bone-line">
        <div className="mb-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <HoverReveal y={8}>
              <p className="h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
                {c.socialEyebrow}
              </p>
            </HoverReveal>
          </div>
          <HoverReveal y={16} delay={0.1} className="col-span-12 lg:col-span-7">
            <p className="body-lead leading-[1.7]">
              {c.socialBody}
            </p>
          </HoverReveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] gap-4 md:gap-5 items-start">
          <EditorialImage
            src="/projects/nike-wild-run/social-media.jpg"
            alt="Nike Wild Run social media advertising layout"
            width={1420}
            height={1900}
            delay={0.08}
          />
          <EditorialImage
            src="/projects/nike-wild-run/instagram-stories.jpg"
            alt="Nike Wild Run Instagram stories advertising concepts"
            width={1500}
            height={843}
            delay={0.16}
          />
        </div>
      </section>

      <EditorialSection
        eyebrow={c.outcomeEyebrow}
        title={c.outcomeEyebrow}
        body={c.outcomeBody}
        compact
      />

      <ExternalLinkSection project={nikeProject} />
      <NextProject next={next} />
    </article>
  );
}

function EditorialSection({
  eyebrow,
  title,
  body,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <section className="page-x pt-24 pb-16 md:pt-28 md:pb-24 border-t border-bone-line mt-20 first:mt-0">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
              {eyebrow}
            </p>
          </HoverReveal>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <HoverReveal y={20} delay={0.08}>
            <h2 className="h-display text-[clamp(2rem,4vw,3.35rem)] leading-[0.95]">
              {title}
            </h2>
          </HoverReveal>
          <HoverReveal y={14} delay={0.18}>
            <p className={`${compact ? "mt-6" : "mt-7"} body-lead leading-[1.7] max-w-3xl`}>
              {body}
            </p>
          </HoverReveal>
        </div>
      </div>
    </section>
  );
}

function EditorialImage({
  src,
  alt,
  width,
  height,
  delay,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: reduce ? 0.18 : motionDurations.media,
        delay: reduce ? 0 : delay,
        ease: premiumEase,
      }}
      className="overflow-hidden bg-ink-700"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="h-auto w-full"
      />
    </motion.figure>
  );
}
