import { memo } from "preact/compat";
import type { Repo } from "../types/types";
import { LanguageBar } from "./LanguageBar";

interface Props {
  repo: Repo;
  githubColors: Record<string, string>;
}

export const RepoCard = memo(function RepoCard({ repo, githubColors }: Props) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${repo.name} — view on GitHub (opens in new tab)`}
      className="group relative flex flex-col sm:flex-row gap-6 border-b border-border py-12 transition-[border-color,transform,translate] first:pt-0 [content-visibility:auto] lg:hover:translate-x-1 lg:hover:border-primary/60 focus:outline-none lg:focus-visible:translate-x-1"
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground lg:transition-colors lg:group-hover:text-primary flex items-baseline gap-4 text-balance">
            {repo.name}
            {repo.version && (
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary/60 lg:transition-colors lg:group-hover:text-primary">
                {repo.version}
              </span>
            )}
          </h2>
        </div>

        <p className="font-sans text-lg leading-relaxed text-muted max-w-[65ch] italic">
          {repo.description || "No description available."}
        </p>

        {repo.topics && repo.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="font-mono text-xs uppercase tracking-[0.2em] text-primary/60 lg:transition-colors lg:group-hover:text-primary"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right Column (Stats) */}
      <div className="flex w-full sm:w-48 shrink-0 flex-col gap-6 sm:items-end">
        {/* Desktop/Tablet Stats (Visible >= 640px) */}
        <div className="hidden sm:flex flex-col gap-2 font-mono text-xs tabular-nums tracking-[0.2em] text-muted/80">
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs">STARS</span> <span className="text-foreground">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs">FORKS</span> <span className="text-foreground">{repo.forks_count}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs">WATCH</span> <span className="text-foreground">{repo.watchers_count}</span>
          </div>
        </div>

        {/* Mobile Stats (Visible < 640px) */}
        <div className="flex sm:hidden items-center gap-3 font-mono text-xs tabular-nums tracking-[0.15em] text-muted/80">
          <span>
            STARS <span className="text-foreground">{repo.stargazers_count}</span>
          </span>
          <span aria-hidden={true}>·</span>
          <span>
            FORKS <span className="text-foreground">{repo.forks_count}</span>
          </span>
          <span aria-hidden={true}>·</span>
          <span>
            WATCH <span className="text-foreground">{repo.watchers_count}</span>
          </span>
        </div>

        {repo.languagesList && repo.languagesList.length > 0 && (
          <div className="w-full">
            <LanguageBar languages={repo.languagesList} githubColors={githubColors} />
          </div>
        )}
      </div>
    </a>
  );
});
