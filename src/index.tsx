import "./index.css";
import { render, hydrate } from "preact";
import App from "./App";
import { Sidebar } from "./components/Sidebar";
import { RepoListContainer } from "./components/RepoListContainer";
import { BackToTop } from "./components/BackToTop";
import { FALLBACK_LANGUAGE_COLOR } from "./constants/constants";
import type { RepoLanguage } from "./types/types";
import { getPreloadedData, getPreloadedColors } from "./utils/data";

/**
 * Initialize selective hydration for interactive zones.
 * Data is retrieved from the non-blocking JSON scripts injected during prerender.
 */
function initHydration() {
  const data = getPreloadedData();
  const colors = getPreloadedColors();

  // 1. Hydrate Sidebar
  const sidebarRoot = document.getElementById("sidebar");
  if (sidebarRoot && data?.globalStats) {
    const languages = data.globalStats.map((stat: RepoLanguage) => ({
      ...stat,
      color: colors[stat.name] || FALLBACK_LANGUAGE_COLOR,
    }));
    hydrate(<Sidebar globalLanguages={languages} />, sidebarRoot);
  }

  // 2. Hydrate Repository List
  const repoListRoot = document.getElementById("repolist");
  if (repoListRoot) {
    hydrate(<RepoListContainer />, repoListRoot);
  }

  // 3. Hydrate Back to Top button
  const scrollTopRoot = document.getElementById("scroll-top");
  if (scrollTopRoot) {
    hydrate(<BackToTop />, scrollTopRoot);
  }
}

/**
 * Main entry point.
 * Performs full render in development or empty state,
 * and selective hydration in production SSG.
 */
function init() {
  const root = document.getElementById("root");
  const isDev = import.meta.env.DEV;

  // If we are in Dev or if the root is un-prerendered, perform full render
  if (isDev || !root?.innerHTML.trim() || root?.innerHTML.includes("<!-- INJECT_CONTENT -->")) {
    render(<App />, root!);
  } else {
    // In production SSG, perform surgical hydration
    initHydration();
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
