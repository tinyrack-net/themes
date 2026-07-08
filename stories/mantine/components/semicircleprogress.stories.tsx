import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  value?: number;
  controlSize?: number;
  orientation?: 'up' | 'down';
};

function SemiCircleProgressStory(controlValues: ComponentStoryProps) {
  const value = controlValues.value ?? 72;

  return (
    <Mantine.SemiCircleProgress
      filledSegmentColor={controlValues.color ?? 'tinyrack'}
      label={<Mantine.Text size="xs">{value}%</Mantine.Text>}
      orientation={controlValues.orientation ?? 'up'}
      size={controlValues.controlSize ?? 160}
      value={value}
    />
  );
}

SemiCircleProgressStory.displayName = 'SemiCircleProgressStory';

const meta = {
  title: 'Mantine/SemiCircleProgress',
  component: SemiCircleProgressStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    value: 72,
    controlSize: 160,
    orientation: 'up',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    value: Controls.rangeControl('Semi circle progress value.', {
      min: 0,
      max: 100,
      step: 5,
    }),
    controlSize: Controls.rangeControl('Semi circle size in pixels.', {
      min: 100,
      max: 240,
      step: 10,
    }),
    orientation: Controls.selectControl(['up', 'down'], 'Semi circle orientation.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core SemiCircleProgress themed preview',
      },
    },
  },
} satisfies Meta<typeof SemiCircleProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
