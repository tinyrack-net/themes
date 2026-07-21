import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { breakpointCustomMediaPlugin } from '../../scripts/breakpoint-css.js';

export default defineConfig({
  plugins: [breakpointCustomMediaPlugin(), react()],
});
