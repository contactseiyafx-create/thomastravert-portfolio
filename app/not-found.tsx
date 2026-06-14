"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[80vh] grid place-items-center text-center page-x pt-[var(--nav-h)]">
      <div>
        <p className="h-eyebrow">{t("notFound.eyebrow")}</p>
        <h1 className="h-display text-[clamp(4rem,14vw,12rem)] leading-[0.95] mt-4 whitespace-pre-line">
          {t("notFound.title")}
        </h1>
        <p className="body-lead mt-6">
          {t("notFound.body")}
        </p>
        <Link
          href="/"
          className="cta-btn mt-8 inline-flex"
        >
          <span>{t("notFound.cta")}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="arrow">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
