/**
 * NAVIGATION
 * Order = display order.  `accent: true` paints the link pink.
 */

export type NavItem = {
  label: string;
  href: string;
  accent?: boolean;
  external?: boolean;
};

export const navigation: NavItem[] = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "2070 PROJECTS", href: "/2070", accent: true },
  { label: "MOTION", href: "/motion" },
  { label: "ABOUT", href: "/about" },
  { label: "LAB", href: "/lab", accent: true },
  { label: "CONTACT", href: "/contact" },
];

/* Mobile menu — same set, exposed for clarity */
export const mobileNavigation: NavItem[] = navigation;

/* Footer column links */
export const footerLinks: NavItem[] = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "MOTION", href: "/motion" },
  { label: "CONTACT", href: "/contact" },
];
