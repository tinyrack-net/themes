import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
};

function KbdStory(controlValues: ComponentStoryProps) {
  return <Mantine.Kbd size={controlValues.size ?? 'sm'}>Ctrl K</Mantine.Kbd>;
}

KbdStory.displayName = 'KbdStory';

const meta = {
  title: 'Mantine/Kbd',
  component: KbdStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Kbd themed preview',
      },
    },
  },
} satisfies Meta<typeof KbdStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
