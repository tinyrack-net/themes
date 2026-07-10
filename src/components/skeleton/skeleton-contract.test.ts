import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

describe('Skeleton contract source boundaries', () => {
  it('keeps the Skeleton option contract outside the React wrapper', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/skeleton/contract.ts'),
      'utf8',
    );
    const reactSource = readFileSync(
      join(repoRoot, 'src/components/skeleton/react.tsx'),
      'utf8',
    );

    expect(contractSource).toContain(
      "export const skeletonShapes = ['text', 'rectangle', 'circle']",
    );
    expect(contractSource).not.toContain("from 'react'");
    expect(contractSource).not.toContain('var(--');
    expect(reactSource).toContain("from './contract.js';");
    expect(reactSource).not.toContain("['text', 'rectangle', 'circle']");
  });
});
