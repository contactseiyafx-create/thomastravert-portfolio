"use client";

import { useLanguage, type Language } from "./LanguageProvider";

const languages: Language[] = ["en", "ja"];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full border border-bone-line bg-ink/35 p-1 backdrop-blur-md"
      aria-label={t("language.label")}
    >
      {languages.map((item) => {
        const active = language === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              active
                ? "bg-signal text-ink"
                : "text-bone-dim hover:text-bone"
            } ${compact ? "px-2" : ""}`}
          >
            {item === "en" ? "EN" : "JP"}
          </button>
        );
      })}
    </div>
  );
}
