"use client";

import { useLanguage } from "@/components/LanguageProvider";

const servicesJa: Record<string, string> = {
  "SERVICES": "サービス",
  "CREATIVE DIRECTION, MOTION DESIGN\nAND VISUAL SYSTEMS":
    "クリエイティブディレクション、モーションデザイン\nそしてビジュアルシステム",
  "FOR BRANDS THAT WANT TO\nMOVE DIFFERENTLY.":
    "違いを生み出したいブランドのために。",
  "BASED IN TOKYO": "東京拠点",
  "WORKING WORLDWIDE": "世界対応",
  "ART DIRECTOR & SENIOR MULTIMEDIA DESIGNER":
    "アートディレクター & シニアマルチメディアデザイナー",
  "GRAPHIC DESIGN": "グラフィックデザイン",
  "Premium visual systems for brands, campaigns and digital experiences.":
    "ブランド、キャンペーン、デジタル体験のための上質なビジュアルシステム。",
  "Key Visual Design": "キービジュアルデザイン",
  "Campaign Assets": "キャンペーン素材",
  "Editorial Layouts": "エディトリアルレイアウト",
  "Social Visual Systems": "SNSビジュアルシステム",
  "Brand Visual Support": "ブランドビジュアル支援",
  "Presentation Design": "プレゼンテーションデザイン",
  "MOTION DESIGN": "モーションデザイン",
  "Motion-driven storytelling and premium animated visual content.":
    "モーションを軸にしたストーリーテリングと上質なアニメーション表現。",
  "Motion Graphics": "モーショングラフィックス",
  "Typography Animation": "タイポグラフィアニメーション",
  "Brand Motion Systems": "ブランドモーションシステム",
  "Product / Launch Visuals": "プロダクト / ローンチビジュアル",
  "Short-Form Motion Content": "ショートフォーム動画",
  "Cinematic Motion Direction": "シネマティックモーション演出",
  "ART DIRECTION / CGI": "アートディレクション / CGI",
  "Creative direction for ambitious visual projects.":
    "意欲的なビジュアルプロジェクトのためのクリエイティブディレクション。",
  "Creative Direction": "クリエイティブディレクション",
  "Visual Systems": "ビジュアルシステム",
  "CGI Concepts": "CGIコンセプト",
  "Campaign Visual Development": "キャンペーンビジュアル開発",
  "Premium Key Visuals": "プレミアムキービジュアル",
  "Motion / Visual Direction": "モーション / ビジュアルディレクション",
  "2070 ARCHIVE": "2070アーカイブ",
  "2070 VISUALS": "2070ビジュアル",
  "SIGNATURE PACKAGE": "シグネチャーパッケージ",
  "EXCLUSIVE\nVISUAL SYSTEM": "独自の\nビジュアルシステム",
  "LIMITED COMMISSION": "限定制作",
  "FUTURE": "未来",
  "WORLD": "世界",
  "BUILDING": "構築",
  "My exclusive visual universe.": "独自のビジュアルユニバース。",
  "Futuristic editorial aesthetics.": "未来的なエディトリアル美学。",
  "Tokyo cyber atmospheres.": "東京のサイバーな空気感。",
  "Experimental worldbuilding.": "実験的な世界観構築。",
  "Character concepts.": "キャラクターコンセプト。",
  "Future archive visuals.": "未来アーカイブのビジュアル。",
  "Premium cinematic compositions.": "上質で映画的な構図。",
  "Signature 2070 Artwork": "2070シグネチャーアートワーク",
  "Futuristic Visual Systems": "未来的ビジュアルシステム",
  "Character Design / Concepts": "キャラクターデザイン / コンセプト",
  "Editorial Worldbuilding": "エディトリアルな世界観構築",
  "Cyber Visual Narratives": "サイバービジュアルナラティブ",
  "Premium Art Direction": "プレミアムアートディレクション",
  "STARTING AT:": "開始価格：",
  "FUTURE VISUAL SYSTEMS": "未来的ビジュアルシステム",
  "CREATIVE PARTNERSHIP": "クリエイティブパートナーシップ",
  "Long-term creative collaboration. A flexible partnership for studios, brands and ongoing projects.":
    "スタジオ、ブランド、継続案件のための長期的で柔軟なクリエイティブパートナーシップ。",
  "Graphic Design": "グラフィックデザイン",
  "Motion Design": "モーションデザイン",
  "Visual Consulting": "ビジュアルコンサルティング",
  "Ongoing Creative Support": "継続的なクリエイティブ支援",
  "MONTHLY RETAINER": "月額契約",
  "CUSTOM QUOTE": "個別見積もり",
  "OPTIONAL": "オプション",
  "CONSULTING": "コンサルティング",
  "Creative feedback and strategic visual direction.":
    "制作へのフィードバックと戦略的なビジュアルディレクション。",
  "Portfolio Reviews": "ポートフォリオレビュー",
  "Creative Direction Consulting": "クリエイティブディレクション相談",
  "Design Feedback": "デザインフィードバック",
  "Motion Workflow Advice": "モーション制作フロー相談",
  "Visual Strategy": "ビジュアル戦略",
  "PROCESS": "プロセス",
  "HOW I WORK": "制作の進め方",
  "Direction": "方向性設計",
  "Visual strategy, references, positioning, creative alignment.":
    "ビジュアル戦略、リファレンス、ポジショニング、方向性の整理。",
  "Design": "デザイン",
  "Visual systems, layouts, key visuals, structure.":
    "ビジュアルシステム、レイアウト、キービジュアル、構造設計。",
  "Motion": "モーション",
  "Animation, rhythm, cinematic storytelling.":
    "アニメーション、リズム、映画的なストーリーテリング。",
  "Delivery": "納品",
  "Optimized final assets for campaigns, web, social or launch.":
    "キャンペーン、Web、SNS、ローンチに最適化した最終データ。",
  "LET'S TALK": "相談する",
  "LET'S CREATE\nSOMETHING THAT MOVES.":
    "心を動かすものを\n一緒につくりましょう。",
  "CONTACT ME": "お問い合わせ",
  "START REQUEST": "相談を始める",
  "BOOK SESSION": "セッションを予約",
  "INCLUDES:": "含まれる内容：",
};

export function useServiceText() {
  const { language } = useLanguage();
  return (value: string) => (language === "ja" ? servicesJa[value] ?? value : value);
}
