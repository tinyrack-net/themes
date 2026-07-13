import '../../core/core.css';
import './spinner.css';
import { createRef } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Spinner } from './index.js';

test('renders an announced loading indicator', async () => {
  const ref = createRef<HTMLSpanElement>();
  await render(<Spinner ref={ref} label="Saving" size="lg" variant="primary" />);
  expect(ref.current?.getAttribute('role')).toBe('status');
  expect(ref.current?.getAttribute('aria-label')).toBe('Saving');
  expect(ref.current?.dataset['size']).toBe('lg');
});

test('styles the public muted variant independently from current color', async () => {
  document.documentElement.dataset['theme'] = 'tinyrack-light';
  await render(
    <div style={{ color: 'rgb(255, 0, 255)' }}>
      <Spinner data-testid="current" variant="current" />
      <Spinner data-testid="muted" variant="muted" />
    </div>,
  );
  const current = document.querySelector<HTMLElement>('[data-testid="current"]');
  const muted = document.querySelector<HTMLElement>('[data-testid="muted"]');
  expect(getComputedStyle(muted as HTMLElement).borderTopColor).not.toBe(
    getComputedStyle(current as HTMLElement).borderTopColor,
  );
});
