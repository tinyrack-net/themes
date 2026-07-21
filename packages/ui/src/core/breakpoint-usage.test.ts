import { readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = resolve(import.meta.dirname, '../../../..');
const sourceRoots = [
  resolve(repoRoot, 'packages/ui/src'),
  resolve(repoRoot, 'packages/docs/src'),
  resolve(repoRoot, 'packages/homepage/app'),
];
const sourceExtensions = new Set(['.css', '.mdx', '.ts', '.tsx']);

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    if (!sourceExtensions.has(extname(entry.name))) return [];
    if (/\.(?:browser\.)?test\.[cm]?[jt]sx?$/.test(entry.name)) return [];
    return [path];
  });
}

describe('breakpoint token usage', () => {
  it('keeps first-party responsive conditions on named tokens', () => {
    const violations: string[] = [];

    for (const file of sourceRoots.flatMap(sourceFiles)) {
      const source = readFileSync(file, 'utf8');
      const checks = [
        /@media\s*\(\s*(?:width|min-width|max-width)\s*[:<>=]/g,
        /matchMedia\(\s*['"][^'"]*(?:width|min-width|max-width)[^'"]*['"]\s*\)/g,
        /(?:min|max)-\[[^\]]+\]:/g,
        /\[@media[^\]]+\]:/g,
      ];

      for (const pattern of checks) {
        for (const match of source.matchAll(pattern)) {
          violations.push(`${relative(repoRoot, file)}: ${match[0]}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
