import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  disabled?: boolean;
  error?: boolean;
};

function NativeSelectStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.NativeSelect
      data={['tinyrack-dark', 'tinyrack-light']}
      disabled={controlValues.disabled ?? false}
      error={(controlValues.error ?? false) ? 'Theme is unavailable.' : undefined}
      label="Theme"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    />
  );
}

NativeSelectStory.displayName = 'NativeSelectStory';

const meta = {
  title: 'Mantine/NativeSelect',
  component: NativeSelectStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    disabled: false,
    error: false,
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
    error: Controls.booleanControl('Shows an error state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core NativeSelect themed preview',
      },
    },
  },
} satisfies Meta<typeof NativeSelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
