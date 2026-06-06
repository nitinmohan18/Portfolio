export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nitinmohan.dev';
export const GITHUB_USERNAME = 'nitinmohan18';
export const GITHUB_API = 'https://api.github.com';

export const NAV_LINKS = [
  { label: 'Home', href: '#home', index: '01' },
  { label: 'About', href: '#about', index: '02' },
  { label: 'Skills', href: '#skills', index: '03' },
  { label: 'Projects', href: '#projects', index: '04' },
  { label: 'Education', href: '#education', index: '05' },
  { label: 'Certifications', href: '#certifications', index: '06' },
  { label: 'Contact', href: '#contact', index: '07' },
] as const;

export const SECTION_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
} as const;

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
} as const;

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;