import './toolbar.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Toolbar, ToolbarRoot } from './index.js';

test('renders the Tinyrack Toolbar wrapper', async () => {
  expect(Toolbar.Root).toBe(ToolbarRoot);
  await render(
    <Toolbar.Root aria-label="Editor">
      <Toolbar.Group>
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>,
  );
  expect(document.querySelector('.tr-toolbar')).not.toBeNull();
});
