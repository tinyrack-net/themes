import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  type?: 'bars' | 'oval' | 'dots';
};

function LoaderStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Loader
      color={controlValues.color ?? 'tinyrack'}
      size={controlValues.size ?? 'md'}
      type={controlValues.type ?? 'oval'}
    />
  );
}

LoaderStory.displayName = 'LoaderStory';

const meta = {
  title: 'Mantine/Loader',
  component: LoaderStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'tinyrack',
    type: 'oval',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    type: Controls.selectControl(['bars', 'oval', 'dots'], 'Mantine loader type.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Loader themed preview',
      },
    },
  },
} satisfies Meta<typeof LoaderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
