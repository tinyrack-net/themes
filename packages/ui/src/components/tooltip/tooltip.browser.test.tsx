import '../../core/core.css';
import './tooltip.css';
import { act, type CSSProperties, createRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server.browser';
import { expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { createTooltipHandle, Tooltip, TooltipRoot } from './index.js';

const tooltipSides = ['top', 'right', 'bottom', 'left'] as const;
const borderedArrowEdges = {
  bottom: ['borderTopWidth', 'borderLeftWidth'],
  left: ['borderBottomWidth', 'borderLeftWidth'],
  right: ['borderTopWidth', 'borderRightWidth'],
  top: ['borderBottomWidth', 'borderRightWidth'],
} as const;

test('creates detached tooltip handles through both public exports', () => {
  expect(createTooltipHandle()).toBeTypeOf('object');
  expect(Tooltip.createHandle()).toBeTypeOf('object');
});

function ControlledTooltipFixture() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider closeDelay={0} delay={0}>
      <Tooltip.Root onOpenChange={setOpen} open={open}>
        <Tooltip.Trigger>Controlled rack health</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>Healthy</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
      <output aria-live="polite">Tooltip is {open ? 'open' : 'closed'}</output>
    </Tooltip.Provider>
  );
}

function HydratedTooltipFixture() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Hydrated rack info</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              Hydrated details
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

test.each([
  'tinyrack-light',
  'tinyrack-dark',
] as const)('renders token-backed arrow geometry and colors in %s', async (theme) => {
  document.documentElement.dataset['theme'] = theme;

  for (const side of tooltipSides) {
    const view = await render(
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger>{side} info</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner
              collisionAvoidance={{ align: 'none', side: 'none' }}
              side={side}
            >
              <Tooltip.Popup>
                Details
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>,
    );

    const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
    const arrow = document.querySelector<HTMLElement>('.tr-tooltip-arrow');
    await expect.poll(() => arrow?.dataset['side']).toBe(side);
    const popupStyle = getComputedStyle(popup as HTMLElement);
    const arrowStyle = getComputedStyle(arrow as HTMLElement);

    expect(arrowStyle.width).not.toBe('0px');
    expect(arrowStyle.height).not.toBe('0px');
    expect(arrowStyle.backgroundColor).toBe(popupStyle.backgroundColor);
    expect(arrowStyle.borderColor).toBe(popupStyle.borderColor);
    for (const edge of borderedArrowEdges[side]) {
      expect(Number.parseFloat(arrowStyle[edge])).toBeGreaterThan(0);
    }

    await view.unmount();
  }
});

test('uses Base UI tooltip semantics and positioning', async () => {
  expect(Tooltip.Root).toBe(TooltipRoot);
  await render(
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Info</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              Details
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );
  const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
  expect(popup?.hasAttribute('data-open')).toBe(true);
  expect(document.querySelector('.tr-tooltip')?.textContent).toBe('Info');
  expect(document.querySelector('.tr-tooltip-arrow')).not.toBeNull();
});

test('opens from focus, links its description, and dismisses with Escape', async () => {
  await render(
    <Tooltip.Provider closeDelay={0} delay={0}>
      <Tooltip.Root>
        <Tooltip.Trigger>Rack temperature</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>24°C</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );

  const trigger = document.querySelector<HTMLElement>('.tr-tooltip');
  trigger?.focus();
  await expect
    .poll(() =>
      document.querySelector('.tr-tooltip-content')?.hasAttribute('data-open'),
    )
    .toBe(true);

  const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
  expect(popup?.getAttribute('role')).toBe('tooltip');
  expect(trigger?.getAttribute('aria-describedby')).toBe(popup?.id);
  expect(document.activeElement).toBe(trigger);

  await userEvent.keyboard('{Escape}');
  await expect
    .poll(
      () =>
        document.querySelector('.tr-tooltip-content')?.hasAttribute('data-open') ??
        false,
    )
    .toBe(false);
  expect(document.activeElement).toBe(trigger);
});

test('preserves explicit description ids, roles, and existing trigger descriptions', async () => {
  await render(
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger aria-describedby="existing-description">Info</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup id="rack-details" role="status">
              Rack details
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );

  const trigger = document.querySelector<HTMLElement>('.tr-tooltip');
  const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
  expect(popup?.id).toBe('rack-details');
  expect(popup?.getAttribute('role')).toBe('status');
  expect(trigger?.getAttribute('aria-describedby')).toBe(
    'existing-description rack-details',
  );
});

test('opens and closes from real pointer hover while reporting controlled state', async () => {
  const onOpenChange = vi.fn();
  await render(
    <Tooltip.Provider closeDelay={0} delay={0}>
      <Tooltip.Root onOpenChange={onOpenChange}>
        <Tooltip.Trigger>Rack health</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom">
            <Tooltip.Popup>Healthy</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );

  const trigger = document.querySelector<HTMLElement>('.tr-tooltip');
  await userEvent.hover(trigger as HTMLElement);
  await expect
    .poll(() =>
      document.querySelector('.tr-tooltip-content')?.hasAttribute('data-open'),
    )
    .toBe(true);
  expect(onOpenChange.mock.calls.at(-1)?.[0]).toBe(true);

  await userEvent.unhover(trigger as HTMLElement);
  await expect
    .poll(
      () =>
        document.querySelector('.tr-tooltip-content')?.hasAttribute('data-open') ??
        false,
    )
    .toBe(false);
  expect(onOpenChange.mock.calls.at(-1)?.[0]).toBe(false);
});

test('preserves real controlled open state', async () => {
  await render(<ControlledTooltipFixture />);
  const trigger = document.querySelector<HTMLElement>('.tr-tooltip');
  const status = document.querySelector<HTMLOutputElement>('output');

  expect(status?.textContent).toBe('Tooltip is closed');
  await userEvent.hover(trigger as HTMLElement);
  await expect.poll(() => status?.textContent).toBe('Tooltip is open');
  expect(document.querySelector('.tr-tooltip-content')?.hasAttribute('data-open')).toBe(
    true,
  );

  await userEvent.unhover(trigger as HTMLElement);
  await expect.poll(() => status?.textContent).toBe('Tooltip is closed');
});

test('preserves refs, render, native props, events, classes, and token overrides', async () => {
  document.documentElement.dataset['theme'] = 'tinyrack-light';
  const onClick = vi.fn();
  const triggerRef = createRef<HTMLButtonElement>();
  const popupRef = createRef<HTMLDivElement>();
  const tooltipOverrides = {
    '--tr-tooltip-background': 'rgb(12 34 56)',
    '--tr-tooltip-border': 'rgb(67 89 101)',
    '--tr-tooltip-color': 'rgb(250 250 250)',
    '--tr-tooltip-line-height': '2',
    '--tr-tooltip-max-width': '10rem',
  } as CSSProperties;

  await render(
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger
          className="consumer-trigger"
          data-consumer-trigger="preserved"
          onClick={onClick}
          ref={triggerRef}
          render={<button type="button" />}
          title="Native trigger title"
        >
          Rendered trigger
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup
              className="consumer-popup"
              data-consumer-popup="preserved"
              ref={popupRef}
              style={tooltipOverrides}
            >
              Styled details
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>,
  );

  expect(triggerRef.current).toHaveClass('tr-tooltip', 'consumer-trigger');
  expect(triggerRef.current?.dataset['consumerTrigger']).toBe('preserved');
  expect(triggerRef.current?.title).toBe('Native trigger title');
  expect(triggerRef.current?.type).toBe('button');
  expect(popupRef.current).toHaveClass(
    'tr-layer',
    'tr-tooltip-content',
    'consumer-popup',
  );
  expect(popupRef.current?.dataset['consumerPopup']).toBe('preserved');

  const popupStyle = getComputedStyle(popupRef.current as HTMLDivElement);
  const arrowStyle = getComputedStyle(
    document.querySelector<HTMLElement>('.tr-tooltip-arrow') as HTMLElement,
  );
  expect(popupStyle.backgroundColor).toBe('rgb(12, 34, 56)');
  expect(popupStyle.borderColor).toBe('rgb(67, 89, 101)');
  expect(popupStyle.color).toBe('rgb(250, 250, 250)');
  expect(popupStyle.lineHeight).toBe('24px');
  expect(
    (popupRef.current as HTMLDivElement).getBoundingClientRect().width,
  ).toBeLessThanOrEqual(160);
  expect(arrowStyle.backgroundColor).toBe(popupStyle.backgroundColor);
  expect(arrowStyle.borderColor).toBe(popupStyle.borderColor);

  await userEvent.click(triggerRef.current as HTMLButtonElement);
  expect(onClick).toHaveBeenCalledOnce();
});

test('contains long collision content inside the viewport', async () => {
  await render(
    <div style={{ insetInlineEnd: 0, position: 'fixed', top: '50%' }}>
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger>Maintenance details</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner align="end" side="right">
              <Tooltip.Popup>
                MaintenanceWindowRequiresOperatorConfirmationBeforeRestartingServices
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>,
  );

  const popup = document.querySelector<HTMLElement>('.tr-tooltip-content');
  await expect.poll(() => popup?.hasAttribute('data-open')).toBe(true);
  const bounds = (popup as HTMLElement).getBoundingClientRect();

  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(window.innerWidth);
  expect((popup as HTMLElement).scrollWidth).toBeLessThanOrEqual(
    (popup as HTMLElement).clientWidth,
  );
});

test('server-renders and hydrates a default-open portaled tooltip', async () => {
  const actEnvironment = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previousActEnvironment = actEnvironment.IS_REACT_ACT_ENVIRONMENT;
  actEnvironment.IS_REACT_ACT_ENVIRONMENT = true;
  const host = document.createElement('div');
  host.innerHTML = renderToString(<HydratedTooltipFixture />);
  document.body.append(host);
  const hydrationErrors: unknown[] = [];
  const root = hydrateRoot(host, <HydratedTooltipFixture />, {
    onRecoverableError(error) {
      hydrationErrors.push(error);
    },
  });

  try {
    await act(async () => {});
    expect(hydrationErrors).toEqual([]);
    await expect
      .poll(() =>
        Array.from(document.querySelectorAll('.tr-tooltip-content')).some(
          (popup) =>
            popup.textContent?.includes('Hydrated details') &&
            popup.hasAttribute('data-open'),
        ),
      )
      .toBe(true);
  } finally {
    await act(async () => root.unmount());
    host.remove();
    if (previousActEnvironment === undefined) {
      delete actEnvironment.IS_REACT_ACT_ENVIRONMENT;
    } else {
      actEnvironment.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  }
});
