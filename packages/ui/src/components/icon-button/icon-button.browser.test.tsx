import '../../core/core.css';
import './icon-button.css';
import { createRef } from 'react';
import { expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { IconButton } from './index.js';

test('reuses Button variants while exposing an icon-only accessible name', async () => {
  const ref = createRef<HTMLButtonElement>();
  const onClick = vi.fn();
  await render(
    <IconButton
      appearance="ghost"
      aria-label="Open navigation"
      onClick={onClick}
      ref={ref}
      size="sm"
      variant="primary"
    >
      <svg aria-hidden="true" />
    </IconButton>,
  );

  expect(ref.current?.classList.contains('tr-btn')).toBe(true);
  expect(ref.current?.classList.contains('tr-icon-btn')).toBe(true);
  expect(ref.current?.getAttribute('aria-label')).toBe('Open navigation');
  expect(ref.current?.dataset['appearance']).toBe('ghost');
  expect(ref.current?.getBoundingClientRect().width).toBe(
    ref.current?.getBoundingClientRect().height,
  );
  await userEvent.click(ref.current as HTMLButtonElement);
  expect(onClick).toHaveBeenCalledOnce();
});

test('supports aria-labelledby and Button loading behavior', async () => {
  await render(
    <div>
      <span id="save-label">Save rack</span>
      <IconButton aria-labelledby="save-label" loading loadingLabel="Saving rack">
        <svg aria-hidden="true" />
      </IconButton>
    </div>,
  );
  const button = document.querySelector<HTMLButtonElement>('.tr-icon-btn');
  expect(button?.disabled).toBe(true);
  expect(button?.getAttribute('aria-label')).toBe('Saving rack');
});

test('keeps a large icon square without shrinking it inside the touch target', async () => {
  await render(
    <IconButton aria-label="Open navigation" size="lg">
      <svg aria-hidden="true" viewBox="0 0 24 24" />
    </IconButton>,
  );
  const button = document.querySelector<HTMLButtonElement>('.tr-icon-btn');
  const icon = button?.querySelector('svg');

  expect(button?.getBoundingClientRect().width).toBe(48);
  expect(button?.getBoundingClientRect().height).toBe(48);
  expect(icon?.getBoundingClientRect().width).toBe(24);
  expect(icon?.getBoundingClientRect().height).toBe(24);
  if (icon === null || icon === undefined) throw new Error('Missing IconButton icon.');
  expect(getComputedStyle(icon).flexShrink).toBe('0');
});
