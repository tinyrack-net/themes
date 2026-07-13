import './radio-group.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { RadioGroup } from './index.js';

test('renders the Tinyrack RadioGroup wrapper', async () => {
  expect(typeof RadioGroup).toBe('function');
  await render(
    <RadioGroup aria-label="Options" defaultValue="one">
      Options
    </RadioGroup>,
  );
  expect(document.querySelector('.tr-radio-group')).not.toBeNull();
});
