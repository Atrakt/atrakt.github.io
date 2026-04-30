/**
 * Project constants and Design System tokens.
 * CSS animation durations live in `index.css` `@theme` (--animate-enter, --default-transition-duration).
 * That file is the single source of truth for transition timing.
 */

const env = (import.meta as any).env || process.env || {};

/**
 * Site metadata used at runtime in the client.
 * Build-time SEO/meta injection reads .env directly via `vite.config.ts`.
 */
export const METADATA = {
  name: env.VITE_APP_NAME || "Portfolio",
  since: env.VITE_APP_SINCE || new Date().getFullYear().toString(),
};

/**
 * Structural layout dimensions and interaction thresholds.
 */
export const LAYOUT = {
  SCROLL_THRESHOLD: 400, // Threshold in pixels to show 'Back to Top' button
};

/**
 * SVG Path data for icons to keep component boilerplate minimal.
 */
export const ICON_PATHS = {
  CHEVRON_DOWN: "m6 9 6 6 6-6",
  CHEVRON_UP: "m18 15-6-6-6 6",
};

/**
 * Number of repositories to show per page on Desktop.
 */
export const PAGINATION_THRESHOLD = 6;

/**
 * Default color for languages not found in github-colors.json.
 */
export const FALLBACK_LANGUAGE_COLOR = "#8b8b8b";
