import './checkbox.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Checkbox, CheckboxRoot } from './index.js';

test('renders the Tinyrack Checkbox wrapper', async () => {
  expect(Checkbox.Root).toBe(CheckboxRoot);
  await render(
    <Checkbox.Root aria-label="Accept" defaultChecked>
      <Checkbox.Indicator />
    </Checkbox.Root>,
  );
  expect(document.querySelector('.tr-checkbox')).not.toBeNull();
});
