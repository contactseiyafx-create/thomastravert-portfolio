"use client";

import type {
  Highlight,
  MotionVideo,
  Project,
  ProjectImage,
} from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";

const categoryJa: Record<string, string> = {
  "CLIENT WORK": "クライアントワーク",
  "ART DIRECTION": "アートディレクション",
  "GRAPHIC DESIGN": "グラフィックデザイン",
  "MOTION": "モーション",
  "ILLUSTRATION": "イラストレーション",
  "3D": "3D",
  "UI DESIGN": "UIデザイン",
};

export function translateProjectLabel(value: string, language: "en" | "ja") {
  return language === "ja" ? categoryJa[value] ?? value : value;
}

const projectJa: Record<
  string,
  Partial<{
    title: string;
    subtitle: string;
    category: string;
    shortDescription: string;
    longDescription: string;
    client: string;
    role: string[];
    deliverables: string[];
    disclaimer: string;
  }>
> = {
  abelian: {
    subtitle: "ポスト量子ブロックチェーン · 複数年パートナーシップ",
    category: "クライアントワーク",
    shortDescription: "ポスト量子ブロックチェーンのための\n複数年ブランドシステム",
    longDescription:
      "プライバシーを重視した未来志向のインフラを構築するポスト量子ブロックチェーン、Abelianとの複数年にわたるクリエイティブパートナーシップ。暗号技術という複雑な領域を、ブランドマーケティング、SNS、モーション、教育コンテンツ、コミュニティ施策、イベント、オリジナルマスコットまで、人が直感的に感じて行動できるビジュアル言語へ翻訳しました。",
    role: ["ブランドマーケティング", "アートディレクション", "モーションデザイン", "イラストレーション", "キャラクターデザイン"],
    deliverables: ["ブランドキャンペーン", "SNSシステム", "モーションデザイン", "教育ビジュアル", "マスコット（Hako）", "イベントデザイン"],
  },
  "alpine-rhinoshield": {
    category: "クライアントワーク",
    shortDescription: "公式F1マーチャンダイズカプセル\nアートディレクション & イラストレーション",
    longDescription:
      "Alpine F1 × Rhinoshieldコラボレーションのためのマーチャンダイズカプセルとローンチキャンペーン。BWTピンク、モーションブラーの光、手描きのスピードラインを軸に、スマートフォン、サーキット、Tシャツまで展開できるビジュアルシステムとして設計しました。",
    role: ["アートディレクション", "イラストレーション", "キャンペーン"],
    deliverables: ["ケース用アートワークシリーズ", "ローンチキャンペーンビジュアル", "ドライバーポートレートシリーズ"],
  },
  "xbox-wire": {
    subtitle: "月次ライブ番組 · アイデンティティ & ブロードキャスト",
    category: "クライアントワーク",
    shortDescription: "月次Xboxライブ番組のための\nアイデンティティ & 放送デザイン",
    longDescription:
      "Xboxが制作する月次ライブ番組 Xbox Wire のためのアイデンティティと放送ビジュアル。番組ロゴ、オンエアグラフィック、スタジオスクリーン、セグメント表現、SNS告知素材まで、番組全体を一貫したビジュアルシステムとして構築しました。",
    role: ["アートディレクション", "グラフィックデザイン", "モーションデザイン"],
    deliverables: ["番組アイデンティティ", "オンエアグラフィック", "スタジオスクリーンビジュアル", "セグメントグラフィック", "SNS告知素材", "エピソードキービジュアル"],
  },
  "atletec-zwift-racing-league": {
    subtitle: "Eサイクリング · Eスポーツ · シーズンコミュニケーションシステム",
    category: "クライアントワーク",
    shortDescription: "バーチャルサイクリング競技のための\n総合ビジュアルエコシステム",
    longDescription:
      "Zwift Racing LeagueにおけるAtletecのための総合ビジュアルエコシステム。アートディレクション、モーション、3Dアセット、レース告知、ランキング、SNSコミュニケーションを、シーズン全体を支える一貫した表現として設計しました。",
    role: ["リードデザイナー", "アートディレクション", "グラフィックデザイン", "モーションデザイン"],
    deliverables: ["アートディレクション", "モーショントレーラー", "3Dサイクリングアセット", "レース告知", "ランキングシステム", "SNSテンプレート"],
    disclaimer: "Atletecのために制作したプロジェクトです。掲載ビジュアルはポートフォリオ用途で、権利はAtletecおよび関連パートナーに帰属します。",
  },
  "luxury-garden": {
    category: "アートディレクション",
    shortDescription: "ハイエンドファッションハウスのための\nシュールなラグジュアリー展示",
    longDescription:
      "コンクリートアリーナ、ブルータリストギャラリー、地下通路の中でメゾンが広告を展開したらどう見えるかを想像した、架空の展示シリーズ。各ビルボードは単独のエディトリアルスチルとして構成し、ブティックを離れたラグジュアリーアイコンの強度を探りました。",
    client: "自主制作 · コンセプト",
    role: ["3Dアートディレクション", "セットデザイン", "コンポジット"],
    deliverables: ["コンクリートアリーナレンダー", "地下ギャラリーシリーズ", "ブランド統合 · LV、Chanel、Dior"],
  },
  "pewdiepie-rhinoshield": {
    subtitle: "日本的ビジュアルディレクション · ケースカプセル",
    category: "クライアントワーク",
    shortDescription: "ケースカプセルのための\n日本的ビジュアルディレクション",
    longDescription:
      "PewDiePie × Rhinoshieldコラボレーションのために、日本的なビジュアルディレクションを軸に複数のスタイルを探求。サイバー、ネオン東京、江戸風構成、かわいい表現、80年代レトロまで、プロダクトデザインとコミュニティブランディングに適応するコレクタブルなビジュアルシステムを検証しました。",
    role: ["イラストレーション", "グラフィックデザイン", "マーケティング素材"],
    deliverables: ["Edo Waveコンセプト", "Ninja Pewdsイラスト", "Neon City / Futuristic Tokyo", "Konbini Neon storefront", "Pewds Arcade scene", "最終ケースカプセル（10デザイン）"],
    disclaimer: "採用・未採用を問わず、すべてのコンセプトとデザインはRhinoshieldに帰属します。",
  },
  "venice-carnival": {
    subtitle: "自主制作 · 文化的アイデンティティの探求",
    category: "アートディレクション",
    shortDescription: "ヴェネチアの仮面文化に着想を得た\n現代的ビジュアルアイデンティティ",
    longDescription:
      "ヴェネチア・カーニバルを題材にした架空のアイデンティティプロジェクト。イタリアを代表する文化的祝祭を、カスタムイラストの仮面、ポスターシリーズ、イベントブランディング、環境展開を通して再解釈しました。",
    client: "自主制作",
    role: ["アートディレクション", "グラフィックデザイン", "イラストレーション"],
    deliverables: ["キービジュアル", "イラスト仮面", "ポスターシリーズ", "チケットデザイン", "環境展開", "グラフィックパターンシステム"],
  },
  "atletec-tv": {
    subtitle: "EスポーツWebTV · 総合ブランドシステム",
    category: "クライアントワーク",
    shortDescription: "EスポーツWebTVのための\n総合アーティスティックディレクション",
    longDescription:
      "ATLETEC WEBTVエコシステムのための総合アーティスティックディレクション。Culture、Entertainment、Let's Play、Sportという編集軸をもとに、ロゴ進化、カテゴリ設計、モーション対応のビジュアル言語、2D/3Dアイコン、SNS素材、放送ディレクションをひとつのEスポーツユニバースとして構築しました。",
    role: ["アートディレクション", "グラフィックデザイン"],
    deliverables: ["ロゴシステム", "カテゴリ設計", "3Dオブジェクトライブラリ", "ピクトグラムアイコン", "スタイルフレーム", "SNSテンプレート", "放送 / WebTVディレクション", "モーションアイデンティティ"],
    disclaimer: "Atletecのために制作したプロジェクトです。掲載ビジュアルはポートフォリオ用途で、権利はAtletecに帰属します。",
  },
  "daft-punk-remastered": {
    subtitle: "イラストレーション · アートディレクション · グラフィックデザイン",
    category: "アートディレクション",
    shortDescription: "Daft Punkを再解釈する\n鮮やかなイラストレーションシリーズ",
    longDescription:
      "Daft Punkのビジュアルレガシーと日本のポップカルチャーに着想を得た自主制作イラストレーションプロジェクト。レトロフューチャー、マンガ的美学、音楽パッケージ、エディトリアルデザインを混ぜ合わせ、架空のリマスターリリースとして再構築しました。",
    client: "自主制作",
    role: ["アートディレクション", "イラストレーション", "グラフィックデザイン", "タイポグラフィ", "プリントデザイン"],
    deliverables: ["ヘルメットイラスト二部作", "アルバム / シングルアートワーク", "CDケース + スリーブモックアップ", "ポスター", "2070コレクションバリアント", "日本語タイポグラフィシステム"],
  },
  "social-media-icons": {
    category: "3D",
    shortDescription: "3Dアイコン、ウィジェット、\nモバイルUIの遊び心あるコレクション",
    longDescription:
      "3Dソーシャルメディアアイコン、ウィジェット、モバイルインターフェースを制作する自主制作プロジェクト。形状、色、ライティング、インタラクションデザインを、スタイライズされたデジタルプロダクトのシリーズとして研究しました。",
    client: "自主制作",
    role: ["3Dアーティスト", "モーションデザイナー", "アートディレクター"],
    deliverables: ["3Dアイコンシステム", "カスタムウィジェット", "モバイルUIコンセプト", "モーション対応アセット"],
  },
  "the-incredibles": {
    subtitle: "イラストレーショントリビュート",
    category: "イラストレーション",
    shortDescription: "Pixar『The Incredibles』への\n大胆なベクタートリビュート",
    longDescription:
      "Pixarの代表作『The Incredibles』に着想を得た自主制作トリビュート。作品のエネルギー、個性、ビジュアルアイデンティティを保ちながら、大胆なベクターイラストスタイルで再解釈しました。",
    client: "自主制作",
    role: ["イラストレーター", "アートディレクター"],
    deliverables: ["ベクターキービジュアル", "縦型ポスター", "環境グラフィック", "大型広告モックアップ"],
  },
};

export function useProjectCopy(project: Project) {
  const { language } = useLanguage();
  const locale = language === "ja" ? project.i18n?.ja : undefined;
  const fallback = language === "ja" ? projectJa[project.slug] : undefined;
  const translateCategory = (value?: string) =>
    value ? translateProjectLabel(value, language) : value;

  return {
    title: locale?.title ?? fallback?.title ?? project.title,
    subtitle: locale?.subtitle ?? fallback?.subtitle ?? project.subtitle,
    category:
      locale?.category ?? fallback?.category ?? translateCategory(project.category),
    shortDescription:
      locale?.shortDescription ?? fallback?.shortDescription ?? project.shortDescription,
    longDescription:
      locale?.longDescription ?? fallback?.longDescription ?? project.longDescription,
    client: locale?.client ?? fallback?.client ?? project.client,
    role: locale?.role ?? fallback?.role ?? project.role,
    deliverables: locale?.deliverables ?? fallback?.deliverables ?? project.deliverables,
    disclaimer: locale?.disclaimer ?? fallback?.disclaimer ?? project.disclaimer,
    galleryCaption: (img: ProjectImage, index: number) =>
      locale?.gallery?.[index]?.caption ?? img.caption,
    galleryAlt: (img: ProjectImage, index: number) =>
      locale?.gallery?.[index]?.alt ?? img.alt,
    highlights: locale?.highlights ?? project.highlights,
    motionTitle: locale?.motion?.title ?? project.motion?.title,
    motionDescription:
      locale?.motion?.description ?? project.motion?.description,
    motionCaption: locale?.motion?.caption ?? project.motion?.caption,
    motionVideoTitle: (video: MotionVideo, index: number) =>
      locale?.motion?.videos?.[index]?.title ?? video.title,
    motionVideoCaption: (video: MotionVideo, index: number) =>
      locale?.motion?.videos?.[index]?.caption ?? video.caption,
  };
}

export function resolveHighlights(project: Project, language: "en" | "ja") {
  return language === "ja"
    ? project.i18n?.ja?.highlights ?? project.highlights
    : project.highlights;
}
