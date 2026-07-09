import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();

describe('Tabs contract source boundaries', () => {
  it('keeps the Tabs option contract outside the React wrapper', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/tabs/contract.ts'),
      'utf8',
    );
    const reactTabsSource = readFileSync(
      join(repoRoot, 'src/components/tabs/react.tsx'),
      'utf8',
    );

    expect(contractSource).toContain("export const tabsSizes = ['sm', 'md', 'lg']");
    expect(contractSource).toContain(
      "export const tabsOrientations = ['horizontal', 'vertical']",
    );
    expect(contractSource).toContain(
      "export const tabsActivationModes = ['automatic', 'manual']",
    );
    expect(contractSource).not.toContain("from 'react'");
    expect(contractSource).not.toContain('var(--');
    expect(contractSource).not.toContain('--tinyrack-');
    expect(contractSource).not.toContain('--tr-tabs-');
    expect(reactTabsSource).toContain("from './contract.js';");
    expect(reactTabsSource).not.toContain("['sm', 'md', 'lg']");
    expect(reactTabsSource).not.toContain("['horizontal', 'vertical']");
    expect(reactTabsSource).not.toContain("['automatic', 'manual']");
    expect(reactTabsSource).not.toContain('TabsVariant');
    expect(reactTabsSource).not.toContain('variant?:');
  });
});
