import { GITHUB_API, GITHUB_USERNAME } from './constants';
import type { GithubRepo, Project } from '@/types/project';

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos: GithubRepo[] = await res.json();
    return repos.filter((r) => !r.fork && !r.private);
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    return [];
  }
}

export function repoToProject(repo: GithubRepo): Project {
  return {
    id: String(repo.id),
    title: repo.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description ?? 'No description available.',
    tech: buildTechStack(repo),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage ?? undefined,
    featured: repo.stargazers_count > 0,
    status: 'completed',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language ?? undefined,
    topics: repo.topics,
    updatedAt: repo.updated_at,
  };
}

function buildTechStack(repo: GithubRepo): Project['tech'] {
  const stack: Project['tech'] = [];
  if (repo.language) stack.push({ name: repo.language });
  repo.topics.slice(0, 4).forEach((t) =>
    stack.push({ name: t.replace(/-/g, ' ') }),
  );
  return stack;
}

export async function fetchGithubStats() {
  try {
    const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch GitHub stats:', err);
    return null;
  }
}