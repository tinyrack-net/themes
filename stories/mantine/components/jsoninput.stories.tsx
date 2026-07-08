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

function JsonInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.JsonInput
      autosize
      defaultValue={'{"host":"nas-01"}'}
      disabled={controlValues.disabled ?? false}
      error={(controlValues.error ?? false) ? 'JSON is invalid.' : undefined}
      label="JSON config"
      minRows={3}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    />
  );
}

JsonInputStory.displayName = 'JsonInputStory';

const meta = {
  title: 'Mantine/JsonInput',
  component: JsonInputStory,
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
        component: '@mantine/core JsonInput themed preview',
      },
    },
  },
} satisfies Meta<typeof JsonInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
