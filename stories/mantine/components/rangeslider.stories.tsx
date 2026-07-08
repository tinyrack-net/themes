import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
};

function RangeSliderStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.RangeSlider
      className={controlValues.orientation === 'vertical' ? 'h-48' : 'w-80'}
      color={controlValues.color ?? 'tinyrack'}
      defaultValue={[20, 80]}
      orientation={controlValues.orientation ?? 'horizontal'}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.size ?? 'md'}
    />
  );
}

RangeSliderStory.displayName = 'RangeSliderStory';

const meta = {
  title: 'Mantine/RangeSlider',
  component: RangeSliderStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'md',
    radius: 'xl',
    orientation: 'horizontal',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    orientation: Controls.selectControl(
      Controls.mantineOrientationOptions,
      'Slider orientation.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core RangeSlider themed preview',
      },
    },
  },
} satisfies Meta<typeof RangeSliderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
