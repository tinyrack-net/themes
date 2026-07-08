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

function TextareaStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Textarea
      autosize
      defaultValue="Restart services after backup."
      disabled={controlValues.disabled ?? false}
      error={(controlValues.error ?? false) ? 'Add an operator note.' : undefined}
      label="Runbook note"
      minRows={3}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    />
  );
}

TextareaStory.displayName = 'TextareaStory';

const meta = {
  title: 'Mantine/Textarea',
  component: TextareaStory,
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
        component: '@mantine/core Textarea themed preview',
      },
    },
  },
} satisfies Meta<typeof TextareaStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
