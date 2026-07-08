import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
};

function StackStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Stack
      align={controlValues.align ?? 'stretch'}
      className="h-48 w-80 rounded-md border border-neutral-700 p-3"
      gap={controlValues.gap ?? 'sm'}
      justify={controlValues.justify ?? 'flex-start'}
    >
      <Mantine.Button size="xs">Apply</Mantine.Button>
      <Mantine.Button size="xs" variant="default">
        Cancel
      </Mantine.Button>
    </Mantine.Stack>
  );
}

StackStory.displayName = 'StackStory';

const meta = {
  title: 'Mantine/Stack',
  component: StackStory,
  tags: ['autodocs'],
  args: {
    gap: 'sm',
    align: 'stretch',
    justify: 'flex-start',
  },
  argTypes: {
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    align: Controls.selectControl(
      ['stretch', 'center', 'flex-start', 'flex-end'],
      'Stack align-items value.',
    ),
    justify: Controls.selectControl(
      ['flex-start', 'center', 'flex-end', 'space-between'],
      'Stack justify-content value.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Stack themed preview',
      },
    },
  },
} satisfies Meta<typeof StackStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
