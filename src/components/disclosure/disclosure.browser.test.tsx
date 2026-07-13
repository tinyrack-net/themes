import './disclosure.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Disclosure, DisclosureRoot } from './index.js';

test('uses Base UI collapsible behavior', async () => {
  expect(Disclosure.Root).toBe(DisclosureRoot);
  await render(
    <Disclosure.Root defaultOpen>
      <Disclosure.Trigger>Details</Disclosure.Trigger>
      <Disclosure.Panel>Content</Disclosure.Panel>
    </Disclosure.Root>,
  );
  const trigger = document.querySelector<HTMLButtonElement>('.tr-disclosure-summary');
  expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  trigger?.click();
  await expect.poll(() => trigger?.getAttribute('aria-expanded')).toBe('false');
});
