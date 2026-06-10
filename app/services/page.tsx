import type { Metadata } from "next";
import ServicesClient from "@/components/services/ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative Direction, Motion Design and Visual Systems — for brands that want to move differently.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
