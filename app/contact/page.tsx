import type { Metadata } from "next";
import Link from "next/link";
import { pages } from "@/data/pages";
import { contact, socials } from "@/data/socials";
import { HoverReveal } from "@/components/HoverReveal";
import { SocialIcon } from "@/components/SocialIcon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const p = pages.contact;

  return (
    <div className="pt-[var(--nav-h)] pb-32">
      <section className="page-x pt-12 pb-12">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {p.eyebrowJp}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-4">
          <HoverReveal y={80} delay={0.1}>
            <h1 className="h-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.02em] whitespace-pre-line">
              {p.title}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {p.intro}
        </HoverReveal>
      </section>

      <section className="page-x py-12 border-t border-bone-line">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.75fr)_minmax(220px,0.65fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 border-b border-bone-line pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
            <p className="h-eyebrow-dim">EMAIL</p>
            <Link
              href={`mailto:${contact.email}`}
              className="mt-4 block max-w-full break-words font-display text-[clamp(1.65rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.02em] hover:text-signal transition-colors"
            >
              {contact.emailLabel}
            </Link>
            <p className="mt-5 max-w-[34ch] font-mono text-[11px] leading-6 tracking-[0.2em] text-bone-dim uppercase">
              {p.response}
            </p>
          </div>

          <div className="border-b border-bone-line pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
            <p className="h-eyebrow-dim">LOCATION</p>
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
            <p className="h-eyebrow-dim">FOLLOW</p>
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
        <p className="h-eyebrow-dim">PROJECT INQUIRY</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.inquiryTypes.map((t) => (
            <a
              key={t}
              href={`mailto:${contact.email}?subject=${encodeURIComponent(t)} — Project inquiry`}
              className="border border-bone-line hover:border-signal hover:text-signal px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim transition-colors"
            >
              {t}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
