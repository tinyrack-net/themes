import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CodeSnippet,
  DocsCallout,
  DocsCard,
  DocsGrid,
  DocsPage,
  DocsSection,
  DocsTable,
  GuidanceList,
} from '../docs-components.js';

function MantinePage() {
  return (
    <DocsPage
      eyebrow="Adapters"
      title="Mantine"
      description="Use the Mantine adapter for application surfaces that need accessible primitives and Tinyrack defaults."
    >
      <DocsSection title="Provider contract">
        <DocsTable
          columns={['Need', 'Use', 'Important detail']}
          rows={[
            [
              'A Mantine-only app',
              'TinyrackMantineProvider',
              'Imports Mantine CSS plus Tinyrack Mantine CSS and defaults to dark color scheme.',
            ],
            [
              'An app with an existing MantineProvider',
              'tinyrackMantineTheme',
              'Pass the theme object into the existing provider and keep defaultColorScheme aligned.',
            ],
            [
              'An embedded or extension root',
              'cssVariablesSelector',
              'Scope Mantine variables to the host root so they do not leak into the page.',
            ],
          ]}
        />
      </DocsSection>

      <DocsGrid>
        <DocsCard title="Recommended app entry">
          <CodeSnippet>{`import { TinyrackMantineProvider } from '@tinyrack/themes/mantine';
import '@mantine/core/styles.css';
import '@tinyrack/themes/mantine.css';

<TinyrackMantineProvider>{children}</TinyrackMantineProvider>`}</CodeSnippet>
        </DocsCard>
        <DocsCard title="Existing provider">
          <CodeSnippet>{`import { MantineProvider } from '@mantine/core';
import { tinyrackMantineTheme } from '@tinyrack/themes/mantine';

<MantineProvider
  defaultColorScheme="dark"
  theme={tinyrackMantineTheme}
>
  {children}
</MantineProvider>`}</CodeSnippet>
        </DocsCard>
      </DocsGrid>

      <DocsGrid>
        <DocsCard title="Scoped variables">
          <CodeSnippet>{`<TinyrackMantineProvider cssVariablesSelector="#tiny-translate-root">
  <div id="tiny-translate-root">
    {children}
  </div>
</TinyrackMantineProvider>`}</CodeSnippet>
        </DocsCard>
        <DocsCard title="Guidance">
          <GuidanceList
            items={[
              'Keep forms compact and explicit; labels should explain the input contract.',
              'Use cards and alerts for operational context, not decorative panels.',
              'Match Storybook component pages before introducing per-product overrides.',
            ]}
          />
        </DocsCard>
      </DocsGrid>

      <DocsCallout title="Tailwind is not enough">
        Tailwind tokens do not theme Mantine components by themselves. Mantine component
        surfaces must be wrapped in TinyrackMantineProvider or an existing
        MantineProvider configured with tinyrackMantineTheme.
      </DocsCallout>
    </DocsPage>
  );
}

const meta = {
  title: 'Adapters/Mantine',
  component: MantinePage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MantinePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Guide: Story = {};
