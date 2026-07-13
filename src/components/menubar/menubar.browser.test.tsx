import './menubar.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Menubar } from './index.js';

test('renders the Tinyrack Menubar wrapper', async () => {
  expect(typeof Menubar).toBe('function');
  await render(<Menubar aria-label="Application menu">Menu</Menubar>);
  expect(document.querySelector('.tr-menubar')).not.toBeNull();
});
