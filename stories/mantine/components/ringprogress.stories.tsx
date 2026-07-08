import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  value?: number;
  controlSize?: number;
  thickness?: number;
};

function RingProgressStory(controlValues: ComponentStoryProps) {
  const value = controlValues.value ?? 72;

  return (
    <Mantine.RingProgress
      label={
        <Mantine.Text ta="center" size="xs">
          {value}%
        </Mantine.Text>
      }
      sections={[{ value, color: controlValues.color ?? 'tinyrack' }]}
      size={controlValues.controlSize ?? 120}
      thickness={controlValues.thickness ?? 12}
    />
  );
}

RingProgressStory.displayName = 'RingProgressStory';

const meta = {
  title: 'Mantine/RingProgress',
  component: RingProgressStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    value: 72,
    controlSize: 120,
    thickness: 12,
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    value: Controls.rangeControl('Ring progress value.', { min: 0, max: 100, step: 5 }),
    controlSize: Controls.rangeControl('Ring size in pixels.', {
      min: 80,
      max: 180,
      step: 10,
    }),
    thickness: Controls.rangeControl('Ring thickness.', { min: 4, max: 24, step: 2 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core RingProgress themed preview',
      },
    },
  },
} satisfies Meta<typeof RingProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
