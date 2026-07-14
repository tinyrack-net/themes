import '../../core/core.css';
import './alert.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Alert, AlertRoot } from './index.js';

test('assembles all alert parts in index.tsx', async () => {
  document.documentElement.dataset['theme'] = 'tinyrack-light';
  expect(Alert.Root).toBe(AlertRoot);
  await render(
    <Alert.Root data-testid="alert" variant="warning">
      <Alert.Title>Attention</Alert.Title>
      <Alert.Description>Review this change.</Alert.Description>
      <Alert.Actions>
        <button type="button">Review</button>
      </Alert.Actions>
    </Alert.Root>,
  );

  const root = document.querySelector<HTMLElement>('[data-testid="alert"]');
  expect(root?.dataset['variant']).toBe('warning');
  const title = root?.querySelector<HTMLElement>('.tr-alert-title');
  const actions = root?.querySelector<HTMLElement>('.tr-alert-actions');
  expect(title?.textContent).toBe('Attention');
  expect(getComputedStyle(title as HTMLElement).fontWeight).not.toBe('400');
  expect(getComputedStyle(actions as HTMLElement).display).toBe('flex');
  expect(getComputedStyle(actions as HTMLElement).flexWrap).toBe('wrap');
});

test('forwards an application-selected announcement role', async () => {
  await render(
    <div>
      <Alert.Root data-testid="polite" role="status" variant="success">
        <Alert.Title>Backup complete</Alert.Title>
      </Alert.Root>
      <Alert.Root data-testid="urgent" role="alert" variant="danger">
        <Alert.Title>Connection lost</Alert.Title>
      </Alert.Root>
    </div>,
  );
  expect(document.querySelector('[data-testid="polite"]')?.getAttribute('role')).toBe(
    'status',
  );
  expect(document.querySelector('[data-testid="urgent"]')?.getAttribute('role')).toBe(
    'alert',
  );
});

test('uses a neutral title by default and supports a contextual heading', async () => {
  await render(
    <>
      <Alert.Root>
        <Alert.Title>Neutral title</Alert.Title>
      </Alert.Root>
      <Alert.Root>
        <Alert.Title render={<h4>Contextual title</h4>} />
      </Alert.Root>
    </>,
  );

  expect(document.querySelector('.tr-alert-title')?.tagName).toBe('DIV');
  expect(document.querySelector('h4.tr-alert-title')?.textContent).toBe(
    'Contextual title',
  );
});
