import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicStylePaths = [
  ...readdirSync(join(process.cwd(), 'src/components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `src/components/${entry.name}/${entry.name}.css`)
    .filter((stylePath) => existsSync(join(process.cwd(), stylePath)))
    .sort(),
  'src/mdx/mdx.css',
] as const;

const forbiddenDeclarations = {
  'shared motion duration': /\b(?:120|160|180)ms\b/,
  'shared numeric radius': /border-radius:\s*(?:0?\.\d|[1-9]\d*(?:px|rem|em))/,
  'shared focus ring': /outline:\s*2px/,
  'shared state opacity': /opacity:\s*0\.(?:5|82)\s*;/,
  'literal box shadow': /box-shadow:\s*(?:#|rgb\(|\d)/,
  'literal font weight': /font-weight:\s*\d/,
  'literal semantic color':
    /^\s*(?:background(?:-color)?|border-color|color):\s*(?:#[0-9a-f]|rgb\()/im,
  'literal default border': /border(?:-(?:top|right|bottom|left))?:\s*1px/,
} as const;

describe('public CSS token usage', () => {
  it('routes shared visual decisions through global or component tokens', () => {
    for (const stylePath of publicStylePaths) {
      const css = readFileSync(join(process.cwd(), stylePath), 'utf8');

      expect(css, `${stylePath} must consume Tinyrack tokens`).toContain(
        'var(--tinyrack-',
      );

      for (const [label, pattern] of Object.entries(forbiddenDeclarations)) {
        expect(css, `${stylePath} contains ${label}`).not.toMatch(pattern);
      }
    }
  });

  it('keeps generated theme declarations out of component-owned CSS', () => {
    for (const stylePath of publicStylePaths) {
      const css = readFileSync(join(process.cwd(), stylePath), 'utf8');

      expect(css).not.toContain('@theme static');
      expect(css).not.toContain('[data-theme="tinyrack-light"]');
      expect(css).not.toContain('[data-theme="tinyrack-dark"]');
    }
  });
});
