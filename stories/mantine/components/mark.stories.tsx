import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
};

function MarkStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Text>
      <Mantine.Mark color={controlValues.color ?? 'tinyrack'}>Local-first</Mantine.Mark>{' '}
      rack operations.
    </Mantine.Text>
  );
}

MarkStory.displayName = 'MarkStory';

const meta = {
  title: 'Mantine/Mark',
  component: MarkStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Mark themed preview',
      },
    },
  },
} satisfies Meta<typeof MarkStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
