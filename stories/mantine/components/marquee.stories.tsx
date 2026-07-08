import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  reverse?: boolean;
};

function MarqueeStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Marquee
      className="h-24 w-80 rounded-md border border-neutral-700"
      gap={controlValues.gap ?? 'sm'}
      orientation={controlValues.orientation ?? 'horizontal'}
      reverse={controlValues.reverse ?? false}
    >
      <Mantine.Badge color="tinyrack">nas-01</Mantine.Badge>
      <Mantine.Badge color="green">router</Mantine.Badge>
      <Mantine.Badge color="yellow">ups</Mantine.Badge>
    </Mantine.Marquee>
  );
}

MarqueeStory.displayName = 'MarqueeStory';

const meta = {
  title: 'Mantine/Marquee',
  component: MarqueeStory,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    gap: 'sm',
    reverse: false,
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.mantineOrientationOptions,
      'Marquee orientation.',
    ),
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    reverse: Controls.booleanControl('Reverses marquee direction.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Marquee themed preview',
      },
    },
  },
} satisfies Meta<typeof MarqueeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
