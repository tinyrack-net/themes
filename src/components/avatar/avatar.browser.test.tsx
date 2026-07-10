import '../../core/core.css';
import './avatar.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Avatar } from './react.js';

const themeDatasetKey = 'theme';

test('Avatar renders an initials fallback with default size and shape', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-light';
  await render(<Avatar aria-label="Rack A">RA</Avatar>);
  const avatar = document.querySelector<HTMLElement>('.tr-avatar');

  if (!avatar) {
    throw new Error('Unable to find Avatar.');
  }

  await expect.element(avatar).toBeVisible();
  await expect.element(avatar).toHaveAttribute('data-size', 'md');
  await expect.element(avatar).toHaveAttribute('data-shape', 'circle');
  await expect.element(avatar).toHaveAttribute('aria-label', 'Rack A');
  expect(getComputedStyle(avatar).width).toBe('40px');
  expect(getComputedStyle(avatar).borderRadius).toBe('9999px');
});

test('Avatar supports square large images and class names', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-dark';
  await render(
    <Avatar className="custom-avatar" shape="square" size="lg">
      <img
        alt="Rack B"
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      />
    </Avatar>,
  );
  const avatar = document.querySelector<HTMLElement>('.tr-avatar');
  const image = avatar?.querySelector('img');

  if (!avatar || !image) {
    throw new Error('Unable to find image Avatar.');
  }

  expect(avatar.className).toContain('custom-avatar');
  await expect.element(avatar).toHaveAttribute('data-size', 'lg');
  await expect.element(avatar).toHaveAttribute('data-shape', 'square');
  expect(getComputedStyle(avatar).width).toBe('48px');
  expect(getComputedStyle(avatar).borderRadius).toBe('6px');
  expect(getComputedStyle(image).objectFit).toBe('cover');
});
