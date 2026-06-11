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
    "Tokyo-based graphic / motion designer & CGI art director crafting cinematic visual experiences.",
};

export default function AboutPage() {
  return <AboutClient />;
}
