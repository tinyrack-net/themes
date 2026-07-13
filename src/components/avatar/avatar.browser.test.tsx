import './avatar.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Avatar, AvatarRoot } from './index.js';

test('assembles image and fallback parts', async () => {
  expect(Avatar.Root).toBe(AvatarRoot);
  await render(
    <Avatar.Root shape="square" size="lg">
      <Avatar.Image alt="Tinyrack" src="/missing-avatar.png" />
      <Avatar.Fallback>TR</Avatar.Fallback>
    </Avatar.Root>,
  );
  const root = document.querySelector<HTMLElement>('.tr-avatar');
  expect(root?.dataset['shape']).toBe('square');
  expect(root?.dataset['size']).toBe('lg');
});
