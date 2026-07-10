import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { cardPaddings, cardVariants } from './contract.js';

const repoRoot = process.cwd();

function readCardCss() {
  return readFileSync(join(repoRoot, 'src/components/card/card.css'), 'utf8');
}

describe('card.css source contract', () => {
  it('is a standalone source-owned stylesheet', () => {
    const css = readCardCss();

    expect(css).toContain('.tr-card');
    expect(css).toContain('var(--tr-card-padding, var(--_tr-card-padding))');
    expect(css).toContain('var(--tinyrack-radius-lg)');
    expect(css).not.toContain('Generated from');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
    expect(css).not.toContain('[data-theme="tinyrack-dark"]');
  });

  it('covers every Card padding and variant', () => {
    const css = readCardCss();

    for (const padding of cardPaddings) {
      expect(css).toContain(`.tr-card[data-padding="${padding}"]`);
    }

    for (const variant of cardVariants) {
      expect(css).toContain(`.tr-card[data-variant="${variant}"]`);
    }
  });
});
