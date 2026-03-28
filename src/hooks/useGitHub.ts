"use client";

import { useState, useEffect } from "react";

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  fork: boolean;
}

export const useGitHub = (username: string) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        
        // Filter out forks and unwanted test/profile repos
        const excludedNames = ["jhg", "gvjgf", "nikhiljeeva", "nikhiljeeva0-ui", "nikhil-jeeva"]; 
        const filteredRepos = (data as any[]).filter(
          (repo) => !repo.fork && !excludedNames.includes(repo.name.toLowerCase())
        ).map(repo => ({
          ...repo,
          topics: repo.topics || [],
          // Custom overrides for specific repos
          homepage: repo.name.toLowerCase().includes("aervia") 
            ? "https://aervia.vercel.app/" 
            : repo.homepage
        }));
        
        setRepos(filteredRepos);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
};
