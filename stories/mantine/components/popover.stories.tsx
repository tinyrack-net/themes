import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  opened?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  shadow?: (typeof Controls.mantineShadowOptions)[number];
  withArrow?: boolean;
  withOverlay?: boolean;
};

function PopoverStory(controlValues: ComponentStoryProps) {
  const shadow = controlValues.shadow ?? 'md';

  return (
    <Mantine.Popover
      opened={controlValues.opened ?? true}
      position={controlValues.position ?? 'bottom'}
      radius={controlValues.radius ?? 'md'}
      withArrow={controlValues.withArrow ?? true}
      withOverlay={controlValues.withOverlay ?? false}
      withinPortal={false}
      {...(shadow === 'none' ? {} : { shadow })}
    >
      <Mantine.Popover.Target>
        <Mantine.Button color="tinyrack" size="xs">
          Status
        </Mantine.Button>
      </Mantine.Popover.Target>
      <Mantine.Popover.Dropdown>
        <Mantine.Text size="sm">All services healthy.</Mantine.Text>
      </Mantine.Popover.Dropdown>
    </Mantine.Popover>
  );
}

PopoverStory.displayName = 'PopoverStory';

const meta = {
  title: 'Mantine/Popover',
  component: PopoverStory,
  tags: ['autodocs'],
  args: {
    opened: true,
    position: 'bottom',
    radius: 'md',
    shadow: 'md',
    withArrow: true,
    withOverlay: false,
  },
  argTypes: {
    opened: Controls.booleanControl('Shows the popover dropdown.'),
    position: Controls.selectControl(
      ['top', 'bottom', 'left', 'right'],
      'Popover position.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    shadow: Controls.selectControl(
      Controls.mantineShadowOptions,
      'Mantine shadow token.',
    ),
    withArrow: Controls.booleanControl('Shows popover arrow.'),
    withOverlay: Controls.booleanControl('Shows popover overlay.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Popover themed preview',
      },
    },
  },
} satisfies Meta<typeof PopoverStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
