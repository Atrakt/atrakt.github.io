import { memo } from 'preact/compat';
import type { GlobalLanguage } from '../types/types';

interface Props {
  languages: GlobalLanguage[];
}

export const GlobalLanguageList = memo(function GlobalLanguageList({ languages }: Props) {
  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="mb-4 pb-3 border-b border-border text-sm font-semibold tracking-wider text-muted/80 uppercase shrink-0">
        Global Languages
      </h2>
      <div className="flex flex-col gap-3 flex-1">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] shrink-0"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
                aria-hidden={true}
              />
              <span className="text-foreground" aria-label={`Language: ${lang.name}`}>{lang.name}</span>
            </div>
            <span className="text-muted/80 tabular-nums" aria-label={`${lang.percentage.toFixed(1)} percent of total`}>
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
