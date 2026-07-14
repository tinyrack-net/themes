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
