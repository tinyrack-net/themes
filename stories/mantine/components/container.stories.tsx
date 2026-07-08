import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  fluid?: boolean;
};

function ContainerStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Container
      className="rounded-md border border-neutral-700 py-4 text-center"
      fluid={controlValues.fluid ?? false}
      size={controlValues.size ?? 'sm'}
    >
      Container width:{' '}
      {(controlValues.fluid ?? false) ? 'fluid' : (controlValues.size ?? 'sm')}
    </Mantine.Container>
  );
}

ContainerStory.displayName = 'ContainerStory';

const meta = {
  title: 'Mantine/Container',
  component: ContainerStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    fluid: false,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    fluid: Controls.booleanControl('Uses fluid full-width mode.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Container themed preview',
      },
    },
  },
} satisfies Meta<typeof ContainerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
