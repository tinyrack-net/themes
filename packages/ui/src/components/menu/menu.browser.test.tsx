import '../../core/core.css';
import './menu.css';
import { expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Menu, MenuRoot } from './index.js';

function ActionsMenu({ onRestart }: { onRestart?: () => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onClick={onRestart}>Restart</Menu.Item>
            <Menu.Item>Rename</Menu.Item>
            <Menu.Item disabled>Unavailable</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

test('opens from the trigger and exposes Tinyrack menu semantics', async () => {
  expect(Menu.Root).toBe(MenuRoot);
  const screen = await render(<ActionsMenu />);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  await userEvent.click(trigger);

  await expect
    .element(screen.getByRole('menu', { name: 'Actions' }))
    .toHaveClass('tr-layer', 'tr-menu-content');
  await expect
    .element(screen.getByRole('menuitem', { name: 'Restart' }))
    .toHaveClass('tr-menu-item');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('uses keyboard typeahead, activates an item, and restores trigger focus', async () => {
  document.documentElement.dataset['theme'] = 'tinyrack-light';
  const onRestart = vi.fn();
  const screen = await render(<ActionsMenu onRestart={onRestart} />);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  await userEvent.type(trigger, '{Enter}');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');

  const restart = screen.getByRole('menuitem', { name: 'Restart' });
  await expect.element(restart).toHaveFocus();
  await userEvent.type(restart, '{Home}');
  await expect.element(restart).toHaveAttribute('data-highlighted');
  expect(getComputedStyle(restart.element()).outlineStyle).toBe('solid');
  await userEvent.type(restart, '{Enter}');
  expect(onRestart).toHaveBeenCalledOnce();
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(trigger).toHaveFocus();
});

test('updates checkbox and radio items without closing the menu', async () => {
  const onCheckedChange = vi.fn();
  const onValueChange = vi.fn();
  await render(
    <Menu.Root defaultOpen>
      <Menu.Trigger>Display</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.CheckboxItem onCheckedChange={onCheckedChange}>
              Compact
            </Menu.CheckboxItem>
            <Menu.RadioGroup defaultValue="light" onValueChange={onValueChange}>
              <Menu.RadioItem value="light">Light</Menu.RadioItem>
              <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>,
  );

  const checkbox = page.getByRole('menuitemcheckbox', { name: 'Compact' }).element();
  await userEvent.click(checkbox);
  expect(onCheckedChange.mock.calls.at(-1)?.[0]).toBe(true);
  expect(checkbox.getAttribute('aria-checked')).toBe('true');

  const dark = page.getByRole('menuitemradio', { name: 'Dark' }).element();
  await userEvent.click(dark);
  expect(onValueChange.mock.calls.at(-1)?.[0]).toBe('dark');
  expect(dark.getAttribute('aria-checked')).toBe('true');
  expect(document.querySelector('.tr-menu-content')?.hasAttribute('data-open')).toBe(
    true,
  );
});

test('dismisses with Escape and keeps the positioned popup in viewport bounds', async () => {
  const screen = await render(<ActionsMenu />);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  await userEvent.click(trigger);
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  const popup = document.querySelector<HTMLElement>('.tr-menu-content') as HTMLElement;
  const rect = popup.getBoundingClientRect();
  expect(rect.left).toBeGreaterThanOrEqual(0);
  expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
  const menu = screen.getByRole('menu');
  await expect.element(menu).toHaveFocus();
  await userEvent.type(menu, '{Escape}');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(trigger).toHaveFocus();
});
