"use client";

import { useEffect, useState } from "react";
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
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        if (!cancelled) {
          setUser(data.user);
          setRepos(data.repos);
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
