import './tooltip.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Tooltip, TooltipRoot } from './index.js';

test('uses Base UI tooltip semantics and positioning', async () => {
  expect(Tooltip.Root).toBe(TooltipRoot);
  await render(
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Info</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              Details
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );
  const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
  expect(popup?.hasAttribute('data-open')).toBe(true);
  expect(document.querySelector('.tr-tooltip')?.textContent).toBe('Info');
  expect(document.querySelector('.tr-tooltip-arrow')).not.toBeNull();
});
