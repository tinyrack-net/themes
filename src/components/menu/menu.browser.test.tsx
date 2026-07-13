import './menu.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Menu, MenuRoot } from './index.js';

test('assembles an accessible Base UI menu', async () => {
  expect(Menu.Root).toBe(MenuRoot);
  await render(
    <Menu.Root defaultOpen>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>Restart</Menu.Item>
            <Menu.Separator />
            <Menu.SubmenuRoot>
              <span>Nested menu context</span>
            </Menu.SubmenuRoot>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>,
  );
  expect(document.querySelector('.tr-menu-content')?.getAttribute('role')).toBe('menu');
  expect(document.querySelector('.tr-menu-item')?.getAttribute('role')).toBe(
    'menuitem',
  );
});
