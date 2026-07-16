import '../../core/core.css';
import './field.css';
import '../input/input.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Field, FieldRoot } from './index.js';

test('assembles an accessible Base UI field', async () => {
  expect(Field.Root).toBe(FieldRoot);
  await render(
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Field.Control required type="email" />
      <Field.Description>Work address</Field.Description>
      <Field.Error match>Please enter an email.</Field.Error>
    </Field.Root>,
  );
  const input = document.querySelector<HTMLInputElement>('.tr-field-control');
  expect(input?.getAttribute('aria-invalid')).toBe('true');
  expect(document.querySelector('.tr-field-error')?.textContent).toContain('email');
});

test('owns Field.Control styling independently from the standalone Input class', async () => {
  await render(
    <Field.Root>
      <Field.Label>Rack name</Field.Label>
      <Field.Control defaultValue="Rack Alpha" />
    </Field.Root>,
  );
  const control = document.querySelector<HTMLInputElement>('.tr-field-control');
  expect(control).not.toBeNull();
  expect(control?.classList.contains('tr-input')).toBe(false);
  expect(control?.getBoundingClientRect().height).toBe(40);
});

test('applies the public size recipe to Field.Control', async () => {
  await render(
    <>
      <Field.Root uiSize="sm">
        <Field.Control aria-label="Small rack" />
      </Field.Root>
      <Field.Root uiSize="lg">
        <Field.Control aria-label="Large rack" />
      </Field.Root>
    </>,
  );
  const [small, large] = Array.from(
    document.querySelectorAll<HTMLElement>('.tr-field-control'),
  );
  expect(small?.getBoundingClientRect().height).toBe(32);
  expect(large?.getBoundingClientRect().height).toBe(48);
});
