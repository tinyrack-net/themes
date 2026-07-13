import './input.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Input } from './index.js';

test('renders the Tinyrack Input wrapper', async () => {
  expect(typeof Input).toBe('function');
  await render(<Input aria-label="Name" defaultValue="Tinyrack" />);
  expect(document.querySelector('.tr-input')).not.toBeNull();
});
