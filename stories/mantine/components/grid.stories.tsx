import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  grow?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end';
  align?: 'stretch' | 'center' | 'flex-start';
};

function GridStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Grid
      align={controlValues.align ?? 'stretch'}
      className="w-96"
      grow={controlValues.grow ?? false}
      gap={controlValues.gap ?? 'sm'}
      justify={controlValues.justify ?? 'flex-start'}
    >
      {[1, 2, 3].map((item) => (
        <Mantine.Grid.Col key={item} span={4}>
          <Mantine.Paper p="sm" withBorder>
            Col {item}
          </Mantine.Paper>
        </Mantine.Grid.Col>
      ))}
    </Mantine.Grid>
  );
}

GridStory.displayName = 'GridStory';

const meta = {
  title: 'Mantine/Grid',
  component: GridStory,
  tags: ['autodocs'],
  args: {
    gap: 'sm',
    grow: false,
    justify: 'flex-start',
    align: 'stretch',
  },
  argTypes: {
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    grow: Controls.booleanControl('Grid columns grow to fill remaining space.'),
    justify: Controls.selectControl(
      ['flex-start', 'center', 'flex-end'],
      'Grid justify-content value.',
    ),
    align: Controls.selectControl(
      ['stretch', 'center', 'flex-start'],
      'Grid align-items value.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Grid themed preview',
      },
    },
  },
} satisfies Meta<typeof GridStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
