import './tabs.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Tabs, TabsRoot } from './index.js';

test('uses Base UI keyboard and selection semantics', async () => {
  expect(Tabs.Root).toBe(TabsRoot);
  await render(
    <Tabs.Root defaultValue="general" size="lg">
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="network">Network</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="general">General settings</Tabs.Panel>
      <Tabs.Panel value="network">Network settings</Tabs.Panel>
    </Tabs.Root>,
  );
  const triggers = document.querySelectorAll<HTMLButtonElement>('.tr-tabs-tab');
  expect(triggers[0]?.getAttribute('aria-selected')).toBe('true');
  triggers[1]?.click();
  await expect.poll(() => triggers[1]?.getAttribute('aria-selected')).toBe('true');
  expect(document.querySelector<HTMLElement>('.tr-tabs')?.dataset['size']).toBe('lg');

  const list = document.querySelector<HTMLElement>('.tr-tabs-list');
  expect(list).not.toBeNull();
  expect(getComputedStyle(list as HTMLElement).gap).toBe('0px');
  expect(getComputedStyle(list as HTMLElement).overflowY).toBe('hidden');
});
