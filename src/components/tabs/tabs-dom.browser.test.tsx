import { afterEach, expect, test } from 'vitest';
import { tabsChangeEventName } from './contract.js';
import { createTabsManager } from './dom.js';

afterEach(() => document.body.replaceChildren());

function markup() {
  return `
    <div class="tr-tabs" data-tr-tabs data-activation-mode="automatic" data-orientation="horizontal" data-value="one">
      <div role="tablist">
        <button role="tab" data-value="one" aria-selected="true">One</button>
        <button role="tab" data-value="two" aria-selected="false" tabindex="-1">Two</button>
      </div>
      <div role="tabpanel" data-value="one">Panel one</div>
      <div role="tabpanel" data-value="two" hidden>Panel two</div>
    </div>`;
}

test('Tabs DOM manager owns selection and survives DOM replacement', async () => {
  const scope = document.createElement('section');
  scope.innerHTML = markup();
  document.body.append(scope);
  const manager = createTabsManager(scope);
  const root = scope.querySelector<HTMLElement>('[data-tr-tabs]')!;
  let changes = 0;
  root.addEventListener(tabsChangeEventName, () => {
    changes += 1;
  });

  scope.querySelector<HTMLButtonElement>('[data-value="two"]')?.click();
  expect(root.dataset['value']).toBe('two');
  expect(
    root.querySelector<HTMLElement>('[role="tabpanel"][data-value="two"]')?.hidden,
  ).toBe(false);
  expect(changes).toBe(1);

  scope.innerHTML = markup().replaceAll('one', 'alpha').replaceAll('two', 'beta');
  await Promise.resolve();
  const replacement = scope.querySelector<HTMLElement>('[data-tr-tabs]')!;
  replacement.querySelector<HTMLButtonElement>('[data-value="beta"]')?.click();
  expect(replacement.dataset['value']).toBe('beta');
  expect(
    replacement.querySelector<HTMLElement>('[data-value="beta"][role="tabpanel"]')
      ?.hidden,
  ).toBe(false);
  manager.destroy();
});

test('Tabs DOM manager scopes discovery to a ShadowRoot', () => {
  const host = document.createElement('div');
  document.body.append(host);
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = markup();
  const manager = createTabsManager(shadow);
  const root = shadow.querySelector<HTMLElement>('[data-tr-tabs]')!;
  root.querySelector<HTMLButtonElement>('[data-value="two"]')?.click();
  expect(root.dataset['value']).toBe('two');
  manager.destroy();
});
