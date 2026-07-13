import './checkbox-group.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { CheckboxGroup } from './index.js';

test('renders the Tinyrack CheckboxGroup wrapper', async () => {
  expect(typeof CheckboxGroup).toBe('function');
  await render(<CheckboxGroup aria-label="Options">Options</CheckboxGroup>);
  expect(document.querySelector('.tr-checkbox-group')).not.toBeNull();
});
