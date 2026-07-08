import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  cols?: number;
  spacing?: (typeof Controls.mantineSpacingOptions)[number];
  verticalSpacing?: (typeof Controls.mantineSpacingOptions)[number];
};

function SimpleGridStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.SimpleGrid
      className="w-96"
      cols={controlValues.cols ?? 3}
      spacing={controlValues.spacing ?? 'sm'}
      verticalSpacing={controlValues.verticalSpacing ?? 'sm'}
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Mantine.Paper key={item} p="sm" withBorder>
          Node {item}
        </Mantine.Paper>
      ))}
    </Mantine.SimpleGrid>
  );
}

SimpleGridStory.displayName = 'SimpleGridStory';

const meta = {
  title: 'Mantine/SimpleGrid',
  component: SimpleGridStory,
  tags: ['autodocs'],
  args: {
    cols: 3,
    spacing: 'sm',
    verticalSpacing: 'sm',
  },
  argTypes: {
    cols: Controls.numberControl('Number of columns.', { min: 1, max: 4 }),
    spacing: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Column gap token.',
    ),
    verticalSpacing: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Row gap token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core SimpleGrid themed preview',
      },
    },
  },
} satisfies Meta<typeof SimpleGridStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
