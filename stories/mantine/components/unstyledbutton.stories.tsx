import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  padded?: boolean;
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
  disabled?: boolean;
};

function UnstyledButtonStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.UnstyledButton
      bg={controlValues.color ?? 'tinyrack'}
      c="white"
      className={(controlValues.padded ?? true) ? 'px-4 py-2' : undefined}
      disabled={controlValues.disabled ?? false}
      style={{
        borderRadius: `var(--mantine-radius-${controlValues.radius ?? 'md'})`,
      }}
    >
      Open console
    </Mantine.UnstyledButton>
  );
}

UnstyledButtonStory.displayName = 'UnstyledButtonStory';

const meta = {
  title: 'Mantine/UnstyledButton',
  component: UnstyledButtonStory,
  tags: ['autodocs'],
  args: {
    padded: true,
    radius: 'md',
    color: 'tinyrack',
    disabled: false,
  },
  argTypes: {
    padded: Controls.booleanControl('Applies padding to the unstyled button preview.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core UnstyledButton themed preview',
      },
    },
  },
} satisfies Meta<typeof UnstyledButtonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
