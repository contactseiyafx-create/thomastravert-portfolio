import type { Metadata } from "next";
import LabExperience from "@/components/lab/LabExperience";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "A hidden creative archive inside the portfolio — coded apps and an evolving vault of design experiments.",
};

export default function LabPage() {
  return <LabExperience />;
}
