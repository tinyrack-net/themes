import './form.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Form } from './index.js';

test('renders the Tinyrack Form wrapper', async () => {
  expect(typeof Form).toBe('function');
  await render(
    <Form aria-label="Example form">
      <button type="submit">Submit</button>
    </Form>,
  );
  expect(document.querySelector('.tr-form')).not.toBeNull();
});
