import type { GithubRepo, GithubUser } from "@/types/project";

const BASE = "https://api.github.com";
const USERNAME = "nitinmohan18";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function getGithubUser(): Promise<GithubUser | null> {
  try {
    const res = await fetch(`${BASE}/users/${USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<GithubUser>;
  } catch {
    return null;
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `${BASE}/users/${USERNAME}/repos?sort=updated&per_page=30`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    let repos: GithubRepo[] = await res.json();
    
    // Apply overrides for specific projects
    repos = repos.map(repo => {
      if (repo.name.toLowerCase() === "windly-backend" || repo.description === "windly weather app backend code") {
        return {
          ...repo,
          description: "Python backend powering weather intelligence through FastAPI services, Random Forest prediction models, and real-time forecast processing."
        };
      }
      if (repo.name.toLowerCase() === "windly-frontend") {
        return {
          ...repo,
          homepage: "https://windly-weather.vercel.app"
        } as unknown as GithubRepo;
      }
      return repo;
    });

    const sortedRepos = repos.filter((r) => !r.fork).sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );

    // Swap windly-frontend and windly-backend if both exist
    const frontendIndex = sortedRepos.findIndex(r => r.name.toLowerCase() === "windly-frontend");
    const backendIndex = sortedRepos.findIndex(r => r.name.toLowerCase() === "windly-backend");
    
    if (frontendIndex !== -1 && backendIndex !== -1) {
      const temp = sortedRepos[frontendIndex];
      sortedRepos[frontendIndex] = sortedRepos[backendIndex];
      sortedRepos[backendIndex] = temp;
    }

    return sortedRepos;
  } catch {
    return [];
  }
}

export function detectLanguageColor(language: string | null): string {
  const map: Record<string, string> = {
    Python: "#3776AB",
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    "C++": "#00599C",
    Java: "#ED8B00",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Rust: "#DEA584",
    Go: "#00ADD8",
    Shell: "#89E051",
  };
  return language ? (map[language] ?? "#6C63FF") : "#6C63FF";
}