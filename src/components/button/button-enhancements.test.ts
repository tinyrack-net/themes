import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button, ButtonGroup } from './react.js';

describe('Button loading and grouping', () => {
  it('disables a loading button and includes an accessible busy label', () => {
    const html = renderToString(
      createElement(Button, { loading: true, loadingLabel: 'Saving' }, 'Save'),
    );

    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('aria-label="Saving"');
    expect(html).toContain('class="tr-spinner"');
  });

  it('renders a semantic attached button group', () => {
    const html = renderToString(
      createElement(
        ButtonGroup,
        { attached: true, orientation: 'vertical' },
        'Actions',
      ),
    );
    expect(html).toContain('class="tr-btn-group"');
    expect(html).toContain('role="group"');
    expect(html).toContain('data-attached="true"');
    expect(html).toContain('data-orientation="vertical"');
  });
});
