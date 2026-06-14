import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { SideRail } from "@/components/SideRail";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";
import { LanguageProvider } from "@/components/LanguageProvider";

/* ─────────────────────────────────────────────
   FONTS — single global typeface
   ─────────────────────────────────────────────
   Space Grotesk handles every Latin surface (display, body, mono labels,
   script accents). One typeface, multiple weights — premium, contemporary,
   editorial. Loaded with [300, 400, 500, 600, 700] to cover every weight
   the typography hierarchy needs.

   Noto Sans JP is kept ONLY for Japanese characters (連絡, 選集, リール, etc.).
   Space Grotesk has no CJK glyphs — without Noto, those eyebrows would
   fall back to OS defaults (Hiragino / MS Mincho / etc.) and break the DA.
   ───────────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const fontJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.brand.role}, ${site.brand.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: site.locale,
    images: [{ url: site.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    creator: site.brand.handle,
  },
  icons: { icon: site.brand.logoSvg },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${fontJp.variable}`}
    >
      <body className="bg-ink text-bone font-sans antialiased min-h-screen">
        <LanguageProvider>
          <Preloader />
          <SmoothScroll />
          <Navbar />
          <SideRail />
          <PageTransition>
            <main className="relative">{children}</main>
          </PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
