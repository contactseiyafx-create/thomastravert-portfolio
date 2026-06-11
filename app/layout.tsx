import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans, JetBrains_Mono, Noto_Sans_JP, Caveat } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { SideRail } from "@/components/SideRail";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";

/* ─────────────────────────────────────────────
   FONTS
   • Anton           — massive condensed display
   • DM Sans         — body / UI
   • JetBrains Mono  — micro labels, eyebrows, technical
   • Noto Sans JP    — JP characters
   ───────────────────────────────────────────── */
const fontDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const fontJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
  display: "swap",
});
const fontScript = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-script",
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
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontJp.variable} ${fontScript.variable}`}
    >
      <body className="bg-ink text-bone font-sans antialiased min-h-screen">
        <Preloader />
        <SmoothScroll />
        <Navbar />
        <SideRail />
        <PageTransition>
          <main className="relative">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
