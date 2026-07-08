import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  block?: boolean;
};

function CodeStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Code
      block={controlValues.block ?? false}
      color={controlValues.color ?? 'tinyrack'}
    >
      pnpm verify
    </Mantine.Code>
  );
}

CodeStory.displayName = 'CodeStory';

const meta = {
  title: 'Mantine/Code',
  component: CodeStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    block: false,
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    block: Controls.booleanControl('Renders the code block layout.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Code themed preview',
      },
    },
  },
} satisfies Meta<typeof CodeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
