import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from './react.js';

describe('Menu SSR', () => {
  it('renders button and link item semantics without browser globals', () => {
    const html = renderToString(
      createElement(
        Menu,
        { id: 'rack-actions' },
        createElement(MenuTrigger, null, 'Actions'),
        createElement(
          MenuContent,
          null,
          createElement(MenuItem, { value: 'refresh' }, 'Refresh'),
          createElement(MenuSeparator),
          createElement(
            MenuItem,
            { asChild: true, value: 'docs' },
            createElement('a', { href: '/docs' }, 'Docs'),
          ),
        ),
      ),
    );
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('role="menu"');
    expect(html).toContain('role="menuitem"');
    expect(html).toContain('href="/docs"');
    expect(html).toContain('<hr class="tr-menu-separator"');
  });
});
