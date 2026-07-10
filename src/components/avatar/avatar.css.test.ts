import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { avatarShapes, avatarSizes } from './contract.js';

const repoRoot = process.cwd();

function readAvatarCss() {
  return readFileSync(join(repoRoot, 'src/components/avatar/avatar.css'), 'utf8');
}

describe('avatar.css source contract', () => {
  it('is a standalone source-owned stylesheet', () => {
    const css = readAvatarCss();

    expect(css).toContain('.tr-avatar');
    expect(css).toContain('.tr-avatar > img');
    expect(css).toContain('var(--tr-avatar-size, var(--_tr-avatar-size))');
    expect(css).toContain('var(--tinyrack-weight-medium)');
    expect(css).not.toContain('Generated from');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
    expect(css).not.toContain('[data-theme="tinyrack-dark"]');
  });

  it('covers every Avatar size and shape', () => {
    const css = readAvatarCss();

    for (const size of avatarSizes) {
      expect(css).toContain(`.tr-avatar[data-size="${size}"]`);
    }

    for (const shape of avatarShapes) {
      expect(css).toContain(`.tr-avatar[data-shape="${shape}"]`);
    }
  });
});
