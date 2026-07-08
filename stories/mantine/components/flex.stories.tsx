import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  direction?: 'row' | 'column';
  wrap?: 'nowrap' | 'wrap';
};

function FlexStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Flex
      align={controlValues.align ?? 'center'}
      className="h-32 w-96 rounded-md border border-neutral-700 p-3"
      direction={controlValues.direction ?? 'row'}
      gap={controlValues.gap ?? 'sm'}
      justify={controlValues.justify ?? 'flex-start'}
      wrap={controlValues.wrap ?? 'wrap'}
    >
      <Mantine.Badge color="tinyrack">NAS</Mantine.Badge>
      <Mantine.Badge color="gray">Router</Mantine.Badge>
      <Mantine.Badge color="green">UPS</Mantine.Badge>
    </Mantine.Flex>
  );
}

FlexStory.displayName = 'FlexStory';

const meta = {
  title: 'Mantine/Flex',
  component: FlexStory,
  tags: ['autodocs'],
  args: {
    gap: 'sm',
    align: 'center',
    justify: 'flex-start',
    direction: 'row',
    wrap: 'wrap',
  },
  argTypes: {
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    align: Controls.selectControl(
      ['flex-start', 'center', 'flex-end', 'stretch'],
      'Flex align-items value.',
    ),
    justify: Controls.selectControl(
      ['flex-start', 'center', 'flex-end', 'space-between'],
      'Flex justify-content value.',
    ),
    direction: Controls.selectControl(['row', 'column'], 'Flex direction.'),
    wrap: Controls.selectControl(['nowrap', 'wrap'], 'Flex wrap value.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Flex themed preview',
      },
    },
  },
} satisfies Meta<typeof FlexStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
