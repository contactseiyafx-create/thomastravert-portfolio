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
            <h1 className="h-display text-[clamp(3rem,11vw,10rem)] whitespace-pre-line">
              {p.title}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {p.intro}
        </HoverReveal>
      </section>

      <section className="page-x grid grid-cols-12 gap-6 py-12 border-t border-bone-line">
        <div className="col-span-12 lg:col-span-5">
          <p className="h-eyebrow-dim">EMAIL</p>
          <Link
            href={`mailto:${contact.email}`}
            className="mt-3 inline-block font-display text-3xl md:text-5xl tracking-tight hover:text-signal transition-colors"
          >
            {contact.emailLabel}
          </Link>
          <p className="mt-3 font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase">
            {p.response}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <p className="h-eyebrow-dim">LOCATION</p>
          <p className="mt-3 font-mono text-[12px] tracking-[0.18em] text-bone uppercase">
            {contact.location}
          </p>
          <p className="mt-1 font-jp text-base text-bone-dim">
            {contact.locationJp}
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
            {contact.timezone}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <p className="h-eyebrow-dim">FOLLOW</p>
          <ul className="mt-3 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] uppercase text-bone-dim hover:text-bone transition-colors"
                >
                  <SocialIcon name={s.icon} className="w-4 h-4" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
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
