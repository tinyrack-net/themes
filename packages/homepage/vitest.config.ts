import { defineConfig } from 'vitest/config';
import { workerBudget } from '../test-worker-budget.js';

const browserWorkers = workerBudget({
  maxWorkers: 4,
  override: process.env['TINYRACK_TEST_WORKERS'] ?? process.env['TINYRACK_WORKERS'],
});

export default defineConfig({
  resolve: {
    conditions: ['@tinyrack/source'],
  },
  test: {
    environment: 'node',
    hookTimeout: 30_000,
    include: ['tests/**/*.test.ts'],
    maxWorkers: browserWorkers,
    testTimeout: 180_000,
  },
});
