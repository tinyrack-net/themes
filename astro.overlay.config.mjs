import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './artifacts/astro-overlay',
  srcDir: './e2e/fixtures/astro-overlay/src',
  vite: {
    plugins: [tailwindcss()],
  },
});
