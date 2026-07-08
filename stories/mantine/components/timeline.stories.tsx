import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  active?: number;
  align?: 'left' | 'right';
};

function TimelineStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Timeline
      active={controlValues.active ?? 1}
      align={controlValues.align ?? 'left'}
      color={controlValues.color ?? 'tinyrack'}
      radius={controlValues.radius ?? 'xl'}
    >
      <Mantine.Timeline.Item title="Deploy">Storybook deployed</Mantine.Timeline.Item>
      <Mantine.Timeline.Item title="Verify">Checks passed</Mantine.Timeline.Item>
      <Mantine.Timeline.Item title="Release">Ready</Mantine.Timeline.Item>
    </Mantine.Timeline>
  );
}

TimelineStory.displayName = 'TimelineStory';

const meta = {
  title: 'Mantine/Timeline',
  component: TimelineStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    radius: 'xl',
    active: 1,
    align: 'left',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    active: Controls.numberControl('Active timeline item index.', { min: 0, max: 2 }),
    align: Controls.selectControl(['left', 'right'], 'Timeline alignment.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Timeline themed preview',
      },
    },
  },
} satisfies Meta<typeof TimelineStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
