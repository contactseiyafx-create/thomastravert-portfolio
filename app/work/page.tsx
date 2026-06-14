import type { Metadata } from "next";
import { WorkClient } from "@/components/projects/WorkClient";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return <WorkClient />;
}
