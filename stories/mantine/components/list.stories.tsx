import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  type?: 'ordered' | 'unordered';
  withPadding?: boolean;
  color?: (typeof Controls.mantineColorOptions)[number];
};

function ListStory(controlValues: ComponentStoryProps) {
  const color = controlValues.color ?? 'tinyrack';

  return (
    <Mantine.List
      c={color}
      size={controlValues.size ?? 'sm'}
      type={controlValues.type ?? 'unordered'}
      withPadding={controlValues.withPadding ?? true}
    >
      <Mantine.List.Item>Backup completed</Mantine.List.Item>
      <Mantine.List.Item>Router online</Mantine.List.Item>
      <Mantine.List.Item>UPS charged</Mantine.List.Item>
    </Mantine.List>
  );
}

ListStory.displayName = 'ListStory';

const meta = {
  title: 'Mantine/List',
  component: ListStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    type: 'unordered',
    withPadding: true,
    color: 'tinyrack',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    type: Controls.selectControl(['ordered', 'unordered'], 'List marker type.'),
    withPadding: Controls.booleanControl('Adds list padding.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core List themed preview',
      },
    },
  },
} satisfies Meta<typeof ListStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
