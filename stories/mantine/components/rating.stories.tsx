import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  value?: number;
};

function RatingStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Rating
      color={controlValues.color ?? 'tinyrack'}
      defaultValue={controlValues.value ?? 4}
      size={controlValues.size ?? 'md'}
    />
  );
}

RatingStory.displayName = 'RatingStory';

const meta = {
  title: 'Mantine/Rating',
  component: RatingStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'tinyrack',
    value: 4,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    value: Controls.numberControl('Rating value.', { min: 0, max: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Rating themed preview',
      },
    },
  },
} satisfies Meta<typeof RatingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
