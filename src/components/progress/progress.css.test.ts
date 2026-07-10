import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { progressSizes, progressVariants } from './contract.js';

const repoRoot = process.cwd();

function readProgressCss() {
  return readFileSync(join(repoRoot, 'src/components/progress/progress.css'), 'utf8');
}

describe('progress.css source contract', () => {
  it('is standalone and supports reduced motion', () => {
    const css = readProgressCss();

    expect(css).toContain('.tr-progress');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('tr-progress-indeterminate');
    expect(css).not.toContain('Generated from');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
    expect(css).not.toContain('[data-theme="tinyrack-dark"]');
  });

  it('covers every Progress size and variant', () => {
    const css = readProgressCss();

    for (const size of progressSizes) {
      expect(css).toContain(`.tr-progress[data-size="${size}"]`);
    }

    for (const variant of progressVariants) {
      expect(css).toContain(`.tr-progress[data-variant="${variant}"]`);
    }
  });
});
