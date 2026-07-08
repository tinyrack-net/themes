import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
  value?: number;
};

function SliderStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Slider
      className={controlValues.orientation === 'vertical' ? 'h-48' : 'w-80'}
      color={controlValues.color ?? 'tinyrack'}
      defaultValue={controlValues.value ?? 60}
      orientation={controlValues.orientation ?? 'horizontal'}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.size ?? 'md'}
    />
  );
}

SliderStory.displayName = 'SliderStory';

const meta = {
  title: 'Mantine/Slider',
  component: SliderStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'md',
    radius: 'xl',
    orientation: 'horizontal',
    value: 60,
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
    value: Controls.rangeControl('Slider value.', { min: 0, max: 100, step: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Slider themed preview',
      },
    },
  },
} satisfies Meta<typeof SliderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
