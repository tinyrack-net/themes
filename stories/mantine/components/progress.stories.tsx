import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  value?: number;
  striped?: boolean;
  animated?: boolean;
};

function ProgressStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Progress
      animated={controlValues.animated ?? false}
      color={controlValues.color ?? 'tinyrack'}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.size ?? 'md'}
      striped={controlValues.striped ?? false}
      value={controlValues.value ?? 72}
      className="w-80"
    />
  );
}

ProgressStory.displayName = 'ProgressStory';

const meta = {
  title: 'Mantine/Progress',
  component: ProgressStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'md',
    radius: 'xl',
    value: 72,
    striped: false,
    animated: false,
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
    value: Controls.rangeControl('Progress value.', { min: 0, max: 100, step: 5 }),
    striped: Controls.booleanControl('Shows striped progress fill.'),
    animated: Controls.booleanControl('Animates striped progress fill.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Progress themed preview',
      },
    },
  },
} satisfies Meta<typeof ProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
