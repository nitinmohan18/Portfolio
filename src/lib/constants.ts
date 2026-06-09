export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitinmohan.dev";

export const GITHUB_USERNAME = "nitinmohan18";

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  cinematic: 1.4,
} as const;

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

export const THEME_COLORS = {
  primary: "#6C63FF",
  secondary: "#A78BFA",
  accent: "#38BDF8",
  glow: "#7C3AED",
  dark: {
    900: "#030712",
    800: "#0a0f1e",
    700: "#0d1424",
    600: "#111827",
    500: "#1f2937",
  },
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
} as const;

export const PERFORMANCE = {
  // Reduce particle count / polygon count on mobile
  MOBILE_QUALITY_MULTIPLIER: 0.5,
  TARGET_FPS: 60,
} as const;