import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Disclosure, DisclosureContent, DisclosureSummary } from './react.js';

describe('Disclosure', () => {
  it('keeps native details and summary semantics in SSR output', () => {
    const html = renderToString(
      createElement(
        Disclosure,
        { open: true },
        createElement(DisclosureSummary, null, 'Advanced'),
        createElement(DisclosureContent, null, 'Settings'),
      ),
    );

    expect(html).toContain('<details');
    expect(html).toContain(' open=""');
    expect(html).toContain('<summary class="tr-disclosure-summary"');
    expect(html).toContain('class="tr-disclosure-content"');
  });
});
