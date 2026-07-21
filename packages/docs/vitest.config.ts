import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const alias = {
  'virtual:tinyrack-docs/manifest': fileURLToPath(
    new URL('./tests/virtual-manifest.ts', import.meta.url),
  ),
};

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
          exclude: ['tests/dist-package.test.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'e2e',
          environment: 'node',
          hookTimeout: 180_000,
          include: ['tests/dist-package.test.ts'],
          testTimeout: 180_000,
        },
      },
    ],
  },
});
