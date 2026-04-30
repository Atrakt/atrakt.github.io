# Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.2.0] - 2026-04-30

### Added

- **Initial Public Release**: This version marks the first official commit on GitHub, consolidating all previous development milestones into a stable, high-performance SSG-based architecture.
- **SSG Architecture**: Full build-time HTML prerendering using `preact-render-to-string`. Resolves PageSpeed `NO_FCP` issues by serving fully populated HTML before JS executes.
- **Security**: Implemented robust JSON escaping in `prerender.js` and secure hydration protocols to neutralizing potential XSS risks.
- **Architecture**: Created centralized data utility (`src/utils/data.ts`) to secure and standardize preloaded data parsing (DRY).
- **Automation**: Enhanced GitHub Actions workflow with automatic release generation and weekly scheduled stats refresh.

### Changed

- **Design System**: Fully migrated to **Tailwind CSS v4** using semantic theme tokens and fluid typography.
- **Performance**: Removed all entrance animations to prioritize instant content delivery and minimize Cumulative Layout Shift (CLS).
- **Hydration**: Switched to `hydrate()` in `src/index.tsx` for seamless transition from static HTML to interactive Preact components.
- **Typing**: Standardized Preact type imports to resolve `CSSProperties` deprecation warnings.

## [1.1.0] - 2026-04-28

### Added

- **Whitelabel System**: Migrated to a 100% environment-driven architecture. All personal metadata is now handled via `.env` for maximum privacy and portability.
- **Documentation**: Added comprehensive JSDoc headers across core hooks, types, and constants.

### Fixed & Refined

- **Accessibility**: Conducted full WCAG AA audit. Added ARIA roles (`alert`, `status`, `expanded`) and descriptive labels for all interactive elements.
- **Contrast**: Optimized text opacity and color tokens to ensure a minimum contrast ratio of 4.5:1.
- **Responsiveness**: Replaced static layout checks with reactive `useMediaQuery` hook for smoother breakpoint transitions.
- **Layout**: Stabilized visual rhythm across Header, RepoCards, and Footer; tightened heading tracking for improved readability.

## [1.0.0] - 2026-04-22

### Added

- **Production Foundation**: Replaced client-side REST API with efficient build-time GraphQL fetching.
- **Performance**: Integrated React memoization and Intersection Observer for infinite scrolling of repository lists.
- **Infrastructure**: Centralized configuration system in `src/constants/constants.ts` (Layout, Timing, Metadata).
- **Deployment**: Initial automated deployment pipeline to GitHub Pages via GitHub Actions.

## [0.1.0] - 2026-04-21

### Added

- **Initial Prototype**: Core portfolio concept with Vite, TypeScript, and early design prototyping.

[Unreleased]: https://github.com/Atrakt/atrakt.github.io/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/Atrakt/atrakt.github.io/compare/v1.1.0...v1.2.0
