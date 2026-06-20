interface SocialLink {
  platform: "github" | "linkedin" | "instagram" | "twitter" | "email";
  url: string;
  label: string;
}

interface StatCard {
  icon: string;
  value: string;
  label: string;
  description: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  resumeUrl: string | null;
  socials: SocialLink[];
  stats: StatCard[];
  typingRoles: string[];
}