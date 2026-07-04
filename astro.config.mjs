import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://apex-forge-portfolio.pages.dev/',
  integrations: [
    sitemap(),
    tailwind(),
    // ...your existing integrations (tailwind, etc.) stay here too
  ],
});