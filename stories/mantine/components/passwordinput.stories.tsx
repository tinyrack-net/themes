import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  visible?: boolean;
  disabled?: boolean;
  error?: boolean;
};

function PasswordInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.PasswordInput
      defaultValue="tinyrack-secret"
      disabled={controlValues.disabled ?? false}
      error={(controlValues.error ?? false) ? 'Secret is too short.' : undefined}
      label="API secret"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      visible={controlValues.visible ?? false}
      className="w-80"
    />
  );
}

PasswordInputStory.displayName = 'PasswordInputStory';

const meta = {
  title: 'Mantine/PasswordInput',
  component: PasswordInputStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    visible: false,
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
    visible: Controls.booleanControl('Shows the password value.'),
    disabled: Controls.booleanControl('Disabled state.'),
    error: Controls.booleanControl('Shows an error state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core PasswordInput themed preview',
      },
    },
  },
} satisfies Meta<typeof PasswordInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
