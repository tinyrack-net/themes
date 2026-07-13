import './drawer.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Drawer, DrawerBackdrop } from './index.js';

test('renders the Tinyrack Drawer wrapper', async () => {
  expect(Drawer.Backdrop).toBe(DrawerBackdrop);
  await render(
    <Drawer.Root>
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
    </Drawer.Root>,
  );
  expect(document.querySelector('.tr-drawer-trigger')).not.toBeNull();
});
