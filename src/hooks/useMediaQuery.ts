/**
 * Hook to track CSS media queries for responsive logic.
 * @param query CSS media query string (e.g. '(max-width: 1023px)')
 * @returns boolean indicating if the viewport matches the query.
 */
import { useState, useEffect } from 'preact/hooks';

/**
 * Hook to track CSS media queries.
 * @param query CSS media query string (e.g. '(max-width: 767px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
