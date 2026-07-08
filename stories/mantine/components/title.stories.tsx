import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  order?: 1 | 2 | 3 | 4;
  size?: 'h1' | 'h2' | 'h3' | 'h4';
  color?: (typeof Controls.mantineColorOptions)[number];
};

function TitleStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Title
      c={controlValues.color ?? 'tinyrack'}
      order={controlValues.order ?? 3}
      size={controlValues.size ?? 'h3'}
    >
      Rack status
    </Mantine.Title>
  );
}

TitleStory.displayName = 'TitleStory';

const meta = {
  title: 'Mantine/Title',
  component: TitleStory,
  tags: ['autodocs'],
  args: {
    order: 3,
    size: 'h3',
    color: 'tinyrack',
  },
  argTypes: {
    order: Controls.numberControl('Semantic heading order.', { min: 1, max: 4 }),
    size: Controls.selectControl(['h1', 'h2', 'h3', 'h4'], 'Visual title size.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Title themed preview',
      },
    },
  },
} satisfies Meta<typeof TitleStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
