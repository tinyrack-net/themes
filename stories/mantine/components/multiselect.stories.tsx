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

function MultiSelectStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.MultiSelect
      data={['backup', 'network', 'storage']}
      defaultValue={['backup']}
      disabled={controlValues.disabled ?? false}
      label="Tags"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      withCheckIcon={controlValues.withCheckIcon ?? true}
      className="w-80"
    />
  );
}

MultiSelectStory.displayName = 'MultiSelectStory';

const meta = {
  title: 'Mantine/MultiSelect',
  component: MultiSelectStory,
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
    withCheckIcon: Controls.booleanControl('Shows check icons in options.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core MultiSelect themed preview',
      },
    },
  },
} satisfies Meta<typeof MultiSelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
