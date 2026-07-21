import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import packageJson from '../../package.json' with { type: 'json' };

describe('@tinyrack/ui test commands', () => {
  it('runs browser coverage directly without a wrapper or fixed API port', () => {
    expect(packageJson.scripts['test:e2e']).toBe(
      'pnpm build && vitest run --mode component-coverage --project browser --coverage && vitest run --mode component-firefox --project browser',
    );

    const vitestConfig = readFileSync(
      resolve(import.meta.dirname, '../../vitest.config.ts'),
      'utf8',
    );
    expect(vitestConfig).toContain("server.listen(0, '127.0.0.1'");
    expect(vitestConfig).toContain('port: await availablePort()');
    expect(vitestConfig).not.toContain('port: 30_000');
  });
});
