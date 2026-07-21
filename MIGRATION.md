# Tinyrack UI migration guide

## Next release

- Replace the removed `tinyrack-docs` executable with `react-router dev`, `react-router build`, and `vite preview`. Install `@react-router/dev` directly and keep both `createDocsRouterConfig(config)` and `tinyrackDocs(config)` configured so build finalization and subpath preview behavior remain active.
- Install Tailwind CSS 4 and `@tailwindcss/vite`, then register `tailwindcss()` after `tinyrackDocs(config)` in the consumer Vite plugins. The docs stylesheet now preserves Tinyrack's Tailwind theme declarations.
- Replace `Link`'s removed `primary` variant with `default`; use `danger` only for destructive destinations. `Link` now has a `disabled` prop that removes navigation and blocks pointer and keyboard activation.
- Do not pass `size` to `Dialog.Popup` when `placement` is `top` or `bottom`. Those edge placements own their full-width geometry.
- Remove `children` and caller-provided `aria-hidden` from `Spinner`. Use `decorative` for hidden indicators and `label` for announced indicators.
- Update `Separator` refs from `HTMLHRElement` to `HTMLDivElement`. The component now follows the Base UI `Separator` render, state, orientation, and ref contract.
- Update `ContextMenu.Separator` custom props and refs to the Base UI Context Menu separator contract.
- Pass a type parameter to `Form` when submit values need an explicit shape, for example `<Form<{ rack: string }>>`.
- Use `Field.Root size="sm|md|lg"` for field-owned control sizing.
- Use `Meter.Root variant="neutral|info|success|warning|danger"` instead of overriding an indicator color for standard status meanings.

No compatibility aliases or CLI shims are provided for the removed or narrowed contracts.
