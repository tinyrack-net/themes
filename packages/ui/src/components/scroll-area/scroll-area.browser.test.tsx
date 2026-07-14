import '../../core/core.css';
import './scroll-area.css';
import { createRef } from 'react';
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
  expect(document.querySelector('.tr-scroll-area')?.getAttribute('data-variant')).toBe(
    'surface',
  );
});

test('offers a borderless and padding-free plain variant', async () => {
  await render(
    <ScrollArea.Root variant="plain">
      <ScrollArea.Viewport>
        <ScrollArea.Content>Navigation</ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>,
  );
  const root = document.querySelector<HTMLElement>('.tr-scroll-area');
  const content = document.querySelector<HTMLElement>('.tr-scroll-area-content');
  expect(root?.dataset['variant']).toBe('plain');
  expect(getComputedStyle(root as HTMLElement).borderTopWidth).toBe('0px');
  expect(getComputedStyle(content as HTMLElement).paddingTop).toBe('0px');
});

test('keeps vertical and horizontal scroll indicators visible', async () => {
  await render(
    <ScrollArea.Root style={{ height: 160, width: 320 }}>
      <ScrollArea.Viewport>
        <ScrollArea.Content style={{ height: 320, width: 640 }}>
          Scrollable content
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>,
  );

  await expect
    .poll(() => document.querySelectorAll('.tr-scroll-area-thumb').length)
    .toBe(2);

  const verticalThumb = document.querySelector<HTMLElement>(
    '.tr-scroll-area-scrollbar[data-orientation="vertical"] .tr-scroll-area-thumb',
  );
  const horizontalThumb = document.querySelector<HTMLElement>(
    '.tr-scroll-area-scrollbar[data-orientation="horizontal"] .tr-scroll-area-thumb',
  );

  expect(verticalThumb).not.toBeNull();
  expect(horizontalThumb).not.toBeNull();
  expect((verticalThumb as HTMLElement).getBoundingClientRect().width).toBeGreaterThan(
    0,
  );
  expect(
    (horizontalThumb as HTMLElement).getBoundingClientRect().height,
  ).toBeGreaterThan(0);
});

test('keeps horizontal-only overflow on its declared axis and forwards viewport props', async () => {
  const viewportRef = createRef<HTMLDivElement>();

  await render(
    <ScrollArea.Root style={{ height: 160, width: 320 }}>
      <ScrollArea.Viewport
        aria-label="Horizontal rack events"
        data-testid="horizontal-viewport"
        ref={viewportRef}
        tabIndex={0}
      >
        <ScrollArea.Content style={{ height: 40, width: 640 }}>
          Rack event stream
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>,
  );

  const viewport = viewportRef.current as HTMLDivElement;
  expect(viewport.getAttribute('aria-label')).toBe('Horizontal rack events');
  expect(viewport.tabIndex).toBe(0);
  expect(viewport.scrollWidth).toBeGreaterThan(viewport.clientWidth);
  expect(viewport.scrollHeight).toBeLessThanOrEqual(viewport.clientHeight);
  expect(
    document.querySelector('.tr-scroll-area-scrollbar[data-orientation="vertical"]'),
  ).toBeNull();

  viewport.scrollLeft = 120;
  viewport.dispatchEvent(new Event('scroll', { bubbles: true }));
  await expect.poll(() => viewport.scrollLeft).toBe(120);
});
