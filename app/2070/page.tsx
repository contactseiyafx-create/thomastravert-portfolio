import type { Metadata, Viewport } from "next";
import { ComingSoon2070 } from "@/components/ComingSoon2070";

export const metadata: Metadata = {
  title: "2070 · Future Archive 001",
  description: "2070 — coming soon. My world is under construction. Tokyo, Japan.",
};

/** Match the page's solid background so mobile UI chrome blends with it. */
export const viewport: Viewport = {
  themeColor: "#002048",
};

export default function Page() {
  return <ComingSoon2070 />;
}
