/**
 * SOCIAL LINKS
 * `icon` matches keys inside <SocialIcon /> component.
 */

export type Social = {
  label: string;
  icon: "instagram" | "dribbble" | "vimeo" | "behance" | "x" | "linkedin";
  href: string;
};

export const socials: Social[] = [
  { label: "Instagram", icon: "instagram", href: "https://instagram.com/thomastravert" },
  { label: "Dribbble", icon: "dribbble", href: "https://dribbble.com/thomastravert" },
  { label: "Vimeo", icon: "vimeo", href: "https://vimeo.com/thomastravert" },
];

/* Contact channels — used on /contact and /footer */
export const contact = {
  email: "thomastravertpro@gmail.com",
  emailLabel: "THOMASTRAVERTPRO@GMAIL.COM",
  phone: "+81 (0) 90 0000 0000",
  location: "Tokyo, Japan",
  locationJp: "東京、日本",
  timezone: "JST · UTC+9",
  scheduling: "https://cal.com/thomastravert",
};
