import './popover.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Popover, PopoverRoot } from './index.js';

test('uses Base UI positioning and dismissal behavior', async () => {
  expect(Popover.Root).toBe(PopoverRoot);
  await render(
    <Popover.Root defaultOpen>
      <Popover.Trigger>Details</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Title>Server</Popover.Title>
            <Popover.Description>Online</Popover.Description>
            <Popover.Close>Close</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>,
  );
  const popup = document.querySelector<HTMLElement>('.tr-layer');
  expect(popup?.getAttribute('role')).toBe('dialog');
  document.querySelector<HTMLButtonElement>('.tr-popover-close')?.click();
  await expect.poll(() => popup?.hasAttribute('data-closed')).toBe(true);
});
