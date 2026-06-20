export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitinpandey.dev";


export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;


export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;
