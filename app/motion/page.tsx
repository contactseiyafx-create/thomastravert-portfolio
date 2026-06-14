import type { Metadata } from "next";
import { MotionClient } from "@/components/motion/MotionClient";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return <MotionClient />;
}
