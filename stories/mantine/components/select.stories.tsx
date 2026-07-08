import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  disabled?: boolean;
  withCheckIcon?: boolean;
};

function SelectStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Select
      data={['tinyrack-dark', 'tinyrack-light']}
      defaultValue="tinyrack-dark"
      disabled={controlValues.disabled ?? false}
      label="Theme"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      withCheckIcon={controlValues.withCheckIcon ?? true}
      className="w-80"
    />
  );
}

SelectStory.displayName = 'SelectStory';

const meta = {
  title: 'Mantine/Select',
  component: SelectStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    disabled: false,
    withCheckIcon: true,
  },
  argTypes: {
    variant: Controls.selectControl(
      Controls.mantineInputVariantOptions,
      'Mantine input variant.',
    ),
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    disabled: Controls.booleanControl('Disabled state.'),
    withCheckIcon: Controls.booleanControl('Shows selected option check icon.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Select themed preview',
      },
    },
  },
} satisfies Meta<typeof SelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
