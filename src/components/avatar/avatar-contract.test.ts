import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

describe('Avatar contract source boundaries', () => {
  it('keeps the Avatar option contract outside the React wrapper', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/avatar/contract.ts'),
      'utf8',
    );
    const reactSource = readFileSync(
      join(repoRoot, 'src/components/avatar/react.tsx'),
      'utf8',
    );

    expect(contractSource).toContain("export const avatarSizes = ['sm', 'md', 'lg']");
    expect(contractSource).toContain(
      "export const avatarShapes = ['circle', 'square']",
    );
    expect(contractSource).not.toContain("from 'react'");
    expect(contractSource).not.toContain('var(--');
    expect(reactSource).toContain("from './contract.js';");
    expect(reactSource).not.toContain("['sm', 'md', 'lg']");
    expect(reactSource).not.toContain("['circle', 'square']");
  });
});
