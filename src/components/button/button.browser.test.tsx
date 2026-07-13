import './button.css';
import { createRef } from 'react';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Button } from './index.js';

test('renders Base UI behavior through the Tinyrack button contract', async () => {
  const ref = createRef<HTMLButtonElement>();
  const onClick = vi.fn();
  await render(
    <Button
      ref={ref}
      appearance="outline"
      onClick={onClick}
      size="lg"
      variant="primary"
    >
      Save
    </Button>,
  );

  ref.current?.click();
  expect(onClick).toHaveBeenCalledOnce();
  expect(ref.current?.classList.contains('tr-btn')).toBe(true);
  expect(ref.current?.dataset['appearance']).toBe('outline');
  expect(ref.current?.type).toBe('button');
});

test('composes loading, accessible naming, and disabled states', async () => {
  const labelledRef = createRef<HTMLButtonElement>();
  const inheritedRef = createRef<HTMLButtonElement>();
  const disabledRef = createRef<HTMLButtonElement>();

  await render(
    <>
      <Button ref={labelledRef} loading loadingLabel="Saving changes">
        Save
      </Button>
      <Button ref={inheritedRef} aria-label="Publishing" loading>
        Publish
      </Button>
      <Button ref={disabledRef} disabled>
        Delete
      </Button>
    </>,
  );

  expect(labelledRef.current?.getAttribute('aria-label')).toBe('Saving changes');
  expect(labelledRef.current?.getAttribute('aria-busy')).toBe('true');
  expect(labelledRef.current?.querySelector('.tr-spinner')).not.toBeNull();
  expect(inheritedRef.current?.getAttribute('aria-label')).toBe('Publishing');
  expect(disabledRef.current?.disabled).toBe(true);
});
