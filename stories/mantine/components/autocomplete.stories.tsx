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

function AutocompleteStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Autocomplete
      data={['nas-01', 'router', 'ups']}
      defaultValue="nas-01"
      disabled={controlValues.disabled ?? false}
      error={(controlValues.error ?? false) ? 'Select a known node.' : undefined}
      label="Node"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    />
  );
}

AutocompleteStory.displayName = 'AutocompleteStory';

const meta = {
  title: 'Mantine/Autocomplete',
  component: AutocompleteStory,
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
        component: '@mantine/core Autocomplete themed preview',
      },
    },
  },
} satisfies Meta<typeof AutocompleteStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
