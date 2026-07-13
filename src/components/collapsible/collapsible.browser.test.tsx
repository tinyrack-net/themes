import './collapsible.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Collapsible, CollapsibleRoot } from './index.js';

test('uses Base UI collapsible behavior', async () => {
  expect(Collapsible.Root).toBe(CollapsibleRoot);
  await render(
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Panel>Content</Collapsible.Panel>
    </Collapsible.Root>,
  );
  const trigger = document.querySelector<HTMLButtonElement>('.tr-collapsible-summary');
  expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  trigger?.click();
  await expect.poll(() => trigger?.getAttribute('aria-expanded')).toBe('false');
});
