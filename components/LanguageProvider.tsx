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
    "home.hero.eyebrow": "TOKYO BASED",
    "home.hero.role": "ART DIRECTOR",
    "home.hero.roleLine2": "& SENIOR MULTIMEDIA DESIGNER",
    "home.hero.intro1": "I craft visuals that move people.",
    "home.hero.intro2": "From concept to final pixel,",
    "home.hero.intro3": "I build stories that leave a mark.",
    "home.hero.primaryCta": "VIEW MY WORK",
    "home.hero.secondaryCta": "PLAY REEL",
    "home.quote.en": "BEAUTY LIVES IN DETAILS.",
    "home.scroll": "scroll",
    "home.featured": "FEATURED PROJECTS",
    "home.viewAll": "VIEW ALL PROJECTS",
    "home.approach": "APPROACH",
    "home.approachLead": "A practice rooted in restraint, motion, and Japanese craft.",
    "home.approachTitle": "EVERY FRAME\nEARNS ITS PLACE.",
    "work.eyebrowJp": "作品",
    "work.title": "WORK",
    "work.intro":
      "Selected projects across art direction, motion, 3D and identity. A snapshot of the last twelve months.",
    "filter.ALL": "ALL",
    "filter.CLIENT WORK": "CLIENT WORK",
    "filter.ART DIRECTION": "ART DIRECTION",
    "filter.GRAPHIC DESIGN": "GRAPHIC DESIGN",
    "filter.MOTION": "MOTION",
    "filter.ILLUSTRATION": "ILLUSTRATION",
    "filter.3D": "3D",
    "filter.UI DESIGN": "UI DESIGN",
    "contact.eyebrowJp": "連絡",
    "contact.title": "LET'S\nCREATE.",
    "contact.intro":
      "Available worldwide for creative collaborations. Art Direction, Motion Design, Branding, Illustration and Digital Experiences.",
    "contact.email": "EMAIL",
    "contact.location": "LOCATION",
    "contact.follow": "FOLLOW",
    "contact.projectInquiry": "PROJECT INQUIRY",
    "contact.response": "Replies inside one working day · JST",
    "contact.inquiry.brand": "Brand identity",
    "contact.inquiry.motion": "Motion / Reel",
    "contact.inquiry.direction": "Art Direction",
    "contact.inquiry.cgi": "CGI",
    "contact.inquiry.other": "Other",
    "contact.mailSubject": "Project inquiry",
    "footer.scheduling": "Replies inside one working day · JST",
    "footer.availability": "AVAILABLE FOR NEW PROJECTS",
    "footer.rights": "ALL RIGHTS RESERVED",
    "side.tokyo": "TOKYO BASED",
    "side.role": "ART DIRECTOR",
    "side.senior": "SENIOR MULTIMEDIA DESIGNER",
    "notFound.eyebrow": "ERROR · 404",
    "notFound.title": "NOT\nFOUND",
    "notFound.body": "The page you are looking for has slipped through the cracks.",
    "notFound.cta": "RETURN HOME",
    "twenty.archive": "FUTURE ARCHIVE 001",
    "twenty.section": "2070 PROJECTS",
    "twenty.subtitle": "COMING SOON",
    "twenty.titleJp": "未来構築中",
    "twenty.tagline": "MY WORLD IS UNDER CONSTRUCTION",
    "twenty.status": "ARCHIVE STATUS INITIALIZING...",
    "twenty.location": "TOKYO, JAPAN",
    "twenty.cta": "RETURN TO PORTFOLIO",
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
    "project.backToWork": "BACK TO WORK",
    "project.client": "Client",
    "project.year": "Year",
    "project.role": "Role",
    "project.index": "Index",
    "project.tags": "Tags",
    "project.approach": "THE APPROACH",
    "project.approachTitle": "EVERY FRAME EARNS ITS PLACE.",
    "project.deliverables": "DELIVERABLES",
    "project.highlights": "HIGHLIGHTS",
    "project.visualGallery": "VISUAL GALLERY",
    "project.motion": "MOTION DESIGN",
    "project.external": "EXTERNAL",
    "project.viewBehance": "View Full Project on Behance",
    "project.viewProject": "View Full Project",
    "project.view": "VIEW",
    "project.viewProjectShort": "VIEW PROJECT",
    "project.nextProject": "NEXT PROJECT",
    "project.enter": "ENTER",
    "project.noProjects": "No projects in this category yet — check back soon.",
    "project.viewMode": "VIEW",
    "project.listView": "List view",
    "project.gridView": "Grid view",
    "motion.eyebrowJp": "動き",
    "motion.title": "MOTION\nREEL",
    "motion.intro":
      "A rolling cut of recent motion work — title sequences, brand films, product motion, and original experiments.",
    "motion.featured.eyebrowJp": "リール",
    "motion.featured.sectionLabel": "FEATURED REEL · CLIENT WORK",
    "motion.featured.countLabel": "MOTION 001",
    "motion.featured.title": "SORARE\nMOTION REEL",
    "motion.featured.client": "Sorare",
    "motion.featured.category": "MOTION DESIGN / REEL",
    "motion.featured.intro":
      "Motion direction and editing for Sorare — a 2023 reel cut across product launches, on-card moments and brand films.",
    "motion.downloadReel": "DOWNLOAD REEL (.MP4)",
    "motion.playlist.eyebrowJp": "選集",
    "motion.playlist.sectionLabel": "SELECTED MOTION WORK",
    "motion.playlist.title": "MOTION\nARCHIVE",
    "motion.playlist.intro":
      "An evolving archive of motion experiments, title sequences and brand films — sequenced by the artist on YouTube.",
    "motion.playlist.countLabel": "ARCHIVE 001",
    "motion.playlist.meta": "Playlist · ARCHIVE 001 · Hosted on YouTube",
    "motion.openYoutube": "OPEN ON YOUTUBE",
    "youtube.playlist": "PLAYLIST",
    "youtube.platform": "YOUTUBE",
    "youtube.pressPlay": "PRESS PLAY · OPENS IN PLACE",
    "youtube.privacy": "PRIVACY-ENHANCED",
    "youtube.playAria": "Play playlist",
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
    "home.hero.eyebrow": "東京拠点",
    "home.hero.role": "アートディレクター",
    "home.hero.roleLine2": "& シニアマルチメディアデザイナー",
    "home.hero.intro1": "人の心を動かすビジュアルを制作します。",
    "home.hero.intro2": "コンセプトから最後のピクセルまで、",
    "home.hero.intro3": "記憶に残る物語を構築します。",
    "home.hero.primaryCta": "制作実績を見る",
    "home.hero.secondaryCta": "リールを見る",
    "home.quote.en": "美は細部に宿る。",
    "home.scroll": "スクロール",
    "home.featured": "注目プロジェクト",
    "home.viewAll": "すべての制作実績を見る",
    "home.approach": "アプローチ",
    "home.approachLead": "抑制、モーション、日本的なクラフト感覚を軸にした制作姿勢。",
    "home.approachTitle": "すべてのフレームに\n意味を持たせる。",
    "work.eyebrowJp": "制作実績",
    "work.title": "制作実績",
    "work.intro":
      "アートディレクション、モーション、3D、アイデンティティを横断したプロジェクトを厳選して掲載しています。",
    "filter.ALL": "すべて",
    "filter.CLIENT WORK": "クライアントワーク",
    "filter.ART DIRECTION": "アートディレクション",
    "filter.GRAPHIC DESIGN": "グラフィックデザイン",
    "filter.MOTION": "モーション",
    "filter.ILLUSTRATION": "イラストレーション",
    "filter.3D": "3D",
    "filter.UI DESIGN": "UIデザイン",
    "contact.eyebrowJp": "お問い合わせ",
    "contact.title": "一緒に\nつくりましょう。",
    "contact.intro":
      "世界中のクリエイティブコラボレーションに対応しています。アートディレクション、モーションデザイン、ブランディング、イラストレーション、デジタル体験までご相談ください。",
    "contact.email": "メール",
    "contact.location": "拠点",
    "contact.follow": "フォロー",
    "contact.projectInquiry": "プロジェクト相談",
    "contact.response": "1営業日以内に返信します · JST",
    "contact.inquiry.brand": "ブランドアイデンティティ",
    "contact.inquiry.motion": "モーション / リール",
    "contact.inquiry.direction": "アートディレクション",
    "contact.inquiry.cgi": "CGI",
    "contact.inquiry.other": "その他",
    "contact.mailSubject": "プロジェクト相談",
    "footer.scheduling": "1営業日以内に返信します · JST",
    "footer.availability": "新規プロジェクト受付中",
    "footer.rights": "無断転載を禁じます",
    "side.tokyo": "東京拠点",
    "side.role": "アートディレクター",
    "side.senior": "シニアマルチメディアデザイナー",
    "notFound.eyebrow": "エラー · 404",
    "notFound.title": "ページが\n見つかりません",
    "notFound.body": "お探しのページは見つかりませんでした。",
    "notFound.cta": "ホームへ戻る",
    "twenty.archive": "未来アーカイブ 001",
    "twenty.section": "2070プロジェクト",
    "twenty.subtitle": "近日公開",
    "twenty.titleJp": "未来構築中",
    "twenty.tagline": "新しい世界を構築中です",
    "twenty.status": "アーカイブ初期化中...",
    "twenty.location": "東京、日本",
    "twenty.cta": "ポートフォリオへ戻る",
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
    "project.backToWork": "制作実績へ戻る",
    "project.client": "クライアント",
    "project.year": "年",
    "project.role": "担当",
    "project.index": "番号",
    "project.tags": "タグ",
    "project.approach": "アプローチ",
    "project.approachTitle": "すべてのフレームに意味を持たせる。",
    "project.deliverables": "制作物",
    "project.highlights": "ハイライト",
    "project.visualGallery": "ビジュアルギャラリー",
    "project.motion": "モーションデザイン",
    "project.external": "外部リンク",
    "project.viewBehance": "Behanceで詳しく見る",
    "project.viewProject": "プロジェクトを見る",
    "project.view": "見る",
    "project.viewProjectShort": "プロジェクトを見る",
    "project.nextProject": "次のプロジェクト",
    "project.enter": "開く",
    "project.noProjects": "このカテゴリーのプロジェクトはまだありません。",
    "project.viewMode": "表示",
    "project.listView": "リスト表示",
    "project.gridView": "グリッド表示",
    "motion.eyebrowJp": "モーション",
    "motion.title": "モーション\nリール",
    "motion.intro":
      "近年のモーションワークをまとめたリール。タイトルシーケンス、ブランドフィルム、プロダクトモーション、オリジナル実験を収録しています。",
    "motion.featured.eyebrowJp": "注目リール",
    "motion.featured.sectionLabel": "注目リール · クライアントワーク",
    "motion.featured.countLabel": "モーション 001",
    "motion.featured.title": "SORARE\nモーションリール",
    "motion.featured.client": "Sorare",
    "motion.featured.category": "モーションデザイン / リール",
    "motion.featured.intro":
      "Sorareのためのモーションディレクションと編集。2023年のリールとして、プロダクトローンチ、カード演出、ブランドフィルムを横断して構成しました。",
    "motion.downloadReel": "リールをダウンロード（.MP4）",
    "motion.playlist.eyebrowJp": "選集",
    "motion.playlist.sectionLabel": "モーション作品選集",
    "motion.playlist.title": "モーション\nアーカイブ",
    "motion.playlist.intro":
      "モーション実験、タイトルシーケンス、ブランドフィルムをYouTube上で構成した、進化し続けるアーカイブです。",
    "motion.playlist.countLabel": "アーカイブ 001",
    "motion.playlist.meta": "プレイリスト · アーカイブ 001 · YouTubeで公開",
    "motion.openYoutube": "YouTubeで開く",
    "youtube.playlist": "プレイリスト",
    "youtube.platform": "YouTube",
    "youtube.pressPlay": "再生 · この場で開く",
    "youtube.privacy": "プライバシー強化",
    "youtube.playAria": "プレイリストを再生",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = getStoredLanguage();
    if (saved === "en" || saved === "ja") {
      setLanguageState(saved);
      return;
    }
    setLanguageState(window.navigator.language.startsWith("ja") ? "ja" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "ja" ? "ja" : "en";
    document.documentElement.dataset.language = language;
    storeLanguage(language);
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

function getStoredLanguage(): Language | null {
  try {
    const saved = window.localStorage?.getItem(STORAGE_KEY);
    return saved === "en" || saved === "ja" ? saved : null;
  } catch {
    return null;
  }
}

function storeLanguage(language: Language) {
  try {
    window.localStorage?.setItem(STORAGE_KEY, language);
  } catch {
    // Some embedded browsers disable localStorage; the in-memory state still works.
  }
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
