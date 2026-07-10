import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

describe('Card contract source boundaries', () => {
  it('keeps the Card option contract outside the React wrapper', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/card/contract.ts'),
      'utf8',
    );
    const reactSource = readFileSync(
      join(repoRoot, 'src/components/card/react.tsx'),
      'utf8',
    );

    expect(contractSource).toContain(
      "export const cardVariants = ['default', 'muted']",
    );
    expect(contractSource).toContain("export const cardPaddings = ['sm', 'md', 'lg']");
    expect(contractSource).not.toContain("from 'react'");
    expect(contractSource).not.toContain('var(--');
    expect(reactSource).toContain("from './contract.js';");
    expect(reactSource).not.toContain("['default', 'muted']");
    expect(reactSource).not.toContain("['sm', 'md', 'lg']");
  });
});
