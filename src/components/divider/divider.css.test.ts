import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { dividerOrientations } from './contract.js';

const repoRoot = process.cwd();

function readDividerCss() {
  return readFileSync(join(repoRoot, 'src/components/divider/divider.css'), 'utf8');
}

describe('divider.css source contract', () => {
  it('is a standalone source-owned stylesheet', () => {
    const css = readDividerCss();

    expect(css).toContain('.tr-divider');
    expect(css).toContain('var(--tr-divider-color, var(--tinyrack-border))');
    expect(css).toContain('var(--tinyrack-border-width-default)');
    expect(css).not.toContain('Generated from');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
    expect(css).not.toContain('[data-theme="tinyrack-dark"]');
  });

  it('covers every Divider orientation', () => {
    const css = readDividerCss();

    for (const orientation of dividerOrientations) {
      expect(css).toContain(`.tr-divider[data-orientation="${orientation}"]`);
    }
  });
});
