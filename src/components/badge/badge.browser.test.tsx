import '../../core/core.css';
import './badge.css';
import { createRef } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Badge } from './index.js';

test('renders the React badge contract and forwards its ref', async () => {
  const ref = createRef<HTMLSpanElement>();
  await render(
    <Badge ref={ref} size="lg" variant="success">
      Ready
    </Badge>,
  );

  expect(ref.current?.classList.contains('tr-badge')).toBe(true);
  expect(ref.current?.dataset['size']).toBe('lg');
  expect(ref.current?.dataset['variant']).toBe('success');
  expect(
    getComputedStyle(ref.current as HTMLElement)
      .getPropertyValue('--_tr-badge-font-size')
      .trim(),
  ).toBe('1rem');
});
