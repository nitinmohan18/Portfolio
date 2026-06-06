export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  featured: boolean;
}

// Empty for now — add certifications here when earned
export const certifications: Certification[] = [];