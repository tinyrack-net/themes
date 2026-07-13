import './form.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Form, FormField } from './index.js';

test('assembles an accessible Base UI field', async () => {
  expect(Form.Field).toBe(FormField);
  await render(
    <Form.Field invalid>
      <Form.Label>Email</Form.Label>
      <Form.Control required type="email" />
      <Form.Description>Work address</Form.Description>
      <Form.Error match>Please enter an email.</Form.Error>
    </Form.Field>,
  );
  const input = document.querySelector<HTMLInputElement>('.tr-input');
  expect(input?.getAttribute('aria-invalid')).toBe('true');
  expect(document.querySelector('.tr-form-message')?.textContent).toContain('email');
});
