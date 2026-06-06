export type ProjectStatus = 'completed' | 'in_progress' | 'archived';

export interface ProjectTech {
  name: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tech: ProjectTech[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  updatedAt?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  private: boolean;
}