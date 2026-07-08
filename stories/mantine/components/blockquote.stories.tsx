import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
};

function BlockquoteStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Blockquote
      cite="Tinyrack operator note"
      color={controlValues.color ?? 'tinyrack'}
      radius={controlValues.radius ?? 'md'}
    >
      Keep the rack quiet, local, and recoverable.
    </Mantine.Blockquote>
  );
}

BlockquoteStory.displayName = 'BlockquoteStory';

const meta = {
  title: 'Mantine/Blockquote',
  component: BlockquoteStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    radius: 'md',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Blockquote themed preview',
      },
    },
  },
} satisfies Meta<typeof BlockquoteStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
