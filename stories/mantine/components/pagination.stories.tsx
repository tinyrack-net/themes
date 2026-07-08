import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  total?: number;
  value?: number;
  withEdges?: boolean;
  withControls?: boolean;
};

function PaginationStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Pagination
      gap={controlValues.gap ?? 'xs'}
      total={controlValues.total ?? 8}
      value={controlValues.value ?? 3}
      withControls={controlValues.withControls ?? true}
      withEdges={controlValues.withEdges ?? true}
    />
  );
}

PaginationStory.displayName = 'PaginationStory';

const meta = {
  title: 'Mantine/Pagination',
  component: PaginationStory,
  tags: ['autodocs'],
  args: {
    gap: 'xs',
    total: 8,
    value: 3,
    withEdges: true,
    withControls: true,
  },
  argTypes: {
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    total: Controls.numberControl('Total pages.', { min: 3, max: 12 }),
    value: Controls.numberControl('Current page.', { min: 1, max: 12 }),
    withEdges: Controls.booleanControl('Shows first and last controls.'),
    withControls: Controls.booleanControl('Shows previous and next controls.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Pagination themed preview',
      },
    },
  },
} satisfies Meta<typeof PaginationStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
