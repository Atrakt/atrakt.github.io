import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { h } from 'preact';
import { renderToString } from 'preact-render-to-string';
import prettier from 'prettier';
import { loadEnv } from 'vite';

// Mock Node environment for Preact
globalThis.window = undefined;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables for Node environment
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^#\s][^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

async function run() {
  const distPath = path.resolve(__dirname, '../dist/index.html');
  const dataPath = path.resolve(__dirname, '../public/github-data.json');
  const colorsPath = path.resolve(__dirname, '../public/github-colors.json');

  if (!fs.existsSync(distPath)) {
    console.error('dist/index.html not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // 1. Load data
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const fullColors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8'));

  // Filter used language colors
  const used = new Set();
  (data.repos || []).forEach(r => (r.languagesList || []).forEach(l => l.name && used.add(l.name)));
  const colors = {};
  used.forEach(l => { if (fullColors[l]) colors[l] = fullColors[l]; });

  // 2. Load environment variables and generate JSON-LD
  const env = loadEnv('production', process.cwd(), 'VITE_APP');
  Object.assign(process.env, env);
  
  const siteUrl = env.VITE_APP_URL || "";
  const ghUrl = env.VITE_APP_GH_URL || "https://github.com";
  const appName = env.VITE_APP_NAME || "Portfolio";
  const appTitle = env.VITE_APP_TITLE || "My Portfolio";
  const description = env.VITE_APP_DESCRIPTION || "Open-source projects showcase.";
  const logoUrl = env.VITE_APP_LOGO_URL || "";
  const ogImage = siteUrl + "og-image.png";
  
  // Extract unique languages from global stats (the languages actually used in repos)
  const allLanguages = (data.globalStats || [])
    .map(stat => stat.name)
    .filter(name => name && name !== "Other")
    .sort();

  const jsonLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": appTitle,
        "description": description,
        "author": { "@id": `${siteUrl}#person` },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        "name": appName,
        "url": ghUrl,
        "jobTitle": env.VITE_APP_JOB_TITLE || "Software Engineer",
        "description": env.VITE_APP_JSONLD_DESC || description,
        "image": logoUrl || undefined,
        "knowsAbout": allLanguages,
        "sameAs": [ghUrl]
      }
    ]
  };

  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLD, null, 2).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')}\n</script>`;

  // 3. Inject into global for SSR
  globalThis.__INITIAL_DATA__ = data;
  globalThis.__INITIAL_COLORS__ = colors;

  // 4. Dynamic import of App
  const { default: App } = await import('../src/App.tsx');

  console.log('Generating static HTML content...');
  const appHtml = renderToString(h(App, {}));

  // 5. Read and Inject
  let html = fs.readFileSync(distPath, 'utf-8');
  
  // Replace placeholders (formerly in vite.config.ts)
  html = html
    .replace(/__APP_NAME__/g, appName)
    .replace(/__APP_TITLE__/g, appTitle)
    .replace(/__APP_DESCRIPTION__/g, description)
    .replace(/__APP_URL__/g, siteUrl)
    .replace(/__APP_OG_IMAGE__/g, ogImage)
    .replace(/__APP_GH_URL__/g, ghUrl);

  html = html.replace('<!-- INJECT_CONTENT -->', appHtml);
  html = html.replace('<!-- INJECT_JSON_LD -->', jsonLdScript);

  // 6. Inject non-blocking data for hydration
  const safeJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  const dataScripts = `
<script id="preloaded-data" type="application/json">${safeJson(data)}</script>
<script id="preloaded-colors" type="application/json">${safeJson(colors)}</script>
`;
  html = html.replace('</body>', `${dataScripts}\n</body>`);

  // 7. Prettier formatting
  console.log('Formatting HTML with Prettier...');
  const formattedHtml = await prettier.format(html, { parser: 'html' });

  fs.writeFileSync(distPath, formattedHtml);
  console.log('SSG: dist/index.html is now static and optimized.');
}

run().catch(err => {
  console.error('Prerender error:', err);
  process.exit(1);
});
