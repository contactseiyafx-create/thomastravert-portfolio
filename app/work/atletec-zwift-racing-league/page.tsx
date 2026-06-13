import type { Metadata } from "next";
import AtletecZwiftCaseStudy from "@/components/projects/AtletecZwiftCaseStudy";

export const metadata: Metadata = {
  title: "Atletec Zwift Racing League — Case Study",
  description:
    "A premium case study for Atletec Zwift Racing League: art direction, motion design, 3D design and season-long social media communication.",
  openGraph: {
    title: "Atletec Zwift Racing League — Travert Thomas",
    description:
      "Art direction, motion design, 3D design and social media system for Atletec inside the Zwift Racing League ecosystem.",
    images: [
      {
        url: "/projects/atletec-zwift-racing-league/hero-cover.png",
        alt: "Atletec Zwift Racing League case study cover",
      },
    ],
  },
};

export default function AtletecZwiftPage() {
  return <AtletecZwiftCaseStudy />;
}
