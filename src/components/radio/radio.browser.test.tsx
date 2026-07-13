import './radio.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Radio, RadioRoot } from './index.js';

test('renders the Tinyrack Radio wrapper', async () => {
  expect(Radio.Root).toBe(RadioRoot);
  await render(
    <Radio.Root aria-label="Option" value="option">
      <Radio.Indicator />
    </Radio.Root>,
  );
  expect(document.querySelector('.tr-radio')).not.toBeNull();
});
