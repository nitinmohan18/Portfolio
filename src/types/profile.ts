export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  email: string;
}

export interface ProfileStats {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  tagline: string;
  bio: string;
  shortBio: string;
  email: string;
  location: string;
  available: boolean;
  social: SocialLinks;
  stats: ProfileStats[];
  resumeUrl: string | null;
  typingRoles: string[];
}