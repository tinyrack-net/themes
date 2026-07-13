import './alert.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Alert, AlertRoot } from './index.js';

test('assembles all alert parts in index.tsx', async () => {
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
  expect(root?.querySelector('.tr-alert-title')?.textContent).toBe('Attention');
});
