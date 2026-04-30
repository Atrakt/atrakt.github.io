/**
 * Core domain types for the Portfolio.
 * Defines the structure of Repository data, Language statistics, and API responses.
 */
export interface RepoLanguage {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GlobalLanguage extends RepoLanguage {
  color: string;
}

export interface Repo {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  version: string;
  topics: string[];
  languagesList: RepoLanguage[];
  readme_snippet: string;
}

export interface InitialData {
  repos: Repo[];
  globalStats: RepoLanguage[];
}
