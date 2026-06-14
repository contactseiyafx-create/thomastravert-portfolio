"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ja";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const STORAGE_KEY = "travert-language";

const translations = {
  en: {
    "nav.work": "WORK",
    "nav.services": "SERVICES",
    "nav.2070": "2070 PROJECTS",
    "nav.motion": "MOTION",
    "nav.about": "ABOUT",
    "nav.lab": "LAB",
    "nav.contact": "CONTACT",
    "cta.create": "LET'S CREATE",
    "footer.letsCreate": "LET'S CREATE",
    "footer.location": "LOCATION",
    "footer.sitemap": "SITEMAP",
    "footer.social": "SOCIAL",
    "footer.sayHello": "SAY HELLO",
    "language.label": "Language",
    "lab.intro.eyebrow": "ACCESS GRANTED · PRIVATE ARCHIVE",
    "lab.intro.lead":
      "You found the room behind the portfolio. This is the R&D department — where ideas are prototyped, tools are built, and experiments live before they're ever finished.",
    "lab.intro.note": "Four folders. Open one and browse the archive.",
    "lab.folder.apps.label": "APPS",
    "lab.folder.apps.sub": "CODED EXPERIENCES",
    "lab.folder.apps.desc": "Interactive tools and experiments built inside the LAB.",
    "lab.folder.graphic-design.label": "GRAPHIC DESIGN",
    "lab.folder.graphic-design.sub": "POSTERS · KEY VISUALS",
    "lab.folder.graphic-design.desc":
      "Poster work, campaign visuals, sports graphics and music artwork.",
    "lab.folder.motion-design.label": "MOTION DESIGN",
    "lab.folder.motion-design.sub": "MOVING IMAGE",
    "lab.folder.motion-design.desc":
      "Motion tests, title treatments, broadcast fragments and animated studies.",
    "lab.folder.carousels.label": "CAROUSELS",
    "lab.folder.carousels.sub": "IMAGE DECKS",
    "lab.folder.carousels.desc":
      "Converted presentation decks, browsed as image-only visual stories.",
    "lab.openFolder": "Open folder",
    "lab.closeFolder": "Close folder",
    "lab.launch": "Launch",
    "lab.archive": "LAB archive",
    "lab.imageDeck": "Image deck",
    "lab.openDeck": "Open deck",
    "lab.pages": "pages",
    "lab.close": "Close",
    "lab.previous": "Previous",
    "lab.next": "Next",
    "lab.notReady": "This experience isn't ready yet.",
    "lab.slot": "slot",
    "status.live": "Live",
    "status.beta": "Beta",
    "status.in-development": "In development",
    "status.concept": "Concept",
  },
  ja: {
    "nav.work": "制作実績",
    "nav.services": "サービス",
    "nav.2070": "2070プロジェクト",
    "nav.motion": "モーション",
    "nav.about": "プロフィール",
    "nav.lab": "ラボ",
    "nav.contact": "お問い合わせ",
    "cta.create": "制作の相談",
    "footer.letsCreate": "制作の相談",
    "footer.location": "拠点",
    "footer.sitemap": "サイトマップ",
    "footer.social": "ソーシャル",
    "footer.sayHello": "お問い合わせ",
    "language.label": "言語",
    "lab.intro.eyebrow": "アクセス許可 · プライベートアーカイブ",
    "lab.intro.lead":
      "ポートフォリオの奥にある制作実験室。ここではアイデアを試作し、ツールを作り、完成前の実験を保管しています。",
    "lab.intro.note": "4つのフォルダから、気になるアーカイブを開いてください。",
    "lab.folder.apps.label": "アプリ",
    "lab.folder.apps.sub": "コードで作る体験",
    "lab.folder.apps.desc": "LAB内で制作したインタラクティブツールと実験。",
    "lab.folder.graphic-design.label": "グラフィックデザイン",
    "lab.folder.graphic-design.sub": "ポスター · キービジュアル",
    "lab.folder.graphic-design.desc":
      "ポスター、キャンペーンビジュアル、スポーツグラフィック、音楽アートワーク。",
    "lab.folder.motion-design.label": "モーションデザイン",
    "lab.folder.motion-design.sub": "映像表現",
    "lab.folder.motion-design.desc":
      "モーションテスト、タイトル表現、放送用断片、アニメーションスタディ。",
    "lab.folder.carousels.label": "カルーセル",
    "lab.folder.carousels.sub": "画像デッキ",
    "lab.folder.carousels.desc":
      "PDFではなく画像として閲覧する、プレゼンテーション形式のビジュアルストーリー。",
    "lab.openFolder": "フォルダを開く",
    "lab.closeFolder": "フォルダを閉じる",
    "lab.launch": "起動",
    "lab.archive": "LAB アーカイブ",
    "lab.imageDeck": "画像デッキ",
    "lab.openDeck": "デッキを開く",
    "lab.pages": "ページ",
    "lab.close": "閉じる",
    "lab.previous": "前へ",
    "lab.next": "次へ",
    "lab.notReady": "この体験はまだ準備中です。",
    "lab.slot": "スロット",
    "status.live": "公開中",
    "status.beta": "ベータ",
    "status.in-development": "開発中",
    "status.concept": "コンセプト",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ja") {
      setLanguageState(saved);
      return;
    }
    setLanguageState(window.navigator.language.startsWith("ja") ? "ja" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "ja" ? "ja" : "en";
    document.documentElement.dataset.language = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key) => translations[language][key] ?? translations.en[key] ?? key,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function navTranslationKey(href: string): TranslationKey {
  if (href === "/work") return "nav.work";
  if (href === "/services") return "nav.services";
  if (href === "/2070") return "nav.2070";
  if (href === "/motion") return "nav.motion";
  if (href === "/about") return "nav.about";
  if (href === "/lab") return "nav.lab";
  if (href === "/contact") return "nav.contact";
  return "nav.work";
}
