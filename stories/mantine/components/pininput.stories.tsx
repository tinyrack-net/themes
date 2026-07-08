import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  disabled?: boolean;
  type?: 'alphanumeric' | 'number';
  length?: number;
};

function PinInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.PinInput
      defaultValue="1234"
      disabled={controlValues.disabled ?? false}
      length={controlValues.length ?? 4}
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      type={controlValues.type ?? 'number'}
    />
  );
}

PinInputStory.displayName = 'PinInputStory';

const meta = {
  title: 'Mantine/PinInput',
  component: PinInputStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    radius: 'md',
    disabled: false,
    type: 'number',
    length: 4,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    disabled: Controls.booleanControl('Disabled state.'),
    type: Controls.selectControl(['alphanumeric', 'number'], 'Pin input type.'),
    length: Controls.numberControl('Number of input cells.', { min: 3, max: 6 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core PinInput themed preview',
      },
    },
  },
} satisfies Meta<typeof PinInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
