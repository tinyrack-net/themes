import './toggle-group.css';
import { useState } from 'react';
import { expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Toggle } from '../toggle/index.js';
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

test('preserves refs, native props, events, render, and state-based class names', async () => {
  let groupRef: HTMLDivElement | null = null;
  let clickCount = 0;

  await render(
    <ToggleGroup
      aria-label="Rendered formatting"
      className={({ orientation }) => `consumer-group consumer-group-${orientation}`}
      data-owner="editor"
      onClick={() => {
        clickCount += 1;
      }}
      orientation="vertical"
      ref={(node) => {
        groupRef = node;
      }}
      render={<div data-rendered="toggle-group" />}
    >
      <Toggle value="bold">Bold</Toggle>
    </ToggleGroup>,
  );

  const group = page.getByRole('group', { name: 'Rendered formatting' });
  expect(groupRef).toBe(group.element());
  expect(group.element().dataset['owner']).toBe('editor');
  expect(group.element().dataset['rendered']).toBe('toggle-group');
  expect(group.element().classList.contains('tr-toggle-group')).toBe(true);
  expect(group.element().classList.contains('consumer-group-vertical')).toBe(true);
  await group.getByRole('button', { name: 'Bold' }).click();
  expect(clickCount).toBe(1);
});

test('preserves controlled multiple selection and orientation state', async () => {
  function ControlledToggleGroup() {
    const [value, setValue] = useState<string[]>(['bold']);

    return (
      <>
        <ToggleGroup
          aria-label="Formatting"
          multiple
          onValueChange={setValue}
          orientation="vertical"
          value={value}
        >
          <Toggle value="bold">Bold</Toggle>
          <Toggle value="italic">Italic</Toggle>
        </ToggleGroup>
        <output>{value.join(', ')}</output>
      </>
    );
  }

  await render(<ControlledToggleGroup />);
  const group = document.querySelector<HTMLElement>('.tr-toggle-group');
  const italic = [...document.querySelectorAll<HTMLButtonElement>('.tr-toggle')].find(
    (toggle) => toggle.textContent === 'Italic',
  );
  expect(group?.dataset['orientation']).toBe('vertical');
  italic?.click();
  await expect
    .poll(() => document.querySelector('output')?.textContent)
    .toBe('bold, italic');
  expect(italic?.getAttribute('aria-pressed')).toBe('true');
});

test('moves focus by orientation, respects bounded edges, and deselects single values', async () => {
  await render(
    <ToggleGroup
      aria-label="Alignment"
      defaultValue={['start']}
      loopFocus={false}
      orientation="horizontal"
    >
      <Toggle value="start">Start</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="end">End</Toggle>
    </ToggleGroup>,
  );

  const start = page.getByRole('button', { name: 'Start' });
  const center = page.getByRole('button', { name: 'Center' });
  start.element().focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(document.activeElement).toBe(center.element());
  await userEvent.keyboard('{ArrowLeft}');
  expect(document.activeElement).toBe(start.element());
  await userEvent.keyboard('{ArrowLeft}');
  expect(document.activeElement).toBe(start.element());

  await center.click();
  await expect.poll(() => center.element().getAttribute('aria-pressed')).toBe('true');
  expect(start.element().getAttribute('aria-pressed')).toBe('false');
  await center.click();
  await expect.poll(() => center.element().getAttribute('aria-pressed')).toBe('false');
});

test('moves vertical focus, skips disabled items, and loops at the group edges', async () => {
  await render(
    <ToggleGroup
      aria-label="Panel placement"
      defaultValue={['top']}
      orientation="vertical"
    >
      <Toggle value="top">Top</Toggle>
      <Toggle disabled value="middle">
        Middle unavailable
      </Toggle>
      <Toggle value="bottom">Bottom</Toggle>
    </ToggleGroup>,
  );

  const top = page.getByRole('button', { name: 'Top' });
  const middle = page.getByRole('button', { name: 'Middle unavailable' });
  const bottom = page.getByRole('button', { name: 'Bottom' });
  top.element().focus();
  await userEvent.keyboard('{ArrowDown}');
  expect(document.activeElement).toBe(bottom.element());
  expect(document.activeElement).not.toBe(middle.element());
  await userEvent.keyboard('{ArrowDown}');
  expect(document.activeElement).toBe(top.element());
  await userEvent.keyboard('{ArrowUp}');
  expect(document.activeElement).toBe(bottom.element());
});

test('propagates group disabled state and suppresses item activation', async () => {
  await render(
    <ToggleGroup aria-label="Unavailable formatting" disabled>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
    </ToggleGroup>,
  );

  const bold = page.getByRole('button', { name: 'Bold' });
  expect(bold.element().getAttribute('aria-disabled')).toBe('true');
  await bold.click({ force: true });
  expect(bold.element().getAttribute('aria-pressed')).toBe('false');
});
