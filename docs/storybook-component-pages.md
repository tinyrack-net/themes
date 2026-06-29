# Storybook component pages

Storybook is the visual review surface for the Tinyrack theme adapters. Component pages follow a Spectrum-style model: docs first, then a small set of meaningful stories that describe real component axes.

The goal is a browsable catalog, not exhaustive per-component documentation. Each component gets concise docs and a clean default canvas, with additional stories only when they answer a useful design or implementation question.

## Generated stories

Generated component stories live under `stories/{mantine,daisyui}/components/`.

Do not hand-edit those files directly. Update the showcase registry, story metadata, or generator source instead, then regenerate stories.

```bash
pnpm generate:stories
```

## Story types

| Story type | Purpose |
| --- | --- |
| Docs | Always included. Provides an overview, quick preview, and concise notes. |
| Default | Always included. Shows a clean component canvas for the recommended baseline usage. |
| Variants | Included only when the component has real visual variants. |
| Sizes | Included only when size or density is a real axis. |
| States | Included only when disabled, loading, invalid, selected, or similar states matter. |
| Examples | Included only for high-value product-like examples that clarify real usage. |

Do not generate universal `Tokens`, `Accessibility`, `Playground`, or `Composition` pages for every component. Put system-level token and adapter guidance in foundations or adapter docs. Add accessibility or composition notes to component docs only when they are specific and useful.

## Storybook docs pages

Storybook also includes static design-system documentation pages outside the generated component files:

- `Introduction/Welcome` for orientation.
- `Foundations/*` for colors, typography, spacing, radius, and shadows.
- `Adapters/*` for Tailwind, daisyUI, Mantine, and Astro Starlight integration notes.

Use those pages for system-level guidance. Use generated component pages for adapter-specific component review.

## Verification

Run showcase tests after changing registries, story renderers, or generated stories:

```bash
pnpm test:showcase
```

Build Storybook before shipping documentation or showcase changes:

```bash
pnpm storybook:build
```

Audit generated Storybook output for missing, blank, narrow, or broken story pages:

```bash
pnpm storybook:audit
```
