import '../../core/core.css';
import './divider.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Divider } from './react.js';

const themeDatasetKey = 'theme';

test('Divider renders a semantic horizontal separator by default', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-dark';
  await render(<Divider className="custom-divider" />);
  const divider = document.querySelector<HTMLElement>('.tr-divider');

  if (!divider) {
    throw new Error('Unable to find horizontal Divider.');
  }

  await expect.element(divider).toBeVisible();
  await expect.element(divider).toHaveAttribute('data-orientation', 'horizontal');
  expect(divider.className).toContain('custom-divider');
  expect(divider.tagName).toBe('HR');
  expect(getComputedStyle(divider).height).toBe('1px');
  expect(getComputedStyle(divider).backgroundColor).toBe('rgb(64, 64, 64)');
});

test('Divider exposes vertical orientation and ARIA orientation', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-light';
  await render(<Divider orientation="vertical" />);
  const divider = document.querySelector<HTMLElement>('.tr-divider');

  if (!divider) {
    throw new Error('Unable to find vertical Divider.');
  }

  await expect.element(divider).toHaveAttribute('data-orientation', 'vertical');
  await expect.element(divider).toHaveAttribute('aria-orientation', 'vertical');
  expect(getComputedStyle(divider).width).toBe('1px');
  expect(getComputedStyle(divider).minHeight).toBe('16px');
});
