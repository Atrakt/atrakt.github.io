import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^#\s][^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

const out = path.resolve(__dirname, "../public/github-data.json");
if (fs.existsSync(out) && Date.now() - fs.statSync(out).mtimeMs < 12 * 3600 * 1000) {
  console.log("[predev] Skipped (fresh cache)");
  process.exit(0);
}

const token = process.env.GH_PAT;
if (!token) {
  console.error(
    "ERROR: GH_PAT not found in environment or .env file",
  );
  console.error(
    "Please create a 'read-only' token on GitHub and add it to the .env file locally or to GitHub Secrets in production.",
  );
  process.exit(1);
}

const GITHUB_USERNAME = process.env.VITE_APP_GH_USERNAME || "atrakt";

const query = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          watchers { totalCount }
          repositoryTopics(first: 5) {
            nodes { topic { name } }
          }
          releases(first: 1) {
            nodes { tagName }
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node { name }
            }
          }
          object(expression: "HEAD:README.md") {
            ... on Blob { text }
          }
        }
      }
    }
  }
`;

async function fetchGitHubData() {
  console.log("[Build-Time] Fetching GitHub data via GraphQL...");
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    const nodes = json.data?.user?.repositories?.nodes || [];

    const reposWithDetails = nodes.map((node) => {
      let readme_snippet = "";
      if (node.object?.text) {
        const cleanText = node.object.text
          .replace(/!\[.*?\]\(.*?\)/g, "")
          .replace(/\[(.*?)\]\(.*?\)/g, "$1")
          .replace(/[#*`>]/g, "")
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 30);
        if (cleanText.length > 0) {
          const first = cleanText[0];
          readme_snippet =
            first.length > 150 ? first.substring(0, 150) + "..." : first;
        }
      }

      const totalBytes =
        node.languages?.edges?.reduce((sum, edge) => sum + edge.size, 0) || 1;
      const languagesList = (node.languages?.edges || []).map((edge) => ({
        name: edge.node.name,
        bytes: edge.size,
        percentage: (edge.size / totalBytes) * 100,
      }));

      return {
        id: node.id,
        name: node.name,
        description: node.description,
        html_url: node.url,
        stargazers_count: node.stargazerCount,
        forks_count: node.forkCount,
        watchers_count: node.watchers?.totalCount || 0,
        version: node.releases?.nodes?.[0]?.tagName || "",
        topics: node.repositoryTopics?.nodes?.map((n) => n.topic.name) || [],
        languagesList,
        readme_snippet,
      };
    });

    const globalStatsMap = {};
    reposWithDetails.forEach((repo) => {
      repo.languagesList.forEach((lang) => {
        globalStatsMap[lang.name] =
          (globalStatsMap[lang.name] || 0) + lang.bytes;
      });
    });

    const totalGlobalBytes = Object.values(globalStatsMap).reduce(
      (a, b) => a + b,
      0,
    );
    const globalStats = Object.entries(globalStatsMap)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: (bytes / totalGlobalBytes) * 100,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    const publicDir = path.resolve(__dirname, "../public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(
      path.resolve(publicDir, "github-data.json"),
      JSON.stringify({ repos: reposWithDetails, globalStats }, null, 2),
    );
    console.log(
      "[Build-Time] GitHub data secured and generated in public/github-data.json",
    );

    const today = new Date().toISOString().split("T")[0];
    fs.writeFileSync(
      path.resolve(publicDir, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.VITE_APP_URL || "https://atrakt.github.io/"}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
    );
    console.log(`[Build-Time] Sitemap generated with lastmod=${today}`);
  } catch (error) {
    console.error("ERROR during GitHub fetch:", error.message);
    process.exit(1);
  }
}

fetchGitHubData();
