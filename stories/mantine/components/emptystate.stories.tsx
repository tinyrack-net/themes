import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  align?: 'left' | 'center' | 'right';
  variant?: 'none' | 'filled' | 'light';
  withIndicatorBackground?: boolean;
};

function EmptyStateStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.EmptyState
      align={controlValues.align ?? 'center'}
      color={controlValues.color ?? 'tinyrack'}
      size={controlValues.size ?? 'md'}
      {...((controlValues.variant ?? 'none') === 'none'
        ? {}
        : { variant: controlValues.variant as 'filled' | 'light' })}
      withIndicatorBackground={controlValues.withIndicatorBackground ?? true}
      className="w-96"
    >
      <Mantine.EmptyState.Indicator>TR</Mantine.EmptyState.Indicator>
      <Mantine.EmptyState.Title>No alerts</Mantine.EmptyState.Title>
      <Mantine.EmptyState.Description>
        Rack checks are clear for this view.
      </Mantine.EmptyState.Description>
    </Mantine.EmptyState>
  );
}

EmptyStateStory.displayName = 'EmptyStateStory';

const meta = {
  title: 'Mantine/EmptyState',
  component: EmptyStateStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'tinyrack',
    align: 'center',
    variant: 'none',
    withIndicatorBackground: true,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    align: Controls.selectControl(
      ['left', 'center', 'right'],
      'EmptyState text alignment.',
    ),
    variant: Controls.selectControl(
      ['none', 'filled', 'light'],
      'EmptyState visual variant.',
    ),
    withIndicatorBackground: Controls.booleanControl('Shows indicator background.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core EmptyState themed preview',
      },
    },
  },
} satisfies Meta<typeof EmptyStateStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
