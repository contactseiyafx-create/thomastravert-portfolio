import type { Social } from "@/data/socials";

/**
 * Self-contained SVG icon set for the social rail.
 * 16px square viewBox, currentColor strokes/fills so theming is one line.
 */
type Props = {
  name: Social["icon"];
  className?: string;
};

export function SocialIcon({ name, className }: Props) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
  };

  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" />
          <circle cx="8" cy="8" r="3" stroke="currentColor" />
          <circle cx="11.5" cy="4.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "vimeo":
      return (
        <svg {...common}>
          <path
            d="M1.7 4.8c.5-.5 1.4-1.2 2.4-1.4 1.4-.3 2.2.4 2.5 2 .3 1.4.5 4 1.3 4.4.7.4 1.7-1 2.1-1.9.4-.9.6-2.1-.4-2.4-.6-.2-1.2.1-1.2.1S9 3.4 11 3c1.8-.4 2.7 1 2.6 2.8-.1 1.8-2 4.6-3.6 6.4-1.6 1.7-3 1.6-3.9-.5C5.6 10 5.3 8 4.7 7.2c-.5-.7-1.4 0-2 .6L1.7 4.8z"
            fill="currentColor"
          />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path
            d="M2 4h3c1.3 0 2.2.8 2.2 1.8s-.6 1.5-1.2 1.7c.9.2 1.6.9 1.6 2 0 1.4-1 2.2-2.5 2.2H2V4zm1.3 3h1.8c.6 0 1-.4 1-.9s-.4-.9-1-.9H3.3v1.8zm0 3.4h2c.7 0 1.2-.4 1.2-1s-.5-1.1-1.2-1.1h-2v2.1zM11.8 11.8c-1.6 0-2.7-1.1-2.7-2.7s1.1-2.7 2.7-2.7c1.5 0 2.5 1 2.5 2.6v.4h-3.8c.1.6.6 1 1.3 1 .4 0 .8-.1 1-.4l.8.7c-.5.6-1.1.9-2 1.1zm-1.2-3.4h2.5c-.1-.5-.5-.9-1.2-.9s-1.2.4-1.3.9zM9.6 4.5h3.7V5.4H9.6z"
            fill="currentColor"
          />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path
            d="M2.5 2.5l4.7 6.3-4.9 4.7h1.6l4-3.8 2.8 3.8h3.7L9.5 7l4.6-4.5h-1.6l-3.7 3.6-2.6-3.6H2.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" />
          <rect x="4" y="6.5" width="1.5" height="6" fill="currentColor" />
          <circle cx="4.75" cy="4.6" r="0.9" fill="currentColor" />
          <path
            d="M7.5 12.5V6.5h1.5v.9c.3-.6 1-1 1.9-1 1.4 0 2.1.9 2.1 2.4v3.7h-1.5V9.2c0-.8-.3-1.4-1.1-1.4-.7 0-1.2.5-1.2 1.4v3.3H7.5z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
