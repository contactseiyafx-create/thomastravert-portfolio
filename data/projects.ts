/**
 * PROJECTS
 * ─────────────────────────────────────────────
 * Centralized editable source for every project on the site.
 * Add a new project = duplicate one of these objects.
 * Drop images into /public/projects/<slug>/ and reference them here.
 *
 * Image paths follow the brief exactly:
 *   /public/projects/nexbank/        6_fullwitdh.png, 1.png … 4.png
 *   /public/projects/alpine/         AlpineThumb.jpg, 1.png … 6.png
 *   /public/projects/luxurygarden/   lg1.png … lg6.png
 */

export type ProjectCategory =
  | "CLIENT WORK"
  | "ART DIRECTION"
  | "GRAPHIC DESIGN"
  | "MOTION"
  | "ILLUSTRATION"
  | "3D"
  | "UI DESIGN";

export type ProjectImage = {
  /** Image src — used as the poster frame when `video` is present. */
  src: string;
  alt: string;
  /** Aspect ratio hint for layouts that respect it, e.g. "16/9", "21/9", "1/1" */
  ratio?: string;
  /** Optional caption for the gallery */
  caption?: string;
  /**
   * Optional video. When set, the gallery renders an autoplay-loop-muted
   * <video> using `src` (above) as the poster frame and `video.src` as
   * the playable mp4.  Same frame dimensions, same animations — only the
   * inner element swaps.
   */
  video?: {
    src: string;
    /** Defaults to "video/mp4" */
    type?: string;
  };
};

export type Highlight = {
  title: string;
  body: string;
};

export type MotionVideo =
  | {
      kind: "youtube";
      youtubeId: string;
      title: string;
      caption?: string;
      featured?: boolean;
    }
  | {
      kind: "video";
      src: string;
      title: string;
      poster?: string;
      caption?: string;
      type?: string;
      featured?: boolean;
    };

export type ProjectLocale = {
  title?: string;
  subtitle?: string;
  category?: ProjectCategory;
  shortDescription?: string;
  longDescription?: string;
  client?: string;
  role?: string[];
  deliverables?: string[];
  disclaimer?: string;
  gallery?: Array<Partial<Pick<ProjectImage, "alt" | "caption">>>;
  highlights?: Highlight[];
  motion?: {
    title?: string;
    description?: string;
    caption?: string;
    videos?: Array<Partial<Pick<MotionVideo, "title" | "caption">>>;
  };
};

export type Project = {
  /** URL slug — also the folder name in /public/projects/ */
  slug: string;
  /** Index displayed in the work-list e.g. "01" */
  index: string;
  /** Title shown big and condensed */
  title: string;
  /** Optional small "AKA" line under the title */
  subtitle?: string;
  /** One-line category label */
  category: ProjectCategory;
  /** Short list-page description (2 lines max recommended) */
  shortDescription: string;
  /** Long detail-page description (paragraph) */
  longDescription: string;
  /** Year of completion */
  year: string;
  /** Client / brand */
  client: string;
  /** Role(s) you took */
  role: string[];
  /** Deliverables shipped */
  deliverables?: string[];
  /** Hero thumbnail (used in work grid + featured strip) */
  thumbnail: ProjectImage;
  /** Optional secondary thumbnails — Alpine card can show extras side-by-side */
  thumbnailExtras?: ProjectImage[];
  /** Hero visual on the detail page */
  hero: ProjectImage;
  /** Editorial gallery on the detail page */
  gallery: ProjectImage[];
  /** Optional bullet-highlights block */
  highlights?: Highlight[];
  /**
   * Optional disclaimer / rights notice — rendered as a small caveat below
   * the overview block.  Used for client projects whose IP belongs to the
   * client (e.g. "All concepts remain the property of <client>.").
   */
  disclaimer?: string;
  /** Optional motion / video block — hides cleanly if undefined */
  motion?: {
    src?: string;
    poster?: string;
    caption?: string;
    title?: string;
    description?: string;
    videos?: MotionVideo[];
  };
  i18n?: {
    ja?: ProjectLocale;
  };
  /** Optional external link (live URL, video, etc.) */
  externalUrl?: string;
  /** Tags shown in detail header and used by Work filters */
  tags?: ProjectCategory[];
  /** Featured on home? */
  featured?: boolean;
};

/* ───────────────────────── Projects ───────────────────────── */

export const projects: Project[] = [
  {
    slug: "abelian",
    index: "01",
    title: "ABELIAN",
    subtitle: "POST-QUANTUM BLOCKCHAIN · MULTI-YEAR PARTNERSHIP",
    category: "CLIENT WORK",
    shortDescription:
      "MULTI-YEAR BRAND SYSTEM FOR A\nPOST-QUANTUM BLOCKCHAIN",
    longDescription:
      "A multi-year creative partnership with Abelian, a post-quantum blockchain building privacy-first, future-proof infrastructure. I owned the visual language that translated dense cryptography into something people could feel and act on — across brand marketing, social, motion, education, community campaigns, live events and an original mascot.",
    year: "2026",
    client: "Abelian",
    role: [
      "Brand Marketing",
      "Art Direction",
      "Motion Design",
      "Illustration",
      "Character Design",
    ],
    deliverables: [
      "Brand campaigns",
      "Social system",
      "Motion design",
      "Educational visuals",
      "Mascot (Hako)",
      "Event design",
    ],
    thumbnail: {
      src: "/projects/abelian/thumbnail.webp",
      alt: "Abelian — post-quantum wallet campaign key visual",
      ratio: "16/9",
    },
    hero: {
      src: "/projects/abelian/01-balanced-privacy.jpg",
      alt: "Abelian — Balanced Privacy campaign",
      ratio: "16/9",
    },
    gallery: [], // bespoke editorial page renders the full story
    tags: ["CLIENT WORK", "ART DIRECTION", "MOTION", "ILLUSTRATION"],
    featured: true,
  },
  {
    slug: "alpine-rhinoshield",
    index: "02",
    title: "ALPINE × RHINOSHIELD",
    category: "CLIENT WORK",
    shortDescription:
      "OFFICIAL F1 MERCHANDISE CAPSULE\nART DIRECTION & ILLUSTRATION",
    longDescription:
      "A merchandise capsule and launch campaign for the Alpine F1 × Rhinoshield collaboration. The system leans into BWT pink, motion-blur lighting, and hand-drawn speed lines — built to live on phones, at the track, and on a tee.",
    year: "2024",
    client: "Alpine F1 Team × Rhinoshield",
    role: ["Art Direction", "Illustration", "Campaign"],
    deliverables: [
      "Case artwork series",
      "Launch campaign visuals",
      "Driver portrait series",
    ],
    thumbnail: {
      src: "/projects/alpine/AlpineThumb.jpg",
      alt: "Alpine × Rhinoshield — official product thumbnail",
      ratio: "4/3",
    },
    hero: {
      src: "/projects/alpine/1.png",
      alt: "Alpine × Rhinoshield — official product hero",
      ratio: "4/3",
    },
    gallery: [
      {
        src: "/projects/alpine/5.png",
        alt: "Alpine illustrations — three race-car artworks",
        ratio: "2/1",
        caption: "Illustration series — F1, Endurance, top-down.",
      },
      {
        src: "/projects/alpine/4.png",
        alt: "Alpine driver portraits — Esteban, Pierre, duo",
        ratio: "2/1",
        caption: "Driver series — Esteban, Pierre, and the duo.",
      },
      {
        src: "/projects/alpine/3.png",
        alt: "Alpine car series — close-up case artwork",
        ratio: "2/1",
        caption: "Car series — case-by-case artwork.",
      },
      {
        src: "/projects/alpine/2.png",
        alt: "Alpine F1 Drivers product line-up",
        ratio: "2/1",
        caption: "F1 Drivers line-up — pink, blue, neon.",
      },
      {
        src: "/projects/alpine/6.png",
        alt: "Alpine × Rhinoshield campaign grid",
        ratio: "3/2",
        caption: "Campaign grid — eight visuals, one capsule.",
      },
    ],
    highlights: [
      {
        title: "SPEED-LINE LANGUAGE",
        body: "Manga-style brush lines fight for attention with photographic race cars — every case is a poster.",
      },
      {
        title: "BWT PINK SYSTEM",
        body: "Pink and royal blue carry across illustrations, portraits and campaign — one capsule, one signal.",
      },
      {
        title: "MULTI-PLATFORM",
        body: "Artwork adapted for iPhone, Android, Pixel and Galaxy — without losing the editorial intent.",
      },
    ],
    tags: ["CLIENT WORK", "ART DIRECTION", "ILLUSTRATION", "GRAPHIC DESIGN"],
    featured: true,
  },
  {
    slug: "nexbank",
    index: "03",
    title: "NEXBANK",
    category: "ART DIRECTION",
    shortDescription:
      "FUTURISTIC DIGITAL BANKING\nEXPERIENCE & BRAND SYSTEM",
    longDescription:
      "Nexbank is a near-future banking proposition built around a single object: a black metal card that thinks. The visual system rejects the friendly-pastel fintech trope and pushes towards quiet technology — embossed metal, micro-typography, and motion that behaves more like a luxury timepiece than a payment app.",
    year: "2026",
    client: "Nexbank (concept)",
    role: ["Art Direction", "UI Design", "CGI", "Motion Design"],
    deliverables: [
      "Brand identity",
      "Card design & CGI",
      "Product UI",
      "Marketing site",
      "Motion design",
      "Product storytelling",
    ],
    thumbnail: {
      src: "/projects/nexbank/6_fullwitdh.png",
      alt: "Nexbank — embossed black card",
      ratio: "16/9",
    },
    hero: {
      src: "/projects/nexbank/6_fullwitdh.png",
      alt: "Nexbank — embossed black card hero",
      ratio: "16/9",
    },
    gallery: [
      {
        src: "/projects/nexbank/1.png",
        alt: "Nexbank — card collection picker",
        ratio: "3/2",
        caption: "Card picker — sequel to the Apple Card moment.",
      },
      {
        src: "/projects/nexbank/2.png",
        alt: "Nexbank — pricing plans on macOS",
        ratio: "3/2",
        caption: "Pricing — Standard, Premium, Business tiers.",
      },
      {
        src: "/projects/nexbank/3.png",
        alt: "Nexbank — bespoke platform features",
        ratio: "3/2",
        caption: "Bespoke platform — four iridescent feature glyphs.",
      },
      {
        src: "/projects/nexbank/4.png",
        alt: "Nexbank — money for here, there & everywhere stats",
        ratio: "16/9",
        caption: "Global stats — 20+ currencies · $5MM daily · 160+ countries.",
      },
    ],
    highlights: [
      {
        title: "QUIET TECHNOLOGY",
        body: "No emoji, no gradients-on-gradients. The card does the talking; the UI just frames it.",
      },
      {
        title: "ONE WARM ACCENT",
        body: "A single orange signal across every surface — typography, CTAs, glyphs — to keep the system focused.",
      },
      {
        title: "EDITORIAL UI",
        body: "Marketing surfaces read like a magazine spread before they read like an app.",
      },
    ],
    motion: {
      title: "Motion Design",
      description:
        "To bring the Nexbank ecosystem to life, I explored motion design as an extension of the brand experience. From product presentations to animated storytelling, these explorations focus on rhythm, clarity and premium digital interactions.",
      videos: [
        {
          kind: "youtube",
          youtubeId: "42cu4S0U39k",
          title: "Nexbank Motion Reel",
          caption: "YouTube motion reel — brand rhythm, product moments and premium interaction language.",
          featured: true,
        },
        {
          kind: "video",
          src: "/projects/nexbank/nexbank-presentation.webm",
          poster: "/projects/nexbank/6_fullwitdh.png",
          title: "Nexbank Presentation Video",
          caption: "Product presentation film — positioning Nexbank as a premium digital banking ecosystem.",
          type: "video/webm",
        },
      ],
    },
    i18n: {
      ja: {
        shortDescription:
          "未来型デジタルバンキング\n体験設計とブランドシステム",
        longDescription:
          "Nexbankは、思考するブラックメタルカードを中心に設計した近未来のバンキング構想です。親しみやすいパステル調のフィンテック表現から距離を置き、静かなテクノロジー、エンボス加工されたメタル、マイクロタイポグラフィ、そして高級時計のように振る舞うモーションを軸に、プレミアムな金融体験として構築しました。",
        client: "Nexbank（コンセプト）",
        role: ["アートディレクション", "UIデザイン", "CGI", "モーションデザイン"],
        deliverables: [
          "ブランドアイデンティティ",
          "カードデザイン & CGI",
          "プロダクトUI",
          "マーケティングサイト",
          "モーションデザイン",
          "プロダクトストーリーテリング",
        ],
        gallery: [
          {
            caption: "カードピッカー — Apple Card以降の体験を再解釈。",
          },
          {
            caption: "料金プラン — Standard、Premium、Businessの3階層。",
          },
          {
            caption: "プラットフォーム機能 — 虹色に反射する4つのフィーチャーグリフ。",
          },
          {
            caption:
              "グローバル指標 — 20以上の通貨、1日500万ドル、160以上の国と地域。",
          },
        ],
        highlights: [
          {
            title: "静かなテクノロジー",
            body: "絵文字や過剰なグラデーションには頼らず、カードそのものが語り、UIはそれを引き立てる設計にしました。",
          },
          {
            title: "ひとつの暖色アクセント",
            body: "タイポグラフィ、CTA、グリフに一貫したオレンジのシグナルを使い、システム全体の集中度を高めました。",
          },
          {
            title: "エディトリアルなUI",
            body: "マーケティング画面は、アプリである前に雑誌の見開きのように読める構成を目指しました。",
          },
        ],
        motion: {
          title: "モーションデザイン",
          description:
            "Nexbankのエコシステムに生命感を与えるため、ブランド体験の延長としてモーションデザインを探求しました。プロダクトプレゼンテーションからアニメーションによるストーリーテリングまで、リズム、明快さ、プレミアムなデジタルインタラクションに焦点を当てています。",
          videos: [
            {
              title: "Nexbank モーションリール",
              caption:
                "YouTubeモーションリール — ブランドのリズム、プロダクトの瞬間、プレミアムなインタラクション言語。",
            },
            {
              title: "Nexbank プレゼンテーションビデオ",
              caption:
                "プロダクトプレゼンテーション映像 — Nexbankをプレミアムなデジタルバンキングエコシステムとして提示。",
            },
          ],
        },
      },
    },
    tags: ["ART DIRECTION", "UI DESIGN", "GRAPHIC DESIGN", "MOTION"],
    featured: true,
  },
  {
    slug: "xbox-wire",
    index: "04",
    title: "XBOX WIRE",
    subtitle: "MONTHLY LIVE SHOW · IDENTITY & BROADCAST",
    category: "CLIENT WORK",
    shortDescription:
      "IDENTITY & BROADCAST DESIGN\nFOR A MONTHLY XBOX LIVE SHOW",
    longDescription:
      "Xbox Wire is a monthly live show produced by Xbox, featuring guests such as Le Joueur du Grenier, Domingo, Kadidiatou Diani and Ina Gilbert. The program focuses on gaming culture, industry discussions, entertainment and community topics surrounding the world of video games, with recurring segments including Autour du Vert, Le Défi and La Xboîte. My role covered art direction, graphic design, motion design and visual branding across the show's identity, broadcast graphics, on-set screens and communication materials.",
    year: "2024",
    client: "Xbox",
    role: ["Art Direction", "Graphic Design", "Motion Design"],
    deliverables: [
      "Show identity & logo lockup",
      "On-air broadcast graphics",
      "On-set screen visuals",
      "Segment graphics (Autour du Vert · Le Défi · La Xboîte)",
      "Social-media communication assets",
      "Episode key visuals",
    ],
    thumbnail: {
      // Brief: this file is for thumbnail + hero ONLY. Used for nothing else.
      src: "/projects/xbox-wire/thumb.jpg",
      alt: "Xbox Wire — show identity key visual",
      ratio: "16/9",
    },
    hero: {
      // Brief: same key visual as the thumbnail, fullscreen hero with original
      // 16:9 proportions preserved. ProjectHero applies object-cover only.
      src: "/projects/xbox-wire/hero.jpg",
      alt: "Xbox Wire — show identity key visual",
      ratio: "16/9",
    },
    gallery: [
      // Brief: gallery uses ONLY the five "full" images. Hero/thumb deliberately
      // excluded — strict role separation.
      {
        src: "/projects/xbox-wire/01-facebook-spread.jpg",
        alt: "Xbox Wire #3 — Spéciale Jeux Indés · Facebook live spread",
        ratio: "1400/727",
        caption:
          "Xbox Wire #3 — Spéciale Jeux Indés · Le Défi · live broadcast on social channels.",
      },
      {
        src: "/projects/xbox-wire/02-youtube-clairefontaine.jpg",
        alt: "Visit of Clairefontaine + Xbox Wire #XboxDay · YouTube cut",
        ratio: "1400/680",
        caption:
          "Clairefontaine × Xbox Wire — #XboxDay episode with Domingo and Kadidiatou Diani.",
      },
      {
        src: "/projects/xbox-wire/03-set-foosball.jpg",
        alt: "Xbox Wire — on-set with foosball table and screen graphics",
        ratio: "3/2",
        caption:
          "On-set environment — branded screens, foosball table, integrated broadcast graphics.",
      },
      {
        src: "/projects/xbox-wire/04-set-wide.jpg",
        alt: "Xbox Wire — wide hero shot of the Clairefontaine set",
        ratio: "3/2",
        caption:
          "Wide hero shot — Clairefontaine salon dressed as the Xbox Wire studio.",
      },
      {
        src: "/projects/xbox-wire/05-camera-bts.jpg",
        alt: "Xbox Wire — behind-the-scenes from camera viewfinder",
        ratio: "4/3",
        caption:
          "Behind the scenes — the set from the camera operator's viewfinder before rolling.",
      },
    ],
    highlights: [
      {
        title: "MONTHLY BROADCAST IDENTITY",
        body: "A flexible identity system carrying the same Xbox Wire signature across every monthly drop — broadcast, social, on-set screens — without ever looking like a repeat.",
      },
      {
        title: "THREE RECURRING SEGMENTS",
        body: "Autour du Vert, Le Défi and La Xboîte each carry their own treatment inside the same visual frame, signalling the segment at a glance.",
      },
      {
        title: "ON-SET INTEGRATION",
        body: "Brand assets designed in lockstep with the physical set — desk fronts, vertical screen pylons, neon Xbox console plinths — so on-air graphics meet the room itself.",
      },
    ],
    tags: ["CLIENT WORK", "ART DIRECTION", "MOTION", "GRAPHIC DESIGN"],
    disclaimer:
      "Project produced for Xbox / Microsoft — visuals shown for portfolio purposes; rights remain with Xbox.",
    featured: false,
  },
  {
    slug: "atletec-zwift-racing-league",
    index: "05",
    title: "ATLETEC ZWIFT RACING LEAGUE",
    subtitle: "ECYCLING · ESPORT · SEASON COMMUNICATION SYSTEM",
    category: "CLIENT WORK",
    shortDescription:
      "A COMPLETE VISUAL ECOSYSTEM\nFOR VIRTUAL CYCLING COMPETITION",
    longDescription:
      "A complete visual ecosystem for Atletec inside the Zwift Racing League: art direction, motion design, 3D assets, race announcements, ranking layouts and social communication designed to support an entire competitive season.",
    year: "2021",
    client: "Atletec",
    role: ["Lead Designer", "Art Direction", "Graphic Design", "Motion Design"],
    deliverables: [
      "Art direction",
      "Motion trailer",
      "3D cycling assets",
      "Race announcements",
      "Ranking system",
      "Social media templates",
    ],
    thumbnail: {
      src: "/projects/atletec-zwift-racing-league/hero-cover.png",
      alt: "Atletec Zwift Racing League — red hero cover with bicycle wheel",
      ratio: "4/3",
    },
    hero: {
      src: "/projects/atletec-zwift-racing-league/hero-cover.png",
      alt: "Atletec Zwift Racing League — project hero",
      ratio: "4/3",
    },
    gallery: [],
    highlights: [
      {
        title: "SPORT × ESPORT",
        body: "Cycling codes were rebuilt through data interfaces, race systems and competitive gaming references.",
      },
      {
        title: "SEASON SYSTEM",
        body: "A modular language supported victories, defeats, rankings, race results and promotional content.",
      },
      {
        title: "MOTION-FIRST IDENTITY",
        body: "Wireframes, loading states and glitch diagnostics gave the launch trailer its esports rhythm.",
      },
    ],
    tags: ["CLIENT WORK", "ART DIRECTION", "MOTION", "3D"],
    disclaimer:
      "Project produced for Atletec — visuals shown for portfolio purposes; rights remain with Atletec and associated partners.",
    featured: false,
  },
  {
    slug: "luxury-garden",
    index: "06",
    title: "LUXURY GARDEN",
    category: "ART DIRECTION",
    shortDescription:
      "SURREAL LUXURY EXHIBITION\nFOR HIGH-END FASHION HOUSES",
    longDescription:
      "A speculative exhibition series imagining how Maisons would advertise inside concrete arenas, brutalist galleries, and lit underground walkways. Every billboard composition was sculpted as a standalone editorial still — a study of how luxury icons survive when stripped of the boutique.",
    year: "2025",
    client: "Personal project · concept",
    role: ["3D Art Direction", "Set Design", "Compositing"],
    deliverables: [
      "Concrete arena renders",
      "Underground gallery series",
      "Brand integrations · LV, Chanel, Dior",
    ],
    thumbnail: {
      src: "/projects/luxurygarden/lg1.png",
      alt: "Luxury Garden — underground gallery row of pink LV billboards",
      ratio: "21/9",
    },
    hero: {
      src: "/projects/luxurygarden/lg1.png",
      alt: "Luxury Garden — underground gallery hero",
      ratio: "21/9",
    },
    gallery: [
      {
        src: "/projects/luxurygarden/lg6.png",
        alt: "Luxury Garden — LV billboard inside concrete arena",
        ratio: "16/9",
        caption: "LV in concrete — a single billboard in raw architecture.",
      },
      {
        src: "/projects/luxurygarden/lg2.png",
        alt: "Luxury Garden — Chanel No.5 floral billboard",
        ratio: "3/2",
        caption: "Chanel No.5 — roses, sunburst, glass.",
      },
      {
        src: "/projects/luxurygarden/lg3.png",
        alt: "Luxury Garden — Dior storefront billboard",
        ratio: "3/2",
        caption: "Dior storefront — terracotta and brass.",
      },
      {
        src: "/projects/luxurygarden/lg4.png",
        alt: "Luxury Garden — montage of the series",
        ratio: "16/9",
        caption: "Series montage — Chanel, LV, Dior.",
      },
    ],
    highlights: [
      {
        title: "ONE ARTWORK, MANY ARENAS",
        body: "Each Maison gets a single hero piece, placed into wildly different architectures.",
      },
      {
        title: "BRUTALIST CONTRAST",
        body: "Concrete and grit hold up against the pastels and gilt — the tension does the work.",
      },
    ],
    tags: ["ART DIRECTION", "3D", "GRAPHIC DESIGN"],
    featured: true,
  },
  {
    slug: "pewdiepie-rhinoshield",
    index: "07",
    title: "PEWDIEPIE × RHINOSHIELD",
    subtitle: "JAPANESE VISUAL DIRECTION · CASE CAPSULE",
    category: "CLIENT WORK",
    shortDescription:
      "JAPANESE VISUAL DIRECTION\nFOR A CASE CAPSULE",
    longDescription:
      "Travert Thomas designed for the PewDiePie × Rhinoshield collaboration with a Japanese visual direction, exploring multiple stylistic territories ranging from cyber aesthetics and neon Tokyo atmospheres to Edo-inspired compositions, kawaii visuals and retro 80's inspired concepts. The project investigated collectible visual systems adapted to product design and community-driven branding.",
    year: "2020",
    client: "Rhinoshield × PewDiePie",
    role: ["Illustration", "Graphic Design", "Marketing Materials"],
    deliverables: [
      "Edo Wave concept boards",
      "Ninja Pewds illustrations",
      "Neon City / Futuristic Tokyo",
      "Konbini Neon storefront",
      "Pewds Arcade scene",
      "Final case capsule (10 designs)",
    ],
    thumbnail: {
      src: "/projects/pewdiepie-rhinoshield/thumb.png",
      alt: "PewDiePie × Rhinoshield — final case capsule board",
      ratio: "1/1",
    },
    hero: {
      // Brief: hero section uses ONLY herosectionpewd.png. Keep original
      // 16:9 proportions, no deformation. ProjectHero applies object-cover.
      src: "/projects/pewdiepie-rhinoshield/hero.png",
      alt: "PewDiePie × Rhinoshield — rooftop case shot, torii + Edo wave + neon city pop-out",
      ratio: "16/9",
    },
    gallery: [
      // Brief: gallery uses ONLY the five Pewds_*.png files.
      // Thumbnail (4.png) and hero (herosectionpewd.png) are deliberately
      // NOT included here — strict role separation per the brief.
      {
        src: "/projects/pewdiepie-rhinoshield/01-pewds-1.png",
        alt: "Edo Aera — Hokusai Wave proposals",
        ratio: "1920/1357",
        caption: "Edo Aera — Hokusai Wave, two propositions and case studies.",
      },
      {
        src: "/projects/pewdiepie-rhinoshield/02-pewds-2.png",
        alt: "Ninja Pewds and Futuristic / Neon City — concept boards",
        ratio: "4/5",
        caption: "Ninja Pewds & Futuristic City — character and worldbuilding studies.",
      },
      {
        src: "/projects/pewdiepie-rhinoshield/03-pewds-3.png",
        alt: "Konbini Neon and Pewds Arcade — concept boards",
        ratio: "4/5",
        caption: "Konbini Neon & Pewds Arcade — neon-noir scene design.",
      },
      {
        src: "/projects/pewdiepie-rhinoshield/04-pewds-4.png",
        alt: "PewDiePie × Rhinoshield — final case capsule, ten designs",
        ratio: "1920/1690",
        caption: "Final capsule — ten case designs across five universes.",
      },
      {
        src: "/projects/pewdiepie-rhinoshield/05-pewds-last.png",
        alt: "PewDiePie × Rhinoshield — lifestyle campaign visuals",
        ratio: "4/3",
        caption:
          "Lifestyle campaign — product in context, cherry blossoms, Japanese food atmospheres.",
      },
    ],
    highlights: [
      {
        title: "FIVE UNIVERSES, ONE CAPSULE",
        body: "Cyber / Mecha · Neon Tokyo · Edo Print · Kawaii Ramen · 80's Retro · Ninja Pewds — held together by a single Japanese editorial language.",
      },
      {
        title: "PRODUCT-FIRST THINKING",
        body: "Every artwork stress-tested against the case form factor, camera cutout, and back-of-phone composition before final selection.",
      },
      {
        title: "COMMUNITY-DRIVEN ICONOGRAPHY",
        body: "Floor Gang, Edgar, brofist marks and PewDiePie codes woven into the visual fabric without breaking the editorial frame.",
      },
    ],
    /**
     * Disclaimer rendered in the meta sidebar via `tags`.
     * Brief explicitly requests this attribution.
     */
    tags: ["CLIENT WORK", "ART DIRECTION", "ILLUSTRATION", "GRAPHIC DESIGN"],
    disclaimer:
      "All concepts and designs — accepted or not — remain the property of Rhinoshield.",
    featured: false,
  },
  {
    slug: "venice-carnival",
    index: "08",
    title: "VENICE CARNIVAL",
    subtitle: "PERSONAL PROJECT · CULTURAL IDENTITY EXPLORATION",
    category: "ART DIRECTION",
    shortDescription:
      "A CONTEMPORARY VISUAL IDENTITY\nINSPIRED BY VENETIAN MASK CULTURE",
    longDescription:
      "A fictional identity project built around the Venice Carnival. The project reinterprets one of Italy's most recognizable cultural celebrations through a custom illustrated Venetian mask, poster series, event branding and environmental applications.",
    year: "2021",
    client: "Personal Project",
    role: ["Art Direction", "Graphic Design", "Illustration"],
    deliverables: [
      "Key visual",
      "Illustrated mask",
      "Poster series",
      "Ticket design",
      "Environmental application",
      "Graphic pattern system",
    ],
    thumbnail: {
      src: "/projects/venice-carnival/hero-header.png",
      alt: "Venice Carnival — illustrated mask campaign hero",
      ratio: "1920/629",
    },
    hero: {
      src: "/projects/venice-carnival/hero-header.png",
      alt: "Venice Carnival — main key visual",
      ratio: "1920/629",
    },
    gallery: [],
    highlights: [
      {
        title: "HERITAGE REINTERPRETED",
        body: "The mask keeps the theatrical mystery of Carnival while shifting the language into a contemporary graphic system.",
      },
      {
        title: "ILLUSTRATION AS IDENTITY",
        body: "Feathers, ornaments, geometry and texture become the project's core brand material.",
      },
      {
        title: "SCALABLE SYSTEM",
        body: "The artwork expands across posters, tickets, outdoor applications and modular patterns.",
      },
    ],
    tags: ["ART DIRECTION", "ILLUSTRATION", "GRAPHIC DESIGN"],
    disclaimer:
      "Personal project inspired by the Venice Carnival. Created as a fictional cultural identity exploration.",
    featured: false,
  },
  {
    slug: "atletec-tv-rebranding",
    index: "09",
    title: "ATLETEC TV — REBRANDING",
    subtitle: "ESPORTS WEBTV · COMPLETE BRAND SYSTEM",
    category: "CLIENT WORK",
    shortDescription:
      "COMPLETE ARTISTIC DIRECTION\nFOR AN ESPORTS WEBTV",
    longDescription:
      "Complete artistic direction for the ATLETEC WEBTV ecosystem. The system was built around the channel's editorial pillars — Culture, Entertainment, Let's Play and Sport — combining logo evolution, category coding, motion-ready visual language, 2D / 3D icon systems, social-media communication assets and broadcast direction into a single coherent esports universe. ATLETEC is a professional esports structure placing human values at the center of its activities to create a healthy environment promoting performance, learning and fulfillment.",
    year: "2024",
    client: "Atletec",
    role: ["Art Direction", "Graphic Design"],
    deliverables: [
      "Logo system & construction",
      "Category coding (4 pillars)",
      "3D object library",
      "Pictogram icon set",
      "Styleframes & moodboard",
      "Social-media template system",
      "Broadcast / WebTV direction",
      "Motion identity",
    ],
    thumbnail: {
      src: "/projects/atletec-tv/thumb.png",
      alt: "ATLETEC TV — webtv branding preview",
      ratio: "859/464",
    },
    hero: {
      src: "/projects/atletec-tv/02-logo-system.png",
      alt: "ATLETEC TV — logo construction system",
      ratio: "1920/1294",
    },
    gallery: [
      {
        src: "/projects/atletec-tv/04-logo-construction-poster.jpg",
        alt: "Logo construction — Atletec mark + REC dot + TV roundel",
        ratio: "16/9",
        caption:
          "Logo system — construction, category variants (Général · Culture · Divertissement · Jeux Vidéo · Sport).",
        video: { src: "/projects/atletec-tv/04-logo-construction.mp4" },
      },
      {
        src: "/projects/atletec-tv/02-logo-system.png",
        alt: "Logo system — full construction board with category colour codes",
        ratio: "1920/1294",
        caption:
          "Brand book — full construction board, five category roundels, hex codes.",
      },
      {
        src: "/projects/atletec-tv/03-3d-icons.png",
        alt: "3D objects to pictograms — speaker, mic, headphones, joystick, ball",
        ratio: "1920/799",
        caption:
          "3D object system — speaker, microphone, headset, joystick, ball — reproduced as pictograms for immediate recognition and pattern use.",
      },
      {
        src: "/projects/atletec-tv/07-3d-objects-poster.jpg",
        alt: "3D objects — animated turntable loop",
        ratio: "1400/788",
        caption: "3D object library — turntable studies.",
        video: { src: "/projects/atletec-tv/07-3d-objects.mp4" },
      },
      {
        src: "/projects/atletec-tv/05-styleframe.png",
        alt: "Styleframe — Warzone & FIFA social-media compositions, pattern system",
        ratio: "1920/2160",
        caption:
          "Styleframes — WARZONE, FIFA, ON EST EN LIVE — neon-green / magenta / black pattern language.",
      },
      {
        src: "/projects/atletec-tv/06-social-media.png",
        alt: "Social-media ecosystem — Instagram, stream planning, banners",
        ratio: "1920/2271",
        caption:
          "Social-media ecosystem — live stories, stream planning grid, channel banners across formats.",
      },
      {
        src: "/projects/atletec-tv/08-broadcast-scene-poster.jpg",
        alt: "3D broadcast scene — animated branding",
        ratio: "16/9",
        caption: "3D broadcast scene — branded environment for on-air segments.",
        video: { src: "/projects/atletec-tv/08-broadcast-scene.mp4" },
      },
      {
        src: "/projects/atletec-tv/09-final-branding-poster.jpg",
        alt: "ATLETEC WEBTV — final branding visual",
        ratio: "16/9",
        caption:
          "WebTV final — ATLETEC × Twitch destination, planning grid, partners line-up.",
        video: { src: "/projects/atletec-tv/09-final-branding.mp4" },
      },
    ],
    highlights: [
      {
        title: "FOUR EDITORIAL PILLARS",
        body: "Culture · Divertissement · Jeux Vidéo · Sport — each pillar carries its own colour roundel sitting inside the same Atletec mark, so the system reads as one channel with four moods.",
      },
      {
        title: "3D → PICTOGRAM",
        body: "Every studio object — speaker, mic, headset, joystick, ball — modelled and textured from scratch, then reduced to a pictogram for icon use and pattern fills.",
      },
      {
        title: "MODULAR, BROADCAST-READY",
        body: "The same identity flexes across stream banners, story templates, planning grids, partner line-ups and live-scene 3D environments — without losing the editorial frame.",
      },
    ],
    tags: ["CLIENT WORK", "ART DIRECTION", "MOTION", "GRAPHIC DESIGN"],
    disclaimer:
      "Project produced for Atletec — visuals shown for portfolio purposes; rights remain with Atletec.",
    featured: false,
  },
  {
    slug: "daft-punk-remastered",
    index: "10",
    title: "DAFT PUNK REMASTERED",
    subtitle: "ILLUSTRATION · ART DIRECTION · GRAPHIC DESIGN",
    category: "ART DIRECTION",
    shortDescription:
      "A VIBRANT ILLUSTRATION SERIES\nREIMAGINING DAFT PUNK",
    longDescription:
      "Daft Punk Remastered is a personal illustration project inspired by the visual legacy of Daft Punk and Japanese pop culture. The objective was to reinterpret the iconic duo through a vibrant graphic universe mixing retro-futurism, manga aesthetics, music packaging and editorial design. The project combines illustration, typography, print-inspired layouts and collectible-inspired visuals to create a fictional remastered release celebrating the impact of Daft Punk on modern visual culture.",
    year: "2022",
    client: "Personal Project",
    role: [
      "Art Direction",
      "Illustration",
      "Graphic Design",
      "Typography",
      "Print Design",
    ],
    deliverables: [
      "Helmet illustration diptych",
      "Album / single artwork",
      "CD case + sleeve mockups",
      "Poster — wrinkled plastic edition",
      "2070 collection variant",
      "Japanese typographic system",
    ],
    thumbnail: {
      // Per brief: same image as hero, only used here on the work grid card.
      src: "/projects/daft-punk-remastered/thumb.jpg",
      alt: "Daft Punk Remastered — helmet diptych",
      ratio: "16/9",
    },
    hero: {
      // Per brief: cinematic 16:9 helmet diptych, fullscreen hero presentation.
      src: "/projects/daft-punk-remastered/hero.jpg",
      alt: "Daft Punk Remastered — helmet diptych",
      ratio: "16/9",
    },
    gallery: [
      {
        src: "/projects/daft-punk-remastered/01-swirl-cd-cassettes.jpg",
        alt: "Daft Punk Remastered — central artwork, swirl + CDs + Sony cassettes",
        ratio: "1/1",
        caption:
          "Central artwork — Panasonic CD, Sony cassettes, halftone swirl, Japanese typographic stack.",
      },
      {
        src: "/projects/daft-punk-remastered/02-cd-case-mockup.jpg",
        alt: "CD case mockup — signed sleeve in cracked jewel case",
        ratio: "1920/1278",
        caption:
          "CD case mockup — signed sleeve framed inside a cracked jewel case, on a vinyl-record surface.",
      },
      {
        src: "/projects/daft-punk-remastered/03-cd-wrap-mockup.jpg",
        alt: "CD wrap mockup — alternate signed sleeve composition",
        ratio: "1920/1278",
        caption:
          "Alternate signed sleeve — wrinkled cellophane wrap over the same packaging system.",
      },
      {
        src: "/projects/daft-punk-remastered/04-cd-disc-mockup.jpg",
        alt: "CD disc mockup — printed disc face + outer sleeve",
        ratio: "1920/1278",
        caption:
          "Printed disc face + outer sleeve — the same artwork carried across every surface of the release.",
      },
      {
        src: "/projects/daft-punk-remastered/05-plastic-poster.jpg",
        alt: "Wrinkled plastic poster edition — collectible artwork",
        ratio: "1/1",
        caption:
          "Wrinkled plastic poster — limited collectible treatment, deliberate light catch on the surface.",
      },
      {
        src: "/projects/daft-punk-remastered/06-2070-holographic.jpg",
        alt: "2070 collection variant — holographic helmet study",
        ratio: "1/1",
        caption:
          "2070 collection variant — holographic helmet study, signature 2070 magenta-cyan palette.",
      },
    ],
    highlights: [
      {
        title: "RETRO-FUTURISM × JAPAN",
        body: "Cassette-era hardware, CD jewel cases and Japanese typographic stacks fused into a single visual language — the duo's legacy translated into a fictional Tokyo release.",
      },
      {
        title: "ONE WORLD, MANY SURFACES",
        body: "The same artwork carries across CD face, sleeve, wrinkled plastic poster and 2070 variant — every surface a different facet of the same release.",
      },
      {
        title: "EDITORIAL × COLLECTIBLE",
        body: "Print-design rules (grid, halftone, typographic hierarchy) applied to a piece designed to be collected — not just consumed.",
      },
    ],
    tags: ["ART DIRECTION", "ILLUSTRATION", "GRAPHIC DESIGN"],
    featured: false,
  },
  {
    slug: "social-media-icons",
    index: "11",
    title: "3D SOCIAL MEDIA ICONS",
    category: "3D",
    shortDescription:
      "A PLAYFUL COLLECTION OF 3D ICONS,\nWIDGETS & MOBILE INTERFACES",
    longDescription:
      "A personal exploration focused on creating a playful collection of 3D social media icons, widgets and mobile interfaces. The objective was to study shape language, color, lighting and interaction design through a series of stylized digital products. The project combines icon design, UI experimentation and motion-ready assets built entirely in Cinema 4D — every icon, widget and interface element modeled, textured and rendered from scratch. The result is a vibrant collection of modern digital objects inspired by contemporary mobile ecosystems and social platforms.",
    year: "2024",
    client: "Personal Project",
    role: ["3D Artist", "Motion Designer", "Art Director"],
    deliverables: [
      "3D Icon System",
      "Custom Widgets",
      "Mobile Interface Concepts",
      "Motion-Ready Assets",
    ],
    thumbnail: {
      src: "/projects/social-media-icons/1.jpg",
      alt: "3D Social Media Icons — row of stylized phone home screens",
      ratio: "16/9",
    },
    hero: {
      src: "/projects/social-media-icons/1.jpg",
      alt: "3D Social Media Icons — row of stylized phone home screens",
      ratio: "16/9",
    },
    gallery: [
      {
        src: "/projects/social-media-icons/2.jpg",
        alt: "Two phones — widget home screen beside the app grid",
        ratio: "16/9",
        caption: "Two screens — widgets and the 3D app grid.",
      },
      {
        src: "/projects/social-media-icons/3.jpg",
        alt: "Close-up of the top row of 3D social app icons",
        ratio: "16/9",
        caption: "Icon detail — messenger, youtube, line, discord.",
      },
      {
        src: "/projects/social-media-icons/4.jpg",
        alt: "Full 3D social media icon grid in close-up",
        ratio: "16/9",
        caption: "The full icon grid — extruded, lit, badged.",
      },
      {
        src: "/projects/social-media-icons/5.jpg",
        alt: "Two phones floating with a ribbon connecting their screens",
        ratio: "1/1",
        caption: "Home screen and app grid, tied by a ribbon of UI.",
      },
      {
        src: "/projects/social-media-icons/7.jpg",
        alt: "Widget home screen — Note, Bank, Social and a music player",
        ratio: "16/9",
        caption: "Widget layout — note, folders, now-playing.",
      },
      {
        src: "/projects/social-media-icons/8.jpg",
        alt: "Angled close-up of the Note widget and folder icons",
        ratio: "16/9",
        caption: "Note widget — paper texture, glass folders.",
      },
      {
        src: "/projects/social-media-icons/9.jpg",
        alt: "Exploded UI study — note, music player and floating 3D objects",
        ratio: "16/9",
        caption: "Exploded study — UI elements as standalone objects.",
      },
      {
        src: "/projects/social-media-icons/10.jpg",
        alt: "Detail of the Note widget header and lined paper",
        ratio: "16/9",
        caption: "Detail — the Note header and ruled paper surface.",
      },
    ],
    highlights: [
      {
        title: "MODULAR ICON SYSTEM",
        body: "Each icon was modeled to a shared grid and lighting setup — consistent across every app while preserving each platform's recognizable identity.",
      },
      {
        title: "WIDGETS AS OBJECTS",
        body: "Notes, folders and the music player were treated as tactile 3D products, not flat UI — paper, glass and plastic with real depth and shadow.",
      },
      {
        title: "BUILT FROM SCRATCH",
        body: "Every element modeled, textured and rendered in Cinema 4D with Redshift — a full study of shape, color and light, motion-ready from day one.",
      },
    ],
    externalUrl:
      "https://www.behance.net/gallery/125836575/3D-Social-Media-icons-Apps-Widgets",
    tags: ["3D", "GRAPHIC DESIGN", "UI DESIGN"],
    featured: false,
  },
  {
    slug: "the-incredibles",
    index: "12",
    title: "THE INCREDIBLES",
    subtitle: "ILLUSTRATED TRIBUTE",
    category: "ILLUSTRATION",
    shortDescription:
      "A BOLD VECTOR TRIBUTE TO\nPIXAR'S THE INCREDIBLES",
    longDescription:
      "A personal tribute project inspired by Pixar's iconic film The Incredibles. The objective was to reinterpret the universe of the film through a bold vector illustration style while preserving the energy, personality and visual identity of the original characters. The artwork was designed as a large-scale key visual capable of living across multiple formats — posters, environmental graphics and advertising displays. Inspired by cinematic posters and theme-park visuals, the composition places the Parr family at the center of an action-packed scene facing Syndrome and his Omnidroid, built from strong geometric shapes, simplified silhouettes and a limited color palette for an instantly recognizable graphic language.",
    year: "2022",
    client: "Personal Project",
    role: ["Illustrator", "Art Director"],
    deliverables: [
      "Vector key artwork",
      "Vertical poster",
      "Environmental graphics",
      "Large-scale advertising mockups",
    ],
    thumbnail: {
      src: "/projects/the-incredibles/1.jpg",
      alt: "The Incredibles — vector tribute key visual, the Parr family facing the Omnidroid",
      ratio: "3/1",
    },
    hero: {
      src: "/projects/the-incredibles/1.jpg",
      alt: "The Incredibles — vector tribute key visual, the Parr family facing the Omnidroid",
      ratio: "3/1",
    },
    gallery: [
      {
        src: "/projects/the-incredibles/3.jpg",
        alt: "The Incredibles — full key artwork composition",
        ratio: "16/9",
        caption:
          "Key artwork — built in vector, each character reduced to its iconic silhouette.",
      },
      {
        src: "/projects/the-incredibles/2.jpg",
        alt: "The Incredibles — vertical promotional poster",
        ratio: "3/4",
        caption:
          "Poster exploration — the family vs. the Omnidroid, readable from a distance.",
      },
      {
        src: "/projects/the-incredibles/5.jpg",
        alt: "The Incredibles — large-format mural in an office corridor",
        ratio: "3/2",
        caption:
          "Environmental graphics — the illustration as architectural, spatial branding.",
      },
      {
        src: "/projects/the-incredibles/4.jpg",
        alt: "The Incredibles — backlit poster displays in a dark space",
        ratio: "3/2",
        caption:
          "Large-scale advertising — visibility and impact in public display formats.",
      },
    ],
    highlights: [
      {
        title: "VECTOR-BUILT CAST",
        body: "Each character was reconstructed from simplified geometric forms while keeping their iconic silhouette and personality intact.",
      },
      {
        title: "MOVEMENT & SCALE",
        body: "Heroes, villain and environment were arranged to communicate action and scale — a single composition that reads instantly.",
      },
      {
        title: "ONE ARTWORK, MANY SURFACES",
        body: "Designed to live beyond print — poster, mural and backlit display all drawn from the same key visual.",
      },
    ],
    disclaimer:
      "Independent personal tribute inspired by Disney·Pixar's The Incredibles. Created for educational and portfolio purposes only.",
    tags: ["ILLUSTRATION", "ART DIRECTION"],
    featured: false,
  },
];

/* ───────────────────────── Taxonomy + helpers ───────────────────────── */

/** Filter taxonomy for the work page — shown left-to-right exactly. */
export const projectFilters: Array<"ALL" | ProjectCategory> = [
  "ALL",
  "CLIENT WORK",
  "ART DIRECTION",
  "GRAPHIC DESIGN",
  "MOTION",
  "ILLUSTRATION",
  "3D",
  "UI DESIGN",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Returns the next project in the running order — used by NextProject.
 * Loops back to the first after the last project.
 */
export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
