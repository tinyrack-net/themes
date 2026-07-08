import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  layout?: 'default' | 'alt';
  padding?: (typeof Controls.mantineSpacingOptions)[number];
  withBorder?: boolean;
};

function AppShellStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.AppShell
      className="h-64 w-96 overflow-hidden rounded-md border border-neutral-700"
      header={{ height: 44 }}
      layout={controlValues.layout ?? 'default'}
      navbar={{ width: 96, breakpoint: 'sm' }}
      padding={controlValues.padding ?? 'md'}
      withBorder={controlValues.withBorder ?? true}
    >
      <Mantine.AppShell.Header className="grid place-content-center">
        Header
      </Mantine.AppShell.Header>
      <Mantine.AppShell.Navbar className="grid place-content-center">
        Nav
      </Mantine.AppShell.Navbar>
      <Mantine.AppShell.Main>Main content</Mantine.AppShell.Main>
    </Mantine.AppShell>
  );
}

AppShellStory.displayName = 'AppShellStory';

const meta = {
  title: 'Mantine/AppShell',
  component: AppShellStory,
  tags: ['autodocs'],
  args: {
    layout: 'default',
    padding: 'md',
    withBorder: true,
  },
  argTypes: {
    layout: Controls.selectControl(['default', 'alt'], 'AppShell layout mode.'),
    padding: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Main content padding token.',
    ),
    withBorder: Controls.booleanControl('Shows AppShell borders.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core AppShell themed preview',
      },
    },
  },
} satisfies Meta<typeof AppShellStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
