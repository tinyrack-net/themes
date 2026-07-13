import './skeleton.css';
import { createRef } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Skeleton } from './index.js';

test('renders decorative and announced skeleton states', async () => {
  const ref = createRef<HTMLDivElement>();
  await render(<Skeleton ref={ref} aria-label="Loading profile" shape="circle" />);
  expect(ref.current?.dataset['shape']).toBe('circle');
  expect(ref.current?.getAttribute('aria-busy')).toBe('true');
});

test('omits live-region state without an accessible label', async () => {
  const ref = createRef<HTMLDivElement>();
  await render(<Skeleton ref={ref} />);
  expect(ref.current?.hasAttribute('aria-label')).toBe(false);
  expect(ref.current?.hasAttribute('aria-live')).toBe(false);
  expect(ref.current?.hasAttribute('aria-busy')).toBe(false);
});
