import './checkbox-group.css';
import { createRef } from 'react';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Checkbox } from '../checkbox/index.js';
import { CheckboxGroup } from './index.js';

test('renders the Tinyrack CheckboxGroup wrapper', async () => {
  expect(typeof CheckboxGroup).toBe('function');
  const ref = createRef<HTMLDivElement>();
  await render(
    <CheckboxGroup aria-label="Options" className="consumer-group" ref={ref}>
      Options
    </CheckboxGroup>,
  );
  expect(ref.current?.classList.contains('tr-checkbox-group')).toBe(true);
  expect(ref.current?.classList.contains('consumer-group')).toBe(true);
});

test('preserves controlled values and forwards a callback ref', async () => {
  let root: HTMLDivElement | null = null;
  await render(
    <form>
      <CheckboxGroup
        aria-label="Controlled features"
        ref={(node) => {
          root = node;
        }}
        value={['metrics']}
      >
        <Checkbox.Root aria-label="Metrics" name="features" value="metrics" />
        <Checkbox.Root aria-label="Alerts" name="features" value="alerts" />
      </CheckboxGroup>
    </form>,
  );

  expect(root).toHaveClass('tr-checkbox-group');
  const form = document.querySelector('form') as HTMLFormElement;
  form.reset();
  expect(new FormData(form).getAll('features')).toEqual(['metrics']);
});

test('coordinates named options, native FormData, reset, and disabled state', async () => {
  const onValueChange = vi.fn();
  const screen = await render(
    <form>
      <CheckboxGroup
        aria-label="Rack features"
        defaultValue={['metrics']}
        onValueChange={onValueChange}
      >
        <Checkbox.Root aria-label="Metrics" name="features" value="metrics" />
        <Checkbox.Root aria-label="Alerts" name="features" value="alerts" />
      </CheckboxGroup>
      <CheckboxGroup aria-label="Locked features" disabled>
        <Checkbox.Root aria-label="Backups" name="locked" value="backups" />
      </CheckboxGroup>
      <button type="reset">Reset</button>
    </form>,
  );

  const form = document.querySelector('form') as HTMLFormElement;
  const controls = Array.from(
    document.querySelectorAll<HTMLElement>('[role="checkbox"]'),
  );
  const [metrics, alerts, backups] = controls;
  expect(metrics?.getAttribute('aria-checked')).toBe('true');
  expect(backups?.getAttribute('aria-disabled')).toBe('true');

  alerts?.click();
  await expect.poll(() => alerts?.getAttribute('aria-checked')).toBe('true');
  expect(onValueChange.mock.calls.at(-1)?.[0]).toEqual(['metrics', 'alerts']);
  expect(new FormData(form).getAll('features')).toEqual(['metrics', 'alerts']);

  backups?.click();
  expect(new FormData(form).getAll('locked')).toEqual([]);
  form.reset();
  await expect
    .poll(() =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[role="checkbox"]'),
      )[1]?.getAttribute('aria-checked'),
    )
    .toBe('false');
  expect(new FormData(form).getAll('features')).toEqual(['metrics']);
  await screen.unmount();
});

test('resets from the form actually owned by descendant checkbox inputs', async () => {
  await render(
    <>
      <form id="external-feature-form" />
      <CheckboxGroup aria-label="External rack features" defaultValue={['metrics']}>
        <Checkbox.Root
          aria-label="External metrics"
          form="external-feature-form"
          name="features"
          value="metrics"
        />
        <Checkbox.Root
          aria-label="External alerts"
          form="external-feature-form"
          name="features"
          value="alerts"
        />
      </CheckboxGroup>
    </>,
  );

  const form = document.querySelector<HTMLFormElement>('#external-feature-form');
  const group = document.querySelector<HTMLElement>(
    '[role="group"][aria-label="External rack features"]',
  );
  expect(
    Array.from(group?.querySelectorAll<HTMLInputElement>('input') ?? []).map(
      (input) => input.form?.id,
    ),
  ).toEqual(['external-feature-form', 'external-feature-form']);
  const currentAlerts = () =>
    document.querySelector<HTMLElement>(
      '[role="checkbox"][aria-label="External alerts"]',
    );
  const alerts = currentAlerts();
  alerts?.click();
  await expect.poll(() => alerts?.getAttribute('aria-checked')).toBe('true');
  expect(new FormData(form as HTMLFormElement).getAll('features')).toEqual([
    'metrics',
    'alerts',
  ]);

  form?.reset();
  await expect.poll(() => currentAlerts()?.getAttribute('aria-checked')).toBe('false');
  expect(new FormData(form as HTMLFormElement).getAll('features')).toEqual(['metrics']);
});

test('ignores reset events from targets that do not own descendant inputs', async () => {
  await render(
    <>
      <form aria-label="Unrelated form" />
      <CheckboxGroup aria-label="Standalone features" defaultValue={['metrics']}>
        <Checkbox.Root aria-label="Standalone metrics" value="metrics" />
        <Checkbox.Root aria-label="Standalone alerts" value="alerts" />
      </CheckboxGroup>
    </>,
  );

  const currentAlerts = () =>
    document.querySelector<HTMLElement>(
      '[role="checkbox"][aria-label="Standalone alerts"]',
    );
  currentAlerts()?.click();
  await expect.poll(() => currentAlerts()?.getAttribute('aria-checked')).toBe('true');

  document.querySelector<HTMLFormElement>('form')?.reset();
  document.body.dispatchEvent(new Event('reset', { bubbles: true }));

  expect(currentAlerts()?.getAttribute('aria-checked')).toBe('true');
});

test('stays safe when a polymorphic renderer does not produce a host node', async () => {
  function EmptyRender() {
    return null;
  }

  await render(
    <>
      <form id="hostless-render-form" />
      <CheckboxGroup aria-label="Hostless features" render={<EmptyRender />} />
    </>,
  );

  const form = document.querySelector<HTMLFormElement>('#hostless-render-form');
  expect(() => form?.reset()).not.toThrow();
});
