import { useState, useEffect } from "preact/hooks";
import type { GlobalLanguage, InitialData } from "../types/types";
import { FALLBACK_LANGUAGE_COLOR } from "../constants/constants";
import { getPreloadedData, getPreloadedColors } from "../utils/data";

export function useGitHubRepos() {
  const [data, setData] = useState<InitialData | undefined>(getPreloadedData());
  const [colors, setColors] = useState<Record<string, string>>(getPreloadedColors());

  useEffect(() => {
    // If we have no data (Development mode), fetch it from local JSON files
    if (!data || Object.keys(colors).length === 0) {
      const fetchData = async () => {
        try {
          const [dataRes, colorsRes] = await Promise.all([
            fetch('./github-data.json'),
            fetch('./github-colors.json')
          ]);
          
          if (dataRes.ok) {
            const jsonData = await dataRes.json();
            setData(jsonData);
          }
          
          if (colorsRes.ok) {
            const jsonColors = await colorsRes.json();
            setColors(jsonColors);
          }
        } catch (error) {
          console.error("Development fetch error:", error);
        }
      };
      fetchData();
    }
  }, []);

  const repos = data?.repos ?? [];
  const globalLanguages: GlobalLanguage[] = (data?.globalStats ?? []).map((stat) => ({
    ...stat,
    color: colors[stat.name] || FALLBACK_LANGUAGE_COLOR,
  }));

  return { repos, githubColors: colors, globalLanguages };
}
