export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "ai-ml" | "web" | "tools" | "other";
  stars?: number;
  forks?: number;
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
}

export interface GithubUser {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}