import './code.css';
import { createRef } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Code } from './index.js';

test('renders semantic inline code', async () => {
  const ref = createRef<HTMLElement>();
  await render(<Code ref={ref}>pnpm verify</Code>);
  expect(ref.current?.tagName).toBe('CODE');
  expect(ref.current?.classList.contains('tr-code')).toBe(true);
});
