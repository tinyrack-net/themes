import { describe, expect, it } from 'vitest';
import { transformBreakpointCss } from '../../../../scripts/breakpoint-css.js';

describe('breakpoint CSS transformation', () => {
  it('expands strict and inclusive named media to standard queries', async () => {
    const transformed = await transformBreakpointCss(
      [
        '@media (--tinyrack-breakpoint-md-min) { .wide { display: block; } }',
        '@media (--tinyrack-breakpoint-sm-at-most) { .compact { display: block; } }',
      ].join('\n'),
      'breakpoint-fixture.css',
    );

    expect(transformed).toContain('@media (width >= 48rem)');
    expect(transformed).toContain('@media (width <= 40rem)');
    expect(transformed).not.toContain('--tinyrack-breakpoint-');
  });
});
