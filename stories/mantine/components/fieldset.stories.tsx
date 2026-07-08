import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  variant?: 'default' | 'filled' | 'unstyled';
  disabled?: boolean;
};

function FieldsetStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Fieldset
      disabled={controlValues.disabled ?? false}
      legend="Node access"
      radius={controlValues.radius ?? 'md'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    >
      <Mantine.TextInput label="Hostname" defaultValue="nas-01" size="xs" />
    </Mantine.Fieldset>
  );
}

FieldsetStory.displayName = 'FieldsetStory';

const meta = {
  title: 'Mantine/Fieldset',
  component: FieldsetStory,
  tags: ['autodocs'],
  args: {
    radius: 'md',
    variant: 'default',
    disabled: false,
  },
  argTypes: {
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    variant: Controls.selectControl(
      ['default', 'filled', 'unstyled'],
      'Fieldset variant.',
    ),
    disabled: Controls.booleanControl('Disabled fieldset state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Fieldset themed preview',
      },
    },
  },
} satisfies Meta<typeof FieldsetStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
