import { availableParallelism } from 'node:os';
import { describe, expect, it } from 'vitest';
import { workerBudget } from '../../test-worker-budget.js';
import createConfig from '../vitest.config.ts';

describe('Vitest performance configuration', () => {
  it('uses a portable browser port and a bounded CPU-aware worker pool', async () => {
    const config = await createConfig({
      command: 'serve',
      isPreview: false,
      mode: 'test',
    });
    const projects = await Promise.all(config.test?.projects ?? []);
    const browserProject = projects.find(
      (project) => typeof project === 'object' && project.test?.name === 'browser',
    );
    const unitProject = projects.find(
      (project) => typeof project === 'object' && project.test?.name === 'unit',
    );

    expect(browserProject).toBeDefined();
    if (typeof browserProject !== 'object' || browserProject.test?.name !== 'browser') {
      throw new Error('Missing browser test project');
    }

    expect(browserProject.test.browser?.api).toMatchObject({
      host: '127.0.0.1',
      port: 30_000,
    });
    expect(browserProject.test.maxWorkers).toBe(
      workerBudget({
        maxWorkers: 8,
        override:
          process.env['TINYRACK_TEST_WORKERS'] ?? process.env['TINYRACK_WORKERS'],
        parallelism: availableParallelism(),
      }),
    );
    expect(unitProject).toBeDefined();
    if (typeof unitProject !== 'object' || unitProject.test?.name !== 'unit') {
      throw new Error('Missing unit test project');
    }
    expect(unitProject.test.maxWorkers).toBe(browserProject.test.maxWorkers);
  });
});

describe('portable worker budgeting', () => {
  it.each([
    { parallelism: 1, expected: 1 },
    { parallelism: 2, expected: 1 },
    { parallelism: 4, expected: 3 },
    { parallelism: 8, expected: 7 },
    { parallelism: 32, expected: 8 },
  ])('uses $expected workers on $parallelism available CPUs', ({
    parallelism,
    expected,
  }) => {
    expect(workerBudget({ maxWorkers: 8, parallelism })).toBe(expected);
  });

  it('supports a validated machine-specific override without exceeding available CPUs', () => {
    expect(workerBudget({ maxWorkers: 4, override: '6', parallelism: 8 })).toBe(6);
    expect(workerBudget({ maxWorkers: 4, override: '99', parallelism: 8 })).toBe(8);
    expect(workerBudget({ maxWorkers: 4, override: 'invalid', parallelism: 8 })).toBe(
      4,
    );
    expect(workerBudget({ maxWorkers: 4, override: '0', parallelism: 8 })).toBe(4);
  });
});
