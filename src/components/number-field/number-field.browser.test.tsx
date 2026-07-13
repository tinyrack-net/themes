import './number-field.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { NumberField, NumberFieldRoot } from './index.js';

test('renders the Tinyrack NumberField wrapper', async () => {
  expect(NumberField.Root).toBe(NumberFieldRoot);
  await render(
    <NumberField.Root defaultValue={2}>
      <NumberField.Group>
        <NumberField.Decrement>-</NumberField.Decrement>
        <NumberField.Input aria-label="Count" />
        <NumberField.Increment>+</NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>,
  );
  expect(document.querySelector('.tr-number-field')).not.toBeNull();
});
