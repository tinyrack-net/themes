import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  variant?: (typeof Controls.mantineTextVariantOptions)[number];
  term?: 'rack' | 'backup' | 'local';
};

function HighlightStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Highlight
      color={controlValues.color ?? 'tinyrack'}
      highlight={controlValues.term ?? 'rack'}
      variant={controlValues.variant ?? 'text'}
    >
      Tinyrack keeps backup and local rack operations visible.
    </Mantine.Highlight>
  );
}

HighlightStory.displayName = 'HighlightStory';

const meta = {
  title: 'Mantine/Highlight',
  component: HighlightStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    variant: 'text',
    term: 'rack',
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    variant: Controls.selectControl(
      Controls.mantineTextVariantOptions,
      'Highlight text variant.',
    ),
    term: Controls.selectControl(['rack', 'backup', 'local'], 'Highlighted term.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Highlight themed preview',
      },
    },
  },
} satisfies Meta<typeof HighlightStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
