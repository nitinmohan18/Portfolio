export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: "ai-ml" | "cloud" | "web" | "data" | "other";
}

// Empty for now — add certifications here when earned
export const certifications: Certification[] = [];