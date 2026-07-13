import './progress.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Progress, ProgressRoot } from './index.js';

test('assembles an accessible progress indicator', async () => {
  expect(Progress.Root).toBe(ProgressRoot);
  await render(
    <Progress.Root size="lg" value={65} variant="success">
      <Progress.Label>Deploy</Progress.Label>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
      <Progress.Value />
    </Progress.Root>,
  );
  const root = document.querySelector<HTMLElement>('.tr-progress');
  expect(root?.getAttribute('role')).toBe('progressbar');
  expect(root?.getAttribute('aria-valuenow')).toBe('65');
  expect(root?.dataset['variant']).toBe('success');
});
