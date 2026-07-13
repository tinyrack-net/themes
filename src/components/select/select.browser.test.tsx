import './select.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Select, SelectRoot } from './index.js';

test('renders the Tinyrack Select wrapper', async () => {
  expect(Select.Root).toBe(SelectRoot);
  await render(
    <Select.Root defaultValue="alpha">
      <Select.Trigger aria-label="Choice">
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="alpha">
                <Select.ItemText>Alpha</Select.ItemText>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>,
  );
  expect(document.querySelector('.tr-select-trigger')).not.toBeNull();
});
