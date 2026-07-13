import './otp-field.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { OTPField, OTPFieldRoot } from './index.js';

test('uses Base UI OTP field semantics', async () => {
  expect(OTPField.Root).toBe(OTPFieldRoot);
  await render(
    <OTPField.Root aria-label="Verification code" length={4} name="code">
      <OTPField.Input />
      <OTPField.Input />
      <OTPField.Input />
      <OTPField.Input />
    </OTPField.Root>,
  );
  const inputs = document.querySelectorAll<HTMLInputElement>('.tr-otp-field-digit');
  expect(inputs).toHaveLength(4);
  expect(document.querySelector<HTMLInputElement>('input[name="code"]')).not.toBeNull();
});
