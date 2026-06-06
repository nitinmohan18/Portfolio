"use client";

import { useEffect, useState } from "react";
import { getGithubRepos, getGithubUser } from "@/lib/github";
import type { GithubRepo, GithubUser } from "@/types/project";

interface UseGithubReturn {
  user: GithubUser | null;
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGithub(): UseGithubReturn {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [userData, reposData] = await Promise.all([
          getGithubUser(),
          getGithubRepos(),
        ]);
        if (!cancelled) {
          setUser(userData);
          setRepos(reposData);
        }
      } catch {
        if (!cancelled) setError("Failed to fetch GitHub data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, repos, loading, error };
}
