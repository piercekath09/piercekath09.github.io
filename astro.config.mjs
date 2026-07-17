// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://piercekath09.github.io',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
});
