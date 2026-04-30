import { memo } from 'preact/compat';
import type { RepoLanguage } from '../types/types';
import { FALLBACK_LANGUAGE_COLOR } from '../constants/constants';

interface Props {
  languages: RepoLanguage[];
  githubColors: Record<string, string>;
}

export const LanguageBar = memo(function LanguageBar({ languages, githubColors }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-semibold uppercase tracking-wider text-muted/80">
        Languages
      </div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-border">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: githubColors[lang.name] || FALLBACK_LANGUAGE_COLOR
            }}
            className="h-full"
            role="progressbar"
            aria-valuenow={lang.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${lang.name} : ${lang.percentage.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {languages.slice(0, 4).map(lang => (
          <div key={lang.name} className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted/80">
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: githubColors[lang.name] || FALLBACK_LANGUAGE_COLOR }}
                aria-hidden={true}
              />
              <span className="truncate max-w-[100px]" aria-label={`Language: ${lang.name}`}>{lang.name}</span>
            </div>
            <span className="tabular-nums" aria-label={`${lang.percentage.toFixed(1)} percent`}>
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
