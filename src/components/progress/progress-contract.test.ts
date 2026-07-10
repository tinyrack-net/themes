import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

describe('Progress contract source boundaries', () => {
  it('keeps the Progress option contract outside the React wrapper', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/progress/contract.ts'),
      'utf8',
    );
    const reactSource = readFileSync(
      join(repoRoot, 'src/components/progress/react.tsx'),
      'utf8',
    );

    expect(contractSource).toContain("export const progressSizes = ['sm', 'md', 'lg']");
    expect(contractSource).toContain(
      "export const progressVariants = ['neutral', 'primary', 'danger']",
    );
    expect(contractSource).not.toContain("from 'react'");
    expect(contractSource).not.toContain('var(--');
    expect(reactSource).toContain("from './contract.js';");
    expect(reactSource).not.toContain("['sm', 'md', 'lg']");
    expect(reactSource).not.toContain("['neutral', 'primary', 'danger']");
  });
});
