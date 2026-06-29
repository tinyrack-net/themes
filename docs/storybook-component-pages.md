# Storybook component pages

Storybook is the visual review surface for the Tinyrack theme adapters. Component pages are split by scenario so reviewers can inspect one design question at a time instead of scanning one large mixed preview.

This model keeps generated coverage broad while making each page useful for a specific review pass: default usage, visual variants, interaction states, production composition, token mapping, accessibility notes, and quick exploration.

## Generated stories

Generated component stories live under `stories/{mantine,daisyui}/components/`.

Do not hand-edit those files directly. Update the showcase registry, scenario metadata, or generator source instead, then regenerate stories.

```bash
pnpm generate:stories
```

## Scenarios

| Scenario | Purpose |
| --- | --- |
| Preview | Recommended default usage for the component. |
| Variants | Visual and style axes, such as color, size, tone, shape, or adapter-specific variants. |
| States | Interactive and validation states, including disabled, loading, selected, checked, error, and success states where applicable. |
| Composition | Real product UI examples that show the component with adjacent content, controls, and layout context. |
| Tokens | Token mapping that explains which Tinyrack semantic tokens drive the rendered component. |
| Accessibility | Keyboard, ARIA, label, focus, and contrast notes for reviewing accessible usage. |
| Playground | Quick exploration with Storybook controls or guided examples. |

## Storybook docs pages

Storybook also includes static design-system documentation pages outside the generated component files:

- `Introduction/Welcome` for orientation.
- `Foundations/*` for colors, typography, spacing, radius, and shadows.
- `Adapters/*` for Tailwind, daisyUI, Mantine, and Astro Starlight integration notes.

Use those pages for system-level guidance. Use generated component pages for adapter-specific component review.

## Verification

Run showcase tests after changing registries, scenario renderers, or generated stories:

```bash
pnpm test:showcase
```

Build Storybook before shipping documentation or showcase changes:

```bash
pnpm storybook:build
```

Audit generated Storybook output for missing, blank, narrow, or broken scenario pages:

```bash
pnpm storybook:audit
```
