import type { Metadata } from "next";
import AbelianCaseStudy from "@/components/projects/AbelianCaseStudy";
import { LocalizedProjectPage } from "@/components/projects/LocalizedProjectPage";

export const metadata: Metadata = {
  title: "Abelian — Post-Quantum Brand System",
  description:
    "A multi-year creative partnership with Abelian, a post-quantum blockchain. Brand marketing, motion, education, community campaigns, event design and the Hako mascot.",
  openGraph: {
    title: "Abelian — Travert Thomas",
    description:
      "Multi-year brand system for a post-quantum blockchain: marketing, motion, education, community and an original mascot.",
    images: [{ url: "/projects/abelian/01-balanced-privacy.jpg" }],
  },
};

export default function AbelianPage() {
  return (
    <LocalizedProjectPage slug="abelian">
      <AbelianCaseStudy />
    </LocalizedProjectPage>
  );
}
