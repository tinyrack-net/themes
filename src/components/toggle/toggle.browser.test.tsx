import './toggle.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Toggle } from './index.js';

test('renders the Tinyrack Toggle wrapper', async () => {
  expect(typeof Toggle).toBe('function');
  await render(
    <Toggle aria-label="Bold" defaultPressed>
      Bold
    </Toggle>,
  );
  expect(document.querySelector('.tr-toggle')).not.toBeNull();
});
