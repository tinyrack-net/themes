import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
  variant?: 'solid' | 'dashed' | 'dotted';
  labelPosition?: 'left' | 'center' | 'right';
};

function DividerStory(controlValues: ComponentStoryProps) {
  return (
    <div className={controlValues.orientation === 'vertical' ? 'flex h-40' : 'w-80'}>
      <Mantine.Divider
        color={controlValues.color ?? 'tinyrack'}
        label="rack"
        labelPosition={controlValues.labelPosition ?? 'center'}
        orientation={controlValues.orientation ?? 'horizontal'}
        size={controlValues.size ?? 'sm'}
        variant={controlValues.variant ?? 'solid'}
      />
    </div>
  );
}

DividerStory.displayName = 'DividerStory';

const meta = {
  title: 'Mantine/Divider',
  component: DividerStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'sm',
    orientation: 'horizontal',
    variant: 'solid',
    labelPosition: 'center',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    orientation: Controls.selectControl(
      Controls.mantineOrientationOptions,
      'Divider orientation.',
    ),
    variant: Controls.selectControl(
      ['solid', 'dashed', 'dotted'],
      'Divider line variant.',
    ),
    labelPosition: Controls.selectControl(
      ['left', 'center', 'right'],
      'Divider label position.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Divider themed preview',
      },
    },
  },
} satisfies Meta<typeof DividerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
