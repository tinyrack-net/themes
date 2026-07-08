import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  opened?: boolean;
  disabled?: boolean;
};

function BurgerStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Burger
      color={controlValues.color ?? 'tinyrack'}
      disabled={controlValues.disabled ?? false}
      opened={controlValues.opened ?? true}
      size={controlValues.size ?? 'sm'}
      aria-label="Toggle navigation"
    />
  );
}

BurgerStory.displayName = 'BurgerStory';

const meta = {
  title: 'Mantine/Burger',
  component: BurgerStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    color: 'tinyrack',
    opened: true,
    disabled: false,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    opened: Controls.booleanControl('Opened state.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Burger themed preview',
      },
    },
  },
} satisfies Meta<typeof BurgerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
