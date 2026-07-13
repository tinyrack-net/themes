import './context-menu.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ContextMenu, ContextMenuRoot } from './index.js';

test('renders the Tinyrack ContextMenu wrapper', async () => {
  expect(ContextMenu.Root).toBe(ContextMenuRoot);
  await render(
    <ContextMenu.Root>
      <ContextMenu.Trigger>Target</ContextMenu.Trigger>
    </ContextMenu.Root>,
  );
  expect(document.querySelector('.tr-context-menu-trigger')).not.toBeNull();
});
