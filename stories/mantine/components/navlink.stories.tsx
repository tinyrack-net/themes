import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  active?: boolean;
  opened?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'light' | 'subtle';
};

function NavLinkStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.NavLink
      active={controlValues.active ?? true}
      childrenOffset={20}
      color={controlValues.color ?? 'tinyrack'}
      disabled={controlValues.disabled ?? false}
      label="Services"
      opened={controlValues.opened ?? true}
      variant={controlValues.variant ?? 'filled'}
      className="w-80"
    >
      <Mantine.NavLink label="nas-01" active />
    </Mantine.NavLink>
  );
}

NavLinkStory.displayName = 'NavLinkStory';

const meta = {
  title: 'Mantine/NavLink',
  component: NavLinkStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    active: true,
    opened: true,
    disabled: false,
    variant: 'filled',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    active: Controls.booleanControl('Active state.'),
    opened: Controls.booleanControl('Expanded state.'),
    disabled: Controls.booleanControl('Disabled state.'),
    variant: Controls.selectControl(['filled', 'light', 'subtle'], 'NavLink variant.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core NavLink themed preview',
      },
    },
  },
} satisfies Meta<typeof NavLinkStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
