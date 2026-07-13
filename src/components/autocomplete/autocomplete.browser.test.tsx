import './autocomplete.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Autocomplete, AutocompleteRoot } from './index.js';

test('renders the Tinyrack Autocomplete wrapper', async () => {
  expect(Autocomplete.Root).toBe(AutocompleteRoot);
  await render(
    <Autocomplete.Root items={['Alpha', 'Beta']}>
      <Autocomplete.Input aria-label="Search" />
    </Autocomplete.Root>,
  );
  expect(document.querySelector('.tr-autocomplete-input')).not.toBeNull();
});
