import './combobox.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Combobox, ComboboxRoot } from './index.js';

test('assembles the Base UI combobox contract', async () => {
  expect(Combobox.Root).toBe(ComboboxRoot);
  await render(
    <Combobox.Root defaultOpen items={['Alpha', 'Beta']}>
      <Combobox.Input aria-label="Service" />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              <Combobox.Item value="Alpha">Alpha</Combobox.Item>
              <Combobox.Item value="Beta">Beta</Combobox.Item>
              <Combobox.Empty>No matches</Combobox.Empty>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>,
  );
  const input = document.querySelector<HTMLInputElement>('.tr-combobox');
  expect(input?.getAttribute('role')).toBe('combobox');
  expect(document.querySelector('.tr-combobox-content')).not.toBeNull();
});
