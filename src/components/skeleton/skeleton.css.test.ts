import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { skeletonShapes } from './contract.js';

const repoRoot = process.cwd();

function readSkeletonCss() {
  return readFileSync(join(repoRoot, 'src/components/skeleton/skeleton.css'), 'utf8');
}

describe('skeleton.css source contract', () => {
  it('is standalone and honors reduced motion', () => {
    const css = readSkeletonCss();

    expect(css).toContain('.tr-skeleton');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('tr-skeleton-shimmer');
    expect(css).not.toContain('Generated from');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
    expect(css).not.toContain('[data-theme="tinyrack-dark"]');
  });

  it('covers every Skeleton shape', () => {
    const css = readSkeletonCss();

    for (const shape of skeletonShapes) {
      expect(css).toContain(`.tr-skeleton[data-shape="${shape}"]`);
    }
  });
});
