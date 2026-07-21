import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { breakpointCustomMediaPlugin } from '../../scripts/breakpoint-css.js';
import config from './docs.config.ts';

const { tinyrackDocs } = await import(
  /* @vite-ignore */
  import.meta.resolve('@tinyrack/docs/vite')
);

export default defineConfig({
  plugins: [
    ...tinyrackDocs(config, { root: import.meta.dirname }),
    breakpointCustomMediaPlugin(),
    tailwindcss({ optimize: false }),
  ],
});
