import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

/**
 * /about route — Server Component.
 *
 * Stays a server component so `export const metadata` keeps producing
 * the static title/description.  The page body lives in
 * `components/AboutClient.tsx` because it uses Framer Motion / refs.
 */
export const metadata: Metadata = {
  title: "About",
  description:
    "Tokyo-based art director & senior multimedia designer crafting visual experiences across art direction, motion design, branding and illustration.",
};

export default function AboutPage() {
  return <AboutClient />;
}
