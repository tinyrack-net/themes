import './navigation-menu.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { NavigationMenu, NavigationMenuRoot } from './index.js';

test('renders the Tinyrack NavigationMenu wrapper', async () => {
  expect(NavigationMenu.Root).toBe(NavigationMenuRoot);
  await render(
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>,
  );
  expect(document.querySelector('.tr-navigation-menu')).not.toBeNull();
});
