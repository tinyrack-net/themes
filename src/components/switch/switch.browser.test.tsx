import './switch.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Switch, SwitchRoot } from './index.js';

test('renders the Tinyrack Switch wrapper', async () => {
  expect(Switch.Root).toBe(SwitchRoot);
  await render(
    <Switch.Root aria-label="Power" defaultChecked>
      <Switch.Thumb />
    </Switch.Root>,
  );
  expect(document.querySelector('.tr-switch')).not.toBeNull();
});
