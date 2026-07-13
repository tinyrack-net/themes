import './scroll-area.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ScrollArea, ScrollAreaRoot } from './index.js';

test('renders the Tinyrack ScrollArea wrapper', async () => {
  expect(ScrollArea.Root).toBe(ScrollAreaRoot);
  await render(
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <ScrollArea.Content>Scrollable content</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>,
  );
  expect(document.querySelector('.tr-scroll-area')).not.toBeNull();
});
