import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  wrap?: 'nowrap' | 'wrap';
  grow?: boolean;
};

function GroupStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Group
      align={controlValues.align ?? 'center'}
      className="w-96 rounded-md border border-neutral-700 p-3"
      gap={controlValues.gap ?? 'sm'}
      grow={controlValues.grow ?? false}
      justify={controlValues.justify ?? 'flex-start'}
      wrap={controlValues.wrap ?? 'wrap'}
    >
      <Mantine.Button size="xs">Apply</Mantine.Button>
      <Mantine.Button size="xs" variant="default">
        Cancel
      </Mantine.Button>
    </Mantine.Group>
  );
}

GroupStory.displayName = 'GroupStory';

const meta = {
  title: 'Mantine/Group',
  component: GroupStory,
  tags: ['autodocs'],
  args: {
    gap: 'sm',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap',
    grow: false,
  },
  argTypes: {
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    align: Controls.selectControl(
      ['flex-start', 'center', 'flex-end', 'stretch'],
      'Group align-items value.',
    ),
    justify: Controls.selectControl(
      ['flex-start', 'center', 'flex-end', 'space-between'],
      'Group justify-content value.',
    ),
    wrap: Controls.selectControl(['nowrap', 'wrap'], 'Group wrap value.'),
    grow: Controls.booleanControl('Child items grow evenly.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Group themed preview',
      },
    },
  },
} satisfies Meta<typeof GroupStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
