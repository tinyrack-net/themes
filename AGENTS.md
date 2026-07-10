# Tinyrack UI Component Development Guidelines

This file applies to the entire repository. Use these rules when creating,
changing, documenting, or publishing components.

## Architecture

Tinyrack UI is Web Platform-first. The canonical component contract is semantic
HTML, Tinyrack-prefixed CSS, and framework-neutral DOM behavior when native HTML
is not sufficient.

- Do not make Astro or React the source of truth for a component.
- Do not require React for HTML or Astro consumption.
- Treat Astro as a representative HTML consumer, not as a separate component
  implementation target.
- Provide a React adapter only when React ergonomics add real value.
- Do not add an Astro-specific component API by default. Prefer documented HTML
  markup and one processed layout script.
- Do not introduce Web Components merely to share code between Astro and React.
  Use them only when the custom-element lifecycle is itself required.

The intended dependency direction is:

```text
contract.ts + component.css + optional dom.ts
                    |
          +---------+---------+
          |                   |
      HTML / Astro        React adapter
      direct use          thin wrapper
```

There must be one behavioral implementation. Shared algorithms such as overlay
stacking, focus management, keyboard handling, positioning, selection, and
cleanup belong in the framework-neutral DOM layer. A framework adapter must not
reimplement them.

## Component Ownership Boundaries

Use the smallest workable, colocated component folder:

```text
src/components/<component>/
  contract.ts
  <component>.css
  dom.ts                 # only when shared client behavior is required
  react.tsx              # only when a React adapter is public
  *.test.ts
  *.browser.test.tsx
```

- `contract.ts` owns public values, literal unions, class names, defaults, and
  event/reason types. It must not import React, Astro, or browser-only modules.
- `<component>.css` owns the public visual contract and must work independently
  of React. Use `tr-` class prefixes and existing Tinyrack tokens.
- `dom.ts` owns reusable browser behavior. It must not import React or Astro and
  must avoid browser-global access during module evaluation so SSR imports stay
  safe.
- `react.tsx` owns only React-specific concerns: JSX rendering, refs, `asChild`,
  controlled/uncontrolled state, and React event composition.
- Keep tests beside the implementation. Do not create new test-only directory
  layers unless the test is a repository-level fixture or E2E check.
- Do not add aggregate barrels or alternate folder hierarchies without a clear
  public API need.

## HTML and CSS Contract

- Start from semantic native elements and browser APIs before adding custom
  behavior. Prefer `button`, `dialog`, `popover`, form semantics, and ARIA state
  over div-based simulations.
- HTML class names and `data-*` attributes are public API. Keep them explicit,
  stable, and documented.
- Use `data-*` attributes for component variants, sizes, placement, and state
  that must be shared by HTML and framework adapters.
- Accessibility must be present in the HTML contract, not patched only by a
  React effect.
- Keep generated markup valid when consumers place forms, headings, or other
  semantic elements inside the component.
- SSR output must be deterministic and must not claim browser state that has not
  been activated. Serialize deferred intent through data attributes when needed.
- Convenience sizing and placement must remain overrideable by consumer classes
  or styles. Use cascade layers or custom properties where component CSS would
  otherwise defeat Tailwind utilities.
- Prefer native top-layer behavior over a public global z-index scale.

## DOM Behavior

Add a framework-neutral DOM module only when native HTML and CSS cannot provide
the complete contract.

- Prefer event delegation at a stable document or component root over attaching
  one listener per rendered instance.
- Preserve native declarative behavior as the no-JavaScript or pre-hydration
  baseline whenever possible.
- Clean up observers, timers, subscriptions, and positioning work when elements
  disconnect or when the manager is destroyed.
- Support DOM replacement and client-side navigation without requiring a full
  page reload when the consuming framework can replace page content.
- Emit DOM events for observable state changes so framework adapters and plain
  HTML consumers share the same behavior contract.
- Keep focus restoration, keyboard order, and nested teardown deterministic.

## React Adapter

React is an adapter, not the behavioral core.

- Render the same semantic elements, classes, attributes, and DOM part order as
  the HTML contract.
- Delegate shared behavior to the DOM implementation.
- Keep React and React DOM as optional peers when non-React exports can operate
  without them.
- Support controlled and uncontrolled APIs only for state that consumers
  reasonably need to own.
- When `asChild` is supported, merge refs and user events. If a user event calls
  `preventDefault()`, do not run the internal action.
- Preserve useful native attributes in server-rendered output so supported
  browser behavior can work before hydration.
- Do not add React-only variants or dismissal behavior without first defining
  the equivalent HTML/DOM contract.

## Astro and HTML Consumption

Do not create a parallel Astro implementation for ordinary components.

- HTML and Astro consume the public CSS and DOM contracts directly.
- Put one framework-neutral manager initialization in a shared Astro layout when
  document-level behavior is required.
- Use a processed Astro `<script>` with no extra attributes so npm imports are
  bundled and the script is deduplicated.
- An Astro application that already uses React may choose the React adapter as a
  hydrated island, but this is an optional consumer decision, not the default
  Tinyrack API.
- Documentation should lead with the HTML/DOM path for Astro. Do not require
  `@astrojs/react`, React hydration, or a React runtime for the default example.
- Astro coverage should prove that the public DOM export builds and runs without
  importing React.

## Packaging

Every new public component must be wired through the real package boundary.

- Add explicit `package.json` `files` and `exports` entries. Do not expose a root
  aggregate export unless the package contract changes intentionally.
- Add standalone CSS to `scripts/copy-css.ts`.
- Keep framework-neutral dependencies in `dependencies`; keep renderer runtimes
  as optional peers when possible.
- Update `e2e/package-exports.test.ts` and `e2e/dist-package-smoke.ts` for public
  subpaths.
- Import the CSS in `.storybook/preview.css` and register docs in
  `stories/shared/component-docs-manifest.ts`.
- Update README examples when a new consumption surface or public package path
  is introduced.

## Testing

Test each concern once at its source of truth.

- Contract tests lock public values, class names, native semantics, and forbidden
  legacy contracts.
- Browser tests verify computed styles, keyboard behavior, accessibility state,
  logical RTL behavior, overflow, and real native APIs.
- Test shared behavior with raw HTML plus the DOM manager. Do not repeat the full
  behavior matrix through every adapter.
- React tests cover SSR markup parity, controlled/uncontrolled synchronization,
  `asChild`, refs, and event composition.
- Astro tests are public-import build and browser smoke tests. They should verify
  DOM replacement when document-level managers are involved.
- Storybook documentation must include Contract, Install, Usage, Examples,
  Guidance, and API sections with Preview, HTML, and React source where relevant.
- Add the component to the Storybook browser audit when interaction or responsive
  layout is part of the contract.

Before handoff, run:

```bash
pnpm verify
```

For component documentation or visual changes, also run:

```bash
pnpm storybook:build
pnpm storybook:audit
```

## Review Checklist

Before accepting a component change, confirm:

- Is the canonical contract semantic HTML rather than framework syntax?
- Is shared behavior implemented exactly once?
- Can HTML and Astro use the component without React?
- Does the React adapter render the same DOM contract?
- Is module evaluation SSR-safe?
- Are consumer utility and style overrides preserved?
- Are package exports, copied CSS, Storybook, README, and smoke tests wired?
- Are tests concentrated at the owning layer instead of duplicated per adapter?

Exceptions require an explicit product or platform reason documented in the
change. Framework convenience alone is not sufficient.
