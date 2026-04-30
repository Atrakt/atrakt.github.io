import type { InitialData } from "../types/types";

type GlobalWithData = {
  __INITIAL_DATA__?: InitialData;
  __INITIAL_COLORS__?: Record<string, string>;
};

/**
 * Retrieves preloaded data injected into the DOM during prerendering.
 * Supports both direct window properties and script tag content.
 */
export const getPreloadedData = (): InitialData | undefined => {
  if (typeof window === "undefined") {
    return (globalThis as unknown as GlobalWithData).__INITIAL_DATA__;
  }

  if ((window as any).__INITIAL_DATA__) {
    return (window as any).__INITIAL_DATA__;
  }

  const el = document.getElementById("preloaded-data");
  try {
    return el?.textContent ? JSON.parse(el.textContent) : undefined;
  } catch (error) {
    console.error("Error parsing preloaded-data:", error);
    return undefined;
  }
};

/**
 * Retrieves preloaded color mappings injected into the DOM during prerendering.
 */
export const getPreloadedColors = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return (globalThis as unknown as GlobalWithData).__INITIAL_COLORS__ ?? {};
  }

  if ((window as any).__INITIAL_COLORS__) {
    return (window as any).__INITIAL_COLORS__;
  }

  const el = document.getElementById("preloaded-colors");
  try {
    return el?.textContent ? JSON.parse(el.textContent) : {};
  } catch (error) {
    console.error("Error parsing preloaded-colors:", error);
    return {};
  }
};
