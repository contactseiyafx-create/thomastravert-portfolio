import type { Metadata } from "next";
import VeniceCarnivalCaseStudy from "@/components/projects/VeniceCarnivalCaseStudy";
import { LocalizedProjectPage } from "@/components/projects/LocalizedProjectPage";

export const metadata: Metadata = {
  title: "Venice Carnival — Case Study",
  description:
    "A fictional Venice Carnival visual identity exploring art direction, graphic design, illustration, poster design and event applications.",
  openGraph: {
    title: "Venice Carnival — Travert Thomas",
    description:
      "A personal illustration and identity project inspired by the Venice Carnival.",
    images: [
      {
        url: "/projects/venice-carnival/hero-header.png",
        alt: "Venice Carnival illustrated mask key visual",
      },
    ],
  },
};

export default function VeniceCarnivalPage() {
  return (
    <LocalizedProjectPage slug="venice-carnival">
      <VeniceCarnivalCaseStudy />
    </LocalizedProjectPage>
  );
}
