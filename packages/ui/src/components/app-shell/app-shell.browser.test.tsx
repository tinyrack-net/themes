import '../../core/core.css';
import './app-shell.css';
import { useState } from 'react';
import { expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { AppShell } from './index.js';

function setMobileMatch(matches: boolean) {
  const listeners = new Set<() => void>();
  const media = {
    addEventListener: (_type: string, listener: () => void) => {
      listeners.add(listener);
    },
    addListener: (listener: () => void) => {
      listeners.add(listener);
    },
    dispatchEvent: () => true,
    matches,
    media: '(width < 64rem)',
    onchange: null,
    removeEventListener: (_type: string, listener: () => void) => {
      listeners.delete(listener);
    },
    removeListener: (listener: () => void) => {
      listeners.delete(listener);
    },
  } as unknown as MediaQueryList;
  vi.spyOn(window, 'matchMedia').mockReturnValue(media);
  return media;
}

function ShellFixture({ controlled = false }: { controlled?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <AppShell.Root
      breakpoint="lg"
      layout="sidebar-first"
      onOpenChange={(nextOpen) => setOpen(nextOpen)}
      {...(controlled ? { open } : {})}
    >
      <AppShell.Header>
        <AppShell.Trigger
          aria-label="Open navigation"
          style={{ display: 'inline-flex' }}
        >
          ☰
        </AppShell.Trigger>
      </AppShell.Header>
      <AppShell.Sidebar aria-label="Documentation sidebar">
        <AppShell.Close aria-label="Close navigation">×</AppShell.Close>
        <a href="#docs">Docs</a>
      </AppShell.Sidebar>
      <AppShell.Main>Main content</AppShell.Main>
    </AppShell.Root>
  );
}

test('renders a static desktop sidebar landmark and both layout contracts', async () => {
  setMobileMatch(false);
  const view = await render(<ShellFixture />);
  expect(document.querySelector('aside.tr-app-shell-sidebar')).not.toBeNull();
  expect(
    document.querySelector('.tr-app-shell-scroll-area')?.getAttribute('data-variant'),
  ).toBe('plain');
  expect(document.querySelectorAll('main')).toHaveLength(1);
  expect(document.querySelector('.tr-app-shell')?.getAttribute('data-layout')).toBe(
    'sidebar-first',
  );
  await view.unmount();

  const alternateView = await render(
    <AppShell.Root breakpoint="sm" layout="header-first">
      <span id="alternate-sidebar-label">Alternate navigation</span>
      <AppShell.Sidebar aria-labelledby="alternate-sidebar-label">
        Navigation
      </AppShell.Sidebar>
      <AppShell.Main>Alternate content</AppShell.Main>
    </AppShell.Root>,
  );
  expect(document.querySelector('.tr-app-shell')?.getAttribute('data-layout')).toBe(
    'header-first',
  );
  expect(document.querySelector('.tr-app-shell')?.getAttribute('data-breakpoint')).toBe(
    'sm',
  );
  await alternateView.unmount();
  vi.restoreAllMocks();
});

test('opens a controlled mobile modal, traps focus, and supports modal dismissal', async () => {
  setMobileMatch(true);
  await render(<ShellFixture controlled />);
  const trigger = document.querySelector<HTMLButtonElement>(
    '[aria-label="Open navigation"]',
  );
  await userEvent.click(trigger as HTMLButtonElement);
  await expect
    .poll(
      () =>
        document
          .querySelector('.tr-app-shell-drawer-popup')
          ?.hasAttribute('data-open') ?? false,
    )
    .toBe(true);
  expect(
    document.querySelector('.tr-app-shell-drawer-popup')?.getAttribute('role'),
  ).toBe('dialog');
  expect(
    document.querySelector('.tr-app-shell-drawer-popup')?.getAttribute('aria-label'),
  ).toBe('Documentation sidebar');
  expect(document.body.style.overflow).not.toBe('');
  await expect
    .poll(() =>
      document
        .querySelector('.tr-app-shell-drawer-popup')
        ?.contains(document.activeElement),
    )
    .toBe(true);

  document.querySelector<HTMLElement>('.tr-app-shell-backdrop')?.click();
  await expect.poll(() => document.activeElement).toBe(trigger);
  await expect
    .poll(
      () =>
        document
          .querySelector('.tr-app-shell-drawer-popup')
          ?.hasAttribute('data-open') ?? false,
    )
    .toBe(false);

  await userEvent.click(trigger as HTMLButtonElement);
  await expect
    .poll(
      () =>
        document
          .querySelector('.tr-app-shell-drawer-popup')
          ?.hasAttribute('data-open') ?? false,
    )
    .toBe(true);
  await userEvent.keyboard('{Escape}');
  await expect.poll(() => document.activeElement).toBe(trigger);
  await expect
    .poll(
      () =>
        document
          .querySelector('.tr-app-shell-drawer-popup')
          ?.hasAttribute('data-open') ?? false,
    )
    .toBe(false);
  vi.restoreAllMocks();
});

test('supports uncontrolled default open and close button dismissal', async () => {
  setMobileMatch(true);
  await render(
    <AppShell.Root defaultOpen>
      <AppShell.Header>
        <AppShell.Trigger aria-label="Open menu" style={{ display: 'inline-flex' }}>
          ☰
        </AppShell.Trigger>
      </AppShell.Header>
      <AppShell.Sidebar aria-label="Menu">
        <AppShell.Close aria-label="Close menu">×</AppShell.Close>
      </AppShell.Sidebar>
      <AppShell.Main>Content</AppShell.Main>
    </AppShell.Root>,
  );
  await expect
    .poll(() =>
      document.querySelector('.tr-app-shell-drawer-popup')?.hasAttribute('data-open'),
    )
    .toBe(true);
  await userEvent.click(
    document.querySelector<HTMLButtonElement>(
      '[aria-label="Close menu"]',
    ) as HTMLButtonElement,
  );
  await expect
    .poll(
      () =>
        document
          .querySelector('.tr-app-shell-drawer-popup')
          ?.hasAttribute('data-open') ?? false,
    )
    .toBe(false);
  vi.restoreAllMocks();
});

test('reports a clear composition error outside Root', async () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  await expect(
    render(<AppShell.Trigger aria-label="Invalid trigger">x</AppShell.Trigger>),
  ).rejects.toThrow('AppShell.Trigger must be used inside AppShell.Root.');
  consoleError.mockRestore();
});
