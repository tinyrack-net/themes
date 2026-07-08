import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  variant?: (typeof Controls.mantineButtonVariantOptions)[number];
};

function ThemeIconStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.ThemeIcon
      color={controlValues.color ?? 'tinyrack'}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'lg'}
      variant={controlValues.variant ?? 'filled'}
    >
      TR
    </Mantine.ThemeIcon>
  );
}

ThemeIconStory.displayName = 'ThemeIconStory';

const meta = {
  title: 'Mantine/ThemeIcon',
  component: ThemeIconStory,
  tags: ['autodocs'],
  args: {
    size: 'lg',
    color: 'tinyrack',
    radius: 'md',
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
        component: '@mantine/core ThemeIcon themed preview',
      },
    },
  },
} satisfies Meta<typeof ThemeIconStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
