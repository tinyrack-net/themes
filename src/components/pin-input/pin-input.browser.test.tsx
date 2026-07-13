import './pin-input.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { PinInput, PinInputRoot } from './index.js';

test('uses Base UI OTP field semantics', async () => {
  expect(PinInput.Root).toBe(PinInputRoot);
  await render(
    <PinInput.Root aria-label="Verification code" length={4} name="code">
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.Input />
    </PinInput.Root>,
  );
  const inputs = document.querySelectorAll<HTMLInputElement>('.tr-pin-input-digit');
  expect(inputs).toHaveLength(4);
  expect(document.querySelector<HTMLInputElement>('input[name="code"]')).not.toBeNull();
});
