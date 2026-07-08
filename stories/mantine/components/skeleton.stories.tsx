import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  visible?: boolean;
  height?: number;
};

function SkeletonStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Skeleton
      height={controlValues.height ?? 48}
      radius={controlValues.radius ?? 'md'}
      visible={controlValues.visible ?? true}
      width={280}
    />
  );
}

SkeletonStory.displayName = 'SkeletonStory';

const meta = {
  title: 'Mantine/Skeleton',
  component: SkeletonStory,
  tags: ['autodocs'],
  args: {
    radius: 'md',
    visible: true,
    height: 48,
  },
  argTypes: {
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    visible: Controls.booleanControl('Shows skeleton placeholder state.'),
    height: Controls.rangeControl('Skeleton height in pixels.', {
      min: 24,
      max: 96,
      step: 8,
    }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Skeleton themed preview',
      },
    },
  },
} satisfies Meta<typeof SkeletonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
