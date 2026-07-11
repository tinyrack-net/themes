import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Spinner } from './react.js';

describe('Spinner', () => {
  it('renders decorative and labeled status contracts', () => {
    const decorative = renderToString(createElement(Spinner));
    const labeled = renderToString(
      createElement(Spinner, {
        label: 'Loading translations',
        size: 'lg',
        variant: 'primary',
      }),
    );

    expect(decorative).toContain('aria-hidden="true"');
    expect(decorative).not.toContain('role="status"');
    expect(labeled).toContain('role="status"');
    expect(labeled).toContain('aria-label="Loading translations"');
    expect(labeled).toContain('data-size="lg"');
    expect(labeled).toContain('data-variant="primary"');
  });
});
