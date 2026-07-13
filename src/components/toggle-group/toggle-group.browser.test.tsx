import './toggle-group.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ToggleGroup } from './index.js';

test('renders the Tinyrack ToggleGroup wrapper', async () => {
  expect(typeof ToggleGroup).toBe('function');
  await render(
    <ToggleGroup aria-label="Alignment" defaultValue={['start']}>
      Alignment
    </ToggleGroup>,
  );
  expect(document.querySelector('.tr-toggle-group')).not.toBeNull();
});
