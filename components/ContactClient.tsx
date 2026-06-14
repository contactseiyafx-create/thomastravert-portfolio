"use client";

import Link from "next/link";
import { contact, socials } from "@/data/socials";
import { HoverReveal } from "@/components/HoverReveal";
import { SocialIcon } from "@/components/SocialIcon";
import { useLanguage } from "@/components/LanguageProvider";

export function ContactClient() {
  const { t } = useLanguage();
  const inquiryTypes = [
    t("contact.inquiry.brand"),
    t("contact.inquiry.motion"),
    t("contact.inquiry.direction"),
    t("contact.inquiry.cgi"),
    t("contact.inquiry.other"),
  ];

  return (
    <div className="pt-[var(--nav-h)] pb-32">
      <section className="page-x pt-12 pb-12">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {t("contact.eyebrowJp")}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-4">
          <HoverReveal y={80} delay={0.1}>
            <h1 className="h-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.02em] whitespace-pre-line">
              {t("contact.title")}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {t("contact.intro")}
        </HoverReveal>
      </section>

      <section className="page-x py-12 border-t border-bone-line">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.75fr)_minmax(220px,0.65fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 border-b border-bone-line pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
            <p className="h-eyebrow-dim">{t("contact.email")}</p>
            <Link
              href={`mailto:${contact.email}`}
              className="mt-4 block max-w-full break-words font-display text-[clamp(1.65rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.02em] hover:text-signal transition-colors"
            >
              {contact.emailLabel}
            </Link>
            <p className="mt-5 max-w-[34ch] font-mono text-[11px] leading-6 tracking-[0.2em] text-bone-dim uppercase">
              {t("contact.response")}
            </p>
          </div>

          <div className="border-b border-bone-line pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
            <p className="h-eyebrow-dim">{t("contact.location")}</p>
            <p className="mt-4 font-mono text-[12px] leading-6 tracking-[0.18em] text-bone uppercase">
              {contact.location}
            </p>
            <p className="mt-1 font-jp text-base text-bone-dim">
              {contact.locationJp}
            </p>
            <p className="mt-5 font-mono text-[11px] leading-6 tracking-[0.22em] uppercase text-bone-dim">
              {contact.timezone}
            </p>
          </div>

          <div>
            <p className="h-eyebrow-dim">{t("contact.follow")}</p>
            <ul className="mt-4 space-y-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.16em] uppercase text-bone-dim hover:text-bone transition-colors"
                  >
                    <SocialIcon name={s.icon} className="h-4 w-4 shrink-0" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-x py-12 border-t border-bone-line">
        <p className="h-eyebrow-dim">{t("contact.projectInquiry")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {inquiryTypes.map((type) => (
            <a
              key={type}
              href={`mailto:${contact.email}?subject=${encodeURIComponent(`${type} — ${t("contact.mailSubject")}`)}`}
              className="border border-bone-line hover:border-signal hover:text-signal px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim transition-colors"
            >
              {type}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
