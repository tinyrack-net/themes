import { defineConfig } from 'vitest/config';
import { workerBudget } from '../test-worker-budget.js';

const browserWorkers = workerBudget({
  maxWorkers: 3,
  override: process.env['TINYRACK_TEST_WORKERS'] ?? process.env['TINYRACK_WORKERS'],
});

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: [
            'tests/app-icons.test.ts',
            'tests/closure-00-29.test.ts',
            'tests/dev-worktree-port.test.ts',
            'tests/logo.test.ts',
            'tests/tailwind-token-catalog.test.ts',
          ],
          maxWorkers: browserWorkers,
          testTimeout: 180_000,
        },
      },
      {
        test: {
          name: 'e2e',
          environment: 'node',
          hookTimeout: 30_000,
          include: ['tests/**/*.test.ts'],
          exclude: [
            'tests/app-icons.test.ts',
            'tests/browser-overlays.test.ts',
            'tests/closure-00-29.test.ts',
            'tests/dev-worktree-port.test.ts',
            'tests/logo.test.ts',
            'tests/tailwind-token-catalog.test.ts',
          ],
          maxWorkers: browserWorkers,
          testTimeout: 180_000,
        },
      },
      {
        test: {
          name: 'e2e-overlays',
          environment: 'node',
          hookTimeout: 30_000,
          include: ['tests/browser-overlays.test.ts'],
          maxWorkers: 1,
          retry: 1,
          testTimeout: 180_000,
        },
      },
    ],
  },
});
