import '../../core/core.css';
import './link.css';
import { createRef } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Link } from './index.js';

test('renders a semantic anchor with Tinyrack variants', async () => {
  const ref = createRef<HTMLAnchorElement>();
  await render(
    <Link ref={ref} href="/docs" underline="always" variant="primary">
      Docs
    </Link>,
  );
  expect(ref.current?.pathname).toBe('/docs');
  expect(ref.current?.dataset['underline']).toBe('always');
});

test('maps the default and muted public variants to their semantic colors', async () => {
  document.documentElement.dataset['theme'] = 'tinyrack-light';
  await render(
    <div>
      <Link data-testid="default" href="/default" variant="default">
        Default
      </Link>
      <Link data-testid="muted" href="/muted" variant="muted">
        Muted
      </Link>
    </div>,
  );
  const defaultLink = document.querySelector<HTMLElement>('[data-testid="default"]');
  const mutedLink = document.querySelector<HTMLElement>('[data-testid="muted"]');
  expect(getComputedStyle(defaultLink as HTMLElement).color).not.toBe(
    getComputedStyle(mutedLink as HTMLElement).color,
  );
});
