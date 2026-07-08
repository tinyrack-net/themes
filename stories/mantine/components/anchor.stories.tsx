import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineTextVariantOptions)[number];
  underline?: 'always' | 'hover' | 'never';
  color?: (typeof Controls.mantineColorOptions)[number];
};

function AnchorStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Anchor
      c={controlValues.color ?? 'tinyrack'}
      href="#top"
      underline={controlValues.underline ?? 'hover'}
      variant={controlValues.variant ?? 'text'}
    >
      Open node details
    </Mantine.Anchor>
  );
}

AnchorStory.displayName = 'AnchorStory';

const meta = {
  title: 'Mantine/Anchor',
  component: AnchorStory,
  tags: ['autodocs'],
  args: {
    variant: 'text',
    underline: 'hover',
    color: 'tinyrack',
  },
  argTypes: {
    variant: Controls.selectControl(
      Controls.mantineTextVariantOptions,
      'Anchor text variant.',
    ),
    underline: Controls.selectControl(
      ['always', 'hover', 'never'],
      'Underline behavior.',
    ),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Anchor themed preview',
      },
    },
  },
} satisfies Meta<typeof AnchorStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
