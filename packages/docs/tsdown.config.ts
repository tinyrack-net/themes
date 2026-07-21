import { defineConfig } from 'tsdown';

const entry = {
  'config/index': 'src/config/index.ts',
  'react-router/index': 'src/react-router/index.ts',
  'runtime/index': 'src/runtime/index.ts',
  'vite/index': 'src/vite/index.ts',
  'highlighting/docs-highlighter': 'src/highlighting/docs-highlighter.ts',
} as const;

const copy = [{ from: 'src/styles/styles.css', to: 'dist' }] as const;

export default defineConfig({
  entry,
  format: 'esm',
  dts: { sourcemap: true },
  clean: true,
  fixedExtension: false,
  platform: 'neutral',
  unbundle: true,
  treeshake: true,
  sourcemap: true,
  tsconfig: './tsconfig.build.json',
  copy: [...copy],
  onSuccess: 'tsc -p tsconfig.test.json --noEmit',
});
