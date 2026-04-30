# atrakt.github.io

> Minimalist GitHub portfolio — **Static Site Generation (SSG)** architecture powered by Preact, GraphQL, and GitHub Actions.

![Version](https://img.shields.io/github/package-json/v/Atrakt/atrakt.github.io?color=blue)
![Status](https://img.shields.io/github/actions/workflow/status/Atrakt/atrakt.github.io/deploy.yml)
![Size](https://img.shields.io/github/repo-size/Atrakt/atrakt.github.io)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployed to GitHub Pages](https://img.shields.io/badge/Deployed_to-GitHub_Pages-2ea44f?logo=github)
![Data Source](https://img.shields.io/badge/Data-GraphQL%20API-E10098?logo=graphql&logoColor=white)
![Preact](https://img.shields.io/badge/Preact-10-673AB8?logo=preact&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)

## Table of Contents

- [What is it](#what-is-it)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [CI/CD & Automation](#cicd--automation)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## What is it

`atrakt.github.io` is a **Static Site Generation (SSG)** portfolio that displays public repositories with live metadata. Data is fetched at build-time via the **GitHub GraphQL API** and injected directly into the HTML. This architecture ensures an instant **First Contentful Paint (FCP)**, optimal SEO, and complete avoidance of client-side API rate limits.

## Getting Started

**Prerequisites:** Node.js 24+

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Project Structure

```
atrakt.github.io/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: SSG Build & Automatic Release
├── scripts/
│   ├── fetch-github-data.js    # GraphQL script for build-time data fetching
│   ├── fetch-github-colors.js  # GitHub language colors scraper
│   └── prerender.js            # SSG Engine: Generates static HTML and injects SEO/Data
├── src/
│   ├── components/             # Modular UI components (Preact)
│   ├── constants/
│   │   └── constants.ts        # Centralized design tokens
│   ├── hooks/                  # Data fetching and media queries
│   ├── types/                  # TypeScript interfaces
│   ├── utils/
│   │   └── data.ts             # Hydration utilities (JSON-LD parsing)
│   ├── App.tsx                 # Root layout and responsiveness
│   ├── index.css               # Tailwind 4 theme and global styles
│   ├── index.tsx               # Client-side hydration entry point
│   └── prerender.tsx           # SSG/SSR entry point
├── public/                     # Static assets & generated data
├── CHANGELOG.md                # Version history and updates
├── index.html                  # HTML template
├── tsconfig.json               # TypeScript configuration (Preact)
├── vite.config.ts              # Vite & plugin configuration
└── package.json                # Dependencies and scripts
```

## Configuration

This project is designed as a **Whitelabel engine**. All personal metadata and secrets are decoupled from the source code to ensure privacy and portability.

### 1. Local Setup

1.  **Environment File**: Copy `.env.example` to `.env`.
2.  **Personalize**: Fill in your credentials and site details (GitHub PAT, Username, Site Name, etc.).
3.  **Security**: Your `.env` file is automatically ignored by `.gitignore` to prevent accidental leaks of your Personal Access Token.

### 2. GitHub Deployment (Production)

To enable automated builds and SEO injection on GitHub Pages:

1.  Go to your Repository **Settings** > **Secrets and variables** > **Actions**.
2.  Create a single Secret named **`ENV_FILE`**.
3.  Paste the **entire content** of your local `.env` file into it (including your `GH_PAT` and all `VITE_APP_*` variables).

The GitHub Action workflow will automatically recreate the environment and use the `prerender.js` script to inject your metadata, JSON-LD, and hydration data directly into the final HTML before deploying to GitHub Pages.

## Deployment

The site uses **Selective Hydration** (Islands architecture). The HTML is served statically for speed, and Preact only "hydrates" interactive zones (mobile menu, pagination, back-to-top button) using the pre-loaded JSON data.

Deployment is fully automated via GitHub Actions:

- **On Push**: Every update pushed to the `main` branch triggers a build and deploy.
- **On Schedule**: The portfolio is automatically rebuilt every **Monday at 00:00** (UTC) to keep your metadata and repository list fresh.

```bash
# Manual build preview
npm run build
npm run preview
```

## CI/CD & Automation

### GitHub Actions Workflow

The project is powered by a robust `.github/workflows/deploy.yml` that handles the entire lifecycle:

1.  **Environment Setup**: Runs on **Node.js 24** with built-in npm caching.
2.  **Secrets Management**: Requires a GitHub Secret named **`ENV_FILE`** containing the content of your `.env` for secure build-time Metadata and SEO injection.
3.  **Scheduled Updates**: The site automatically rebuilds every **Monday at 00:00** to ensure GitHub stats (stars, languages) stay fresh even without code changes.
4.  **Automatic Releases**: When you push a version bump in `package.json` to `main`, the workflow automatically:
    - Creates a new **GitHub Tag** and **Release**.
    - Extracts release notes directly from your `CHANGELOG.md` using the standard `## [X.Y.Z]` format.

## Acknowledgments

- [GitHub Colors](https://github.com/ozh/github-colors) — Providing the standardized color palette for programming languages.
- [Geist Sans](https://vercel.com/font) — Modern and sleek typeface by Vercel for the user interface.
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — High-quality monospace font for technical metadata.

## License

MIT — see [LICENSE](LICENSE) file.
