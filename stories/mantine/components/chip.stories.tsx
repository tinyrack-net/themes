import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  checked?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outline';
};

function ChipStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Chip
      checked={controlValues.checked ?? true}
      color={controlValues.color ?? 'tinyrack'}
      disabled={controlValues.disabled ?? false}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'filled'}
    >
      Backup
    </Mantine.Chip>
  );
}

ChipStory.displayName = 'ChipStory';

const meta = {
  title: 'Mantine/Chip',
  component: ChipStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    size: 'sm',
    radius: 'md',
    checked: true,
    disabled: false,
    variant: 'filled',
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
    checked: Controls.booleanControl('Checked state.'),
    disabled: Controls.booleanControl('Disabled state.'),
    variant: Controls.selectControl(['filled', 'outline'], 'Chip variant.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Chip themed preview',
      },
    },
  },
} satisfies Meta<typeof ChipStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
