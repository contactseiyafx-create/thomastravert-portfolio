import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

/**
 * Top-left identity block.
 * Logo mark only — the wordmark beside it has been retired.
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="flex items-center gap-3 group"
    >
      <span className="relative block w-10 h-10 shrink-0">
        <Image
          src={site.brand.logoSvg}
          alt={`${site.name} logo`}
          fill
          priority
          sizes="40px"
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
        />
      </span>
    </Link>
  );
}
