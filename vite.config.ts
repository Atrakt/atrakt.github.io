import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * Preload critical fonts for better Performance (Lighthouse)
 */
function preloadCriticalFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const fontsToPreload = ['geist-latin', 'jetbrains-mono'];
        const fontTags = Object.values(ctx.bundle)
          .filter(a => a.type === 'asset' && fontsToPreload.some(n => a.fileName.includes(n)) && a.fileName.endsWith('.woff2'))
          .map(f => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${f.fileName}">`)
          .join('\n');
        return html.replace('</head>', `${fontTags}\n</head>`);
      }
    }
  };
}

export default defineConfig(() => ({
  base: './',
  plugins: [
    preact(),
    tailwindcss(),
    preloadCriticalFonts()
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/client': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}));
