import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  disabled?: boolean;
};

function PillsInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.PillsInput
      disabled={controlValues.disabled ?? false}
      label="Selected nodes"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    >
      <Mantine.Pill.Group>
        <Mantine.Pill>nas-01</Mantine.Pill>
        <Mantine.PillsInput.Field placeholder="Add node" />
      </Mantine.Pill.Group>
    </Mantine.PillsInput>
  );
}

PillsInputStory.displayName = 'PillsInputStory';

const meta = {
  title: 'Mantine/PillsInput',
  component: PillsInputStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    disabled: false,
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
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core PillsInput themed preview',
      },
    },
  },
} satisfies Meta<typeof PillsInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
