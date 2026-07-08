import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  variant?: (typeof Controls.mantineTextVariantOptions)[number];
  truncate?: 'none' | 'start' | 'end';
  lineClamp?: number;
};

function TextStory(controlValues: ComponentStoryProps) {
  const truncate = controlValues.truncate ?? 'none';
  const lineClamp = controlValues.lineClamp ?? 0;

  return (
    <Mantine.Text
      className="w-80"
      size={controlValues.size ?? 'md'}
      variant={controlValues.variant ?? 'text'}
      {...(lineClamp > 0 ? { lineClamp } : {})}
      {...(truncate === 'none' ? {} : { truncate })}
    >
      Tinyrack keeps homelab operations quiet, local, and recoverable.
    </Mantine.Text>
  );
}

TextStory.displayName = 'TextStory';

const meta = {
  title: 'Mantine/Text',
  component: TextStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    variant: 'text',
    truncate: 'none',
    lineClamp: 0,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    variant: Controls.selectControl(
      Controls.mantineTextVariantOptions,
      'Text variant.',
    ),
    truncate: Controls.selectControl(['none', 'start', 'end'], 'Text truncation mode.'),
    lineClamp: Controls.numberControl('Line clamp count. Zero disables clamping.', {
      min: 0,
      max: 3,
    }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Text themed preview',
      },
    },
  },
} satisfies Meta<typeof TextStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
