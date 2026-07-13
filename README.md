# @tinyrack/ui

React-only Tinyrack UI components and design tokens for compact operational
interfaces.

## Install

```bash
pnpm add @tinyrack/ui react react-dom
```

React 19 or newer is required. Interactive components use Base UI internally for
accessible focus, keyboard, portal, positioning, and dismissal behavior.

## Use a component

Components are available only through suffix-free per-component subpaths. Import
the component CSS explicitly.

```tsx
import '@tinyrack/ui/core.css';
import '@tinyrack/ui/components/button.css';
import { Button } from '@tinyrack/ui/components/button';

export function DeployButton() {
  return <Button variant="primary">Deploy</Button>;
}
```

Compound components expose semantic parts from the same path.

```tsx
import '@tinyrack/ui/components/tabs.css';
import { Tabs } from '@tinyrack/ui/components/tabs';

export function Settings() {
  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="network">Network</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="general">General settings</Tabs.Panel>
      <Tabs.Panel value="network">Network settings</Tabs.Panel>
    </Tabs.Root>
  );
}
```

## Public paths

| Surface | Path |
| --- | --- |
| Component | `@tinyrack/ui/components/<component>` |
| Component CSS | `@tinyrack/ui/components/<component>.css` |
| Token metadata | `@tinyrack/ui/core` |
| Foundation CSS | `@tinyrack/ui/core.css` |
| React MDX map | `@tinyrack/ui/mdx` |
| React MDX CSS | `@tinyrack/ui/mdx.css` |

Supported component modules:

`accordion`, `alert`, `avatar`, `badge`, `button`, `card`, `code`,
`code-block`, `combobox`, `disclosure`, `divider`, `form`, `link`, `menu`,
`modal`, `pin-input`, `popover`, `progress`, `skeleton`, `spinner`, `table`,
`tabs`, `toast`, and `tooltip`.

There is no component root barrel, `/react` or `/dom` compatibility suffix,
public overlay manager, or Astro renderer.

## React MDX

```tsx
import { MDXProvider } from '@mdx-js/react';
import '@tinyrack/ui/mdx.css';
import { tinyrackMdxComponents } from '@tinyrack/ui/mdx';

<MDXProvider components={tinyrackMdxComponents}>
  <Content />
</MDXProvider>;
```

## Development

```bash
pnpm test:component
pnpm test:coverage
pnpm verify
pnpm storybook:build
pnpm storybook:audit
pnpm verify:release
pnpm pack --dry-run
```

Every component directory owns semantic implementation files, a composition-only
`index.tsx`, colocated CSS, and one React browser suite. See
`.agents/skills/tinyrack-component-development/SKILL.md` for the complete
contract.
