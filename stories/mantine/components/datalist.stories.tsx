import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  gap?: (typeof Controls.mantineSpacingOptions)[number];
  orientation?: (typeof Controls.mantineOrientationOptions)[number];
  withDivider?: boolean;
};

function DataListStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.DataList
      gap={controlValues.gap ?? 'sm'}
      orientation={controlValues.orientation ?? 'horizontal'}
      size={controlValues.size ?? 'sm'}
      withDivider={controlValues.withDivider ?? true}
      className="w-96"
    >
      <Mantine.DataList.Item>
        <Mantine.DataList.ItemLabel>Package</Mantine.DataList.ItemLabel>
        <Mantine.DataList.ItemValue>@tinyrack/themes</Mantine.DataList.ItemValue>
      </Mantine.DataList.Item>
      <Mantine.DataList.Item>
        <Mantine.DataList.ItemLabel>Status</Mantine.DataList.ItemLabel>
        <Mantine.DataList.ItemValue>Healthy</Mantine.DataList.ItemValue>
      </Mantine.DataList.Item>
    </Mantine.DataList>
  );
}

DataListStory.displayName = 'DataListStory';

const meta = {
  title: 'Mantine/DataList',
  component: DataListStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    gap: 'sm',
    orientation: 'horizontal',
    withDivider: true,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    gap: Controls.selectControl(
      Controls.mantineSpacingOptions,
      'Mantine spacing token.',
    ),
    orientation: Controls.selectControl(
      Controls.mantineOrientationOptions,
      'DataList orientation.',
    ),
    withDivider: Controls.booleanControl('Shows dividers between items.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core DataList themed preview',
      },
    },
  },
} satisfies Meta<typeof DataListStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
