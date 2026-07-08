import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  withRemoveButton?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
};

function PillStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Pill
      disabled={controlValues.disabled ?? false}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      withRemoveButton={controlValues.withRemoveButton ?? true}
    >
      nas-01
    </Mantine.Pill>
  );
}

PillStory.displayName = 'PillStory';

const meta = {
  title: 'Mantine/Pill',
  component: PillStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    radius: 'md',
    withRemoveButton: true,
    disabled: false,
    variant: 'default',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    withRemoveButton: Controls.booleanControl('Shows remove button.'),
    disabled: Controls.booleanControl('Disabled state.'),
    variant: Controls.selectControl(['default', 'outline'], 'Pill variant.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Pill themed preview',
      },
    },
  },
} satisfies Meta<typeof PillStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
