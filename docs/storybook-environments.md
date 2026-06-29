# Storybook environment smoke pages

Environment smoke pages are integration smoke fixtures, not component catalog pages. They prove Tinyrack themes work in realistic host surfaces across Starlight, Mantine with Tailwind, and daisyUI with Tailwind.

## Location

Environment smoke stories belong under `stories/environments/`.

Do not add environment smoke pages under `stories/{mantine,daisyui}/components/`. Those directories are reserved for generated Spectrum-style component catalog pages.

## Sidebar Structure

Storybook exposes the environment smoke pages under this sidebar structure:

```txt
Environments
├─ Starlight
├─ Mantine + Tailwind
└─ daisyUI + Tailwind
```

The corresponding story titles are:

- `Environments/Starlight`
- `Environments/Mantine + Tailwind`
- `Environments/daisyUI + Tailwind`

## What They Prove

`Environments/Starlight` verifies a docs shell with prose, code, callout, and links using Tinyrack tokens.

`Environments/Mantine + Tailwind` verifies real Mantine components rendered inside Tailwind layout and utility classes.

`Environments/daisyUI + Tailwind` verifies real daisyUI classes rendered inside Tailwind utilities and the Tinyrack daisyUI theme.

## Verification

Build Storybook before reviewing or shipping environment page changes:

```bash
pnpm run storybook:build
```

Audit the environment smoke pages after building Storybook:

```bash
pnpm run storybook:audit:environments
```

The audit report is written to `artifacts/storybook-environment-audit/audit.json`.

Run component tests to catch structure and browser-mode regressions:

```bash
pnpm run test:component
```
