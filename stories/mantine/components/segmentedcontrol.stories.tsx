import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
  disabled?: boolean;
  withItemsBorders?: boolean;
};

function SegmentedControlStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.SegmentedControl
      color={controlValues.color ?? 'tinyrack'}
      data={['Status', 'Logs', 'Settings']}
      disabled={controlValues.disabled ?? false}
      orientation={controlValues.orientation ?? 'horizontal'}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      withItemsBorders={controlValues.withItemsBorders ?? true}
    />
  );
}

SegmentedControlStory.displayName = 'SegmentedControlStory';

const meta = {
  title: 'Mantine/SegmentedControl',
  component: SegmentedControlStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'sm',
    radius: 'md',
    orientation: 'horizontal',
    disabled: false,
    withItemsBorders: true,
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
      'SegmentedControl orientation.',
    ),
    disabled: Controls.booleanControl('Disabled state.'),
    withItemsBorders: Controls.booleanControl('Shows item borders.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core SegmentedControl themed preview',
      },
    },
  },
} satisfies Meta<typeof SegmentedControlStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
