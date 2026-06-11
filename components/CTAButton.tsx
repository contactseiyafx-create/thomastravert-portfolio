"use client";

import Link from "next/link";
import { useRef, MouseEvent } from "react";

type Props = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Pink-bordered CTA button.
 * Uses the .cta-btn class for the fill-up hover, and adds magnetic motion in JS.
 */
export function CTAButton({
  label,
  href,
  external = false,
  variant = "primary",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const classes = `cta-btn ${className} ${
    variant === "ghost" ? "border-bone-line text-bone" : ""
  }`;

  const content = (
    <>
      <span>{label}</span>
      <Arrow />
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${classes} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${classes} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      {content}
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      className="arrow"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
