import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  variant?: (typeof Controls.mantineButtonVariantOptions)[number];
};

function AvatarStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Avatar
      color={controlValues.color ?? 'tinyrack'}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.size ?? 'md'}
      variant={controlValues.variant ?? 'filled'}
    >
      TR
    </Mantine.Avatar>
  );
}

AvatarStory.displayName = 'AvatarStory';

const meta = {
  title: 'Mantine/Avatar',
  component: AvatarStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    color: 'tinyrack',
    radius: 'xl',
    variant: 'filled',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    variant: Controls.selectControl(
      Controls.mantineButtonVariantOptions,
      'Mantine visual variant.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Avatar themed preview',
      },
    },
  },
} satisfies Meta<typeof AvatarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
