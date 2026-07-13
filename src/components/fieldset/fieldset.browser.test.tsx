import './fieldset.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Fieldset, FieldsetRoot } from './index.js';

test('renders the Tinyrack Fieldset wrapper', async () => {
  expect(Fieldset.Root).toBe(FieldsetRoot);
  await render(
    <Fieldset.Root>
      <Fieldset.Legend>Settings</Fieldset.Legend>
    </Fieldset.Root>,
  );
  expect(document.querySelector('.tr-fieldset')).not.toBeNull();
});
