import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  padding?: (typeof Controls.mantineSpacingOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  color?: (typeof Controls.mantineColorOptions)[number];
};

function BoxStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Box
      bg={controlValues.color ?? 'tinyrack'}
      c="white"
      className="w-72 text-center"
      p={controlValues.padding ?? 'md'}
      style={{
        borderRadius: `var(--mantine-radius-${controlValues.radius ?? 'md'})`,
      }}
    >
      Token backed surface
    </Mantine.Box>
  );
}

BoxStory.displayName = 'BoxStory';

const meta = {
  title: 'Mantine/Box',
  component: BoxStory,
  tags: ['autodocs'],
  args: {
    padding: 'md',
    radius: 'md',
    color: 'tinyrack',
  },
  argTypes: {
    padding: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine padding token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Box themed preview',
      },
    },
  },
} satisfies Meta<typeof BoxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
