import './accordion.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Accordion, AccordionRoot } from './index.js';

test('uses Base UI for accessible accordion state', async () => {
  expect(Accordion.Root).toBe(AccordionRoot);
  await render(
    <Accordion.Root defaultValue={['network']}>
      <Accordion.Item value="network">
        <Accordion.Header>
          <Accordion.Trigger>Network</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Online</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>,
  );
  const trigger = document.querySelector<HTMLButtonElement>('.tr-accordion-trigger');
  expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  trigger?.click();
  await expect.poll(() => trigger?.getAttribute('aria-expanded')).toBe('false');
});
