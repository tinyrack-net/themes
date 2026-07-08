import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  disabled?: boolean;
};

function TagsInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.TagsInput
      data={['backup', 'network', 'storage']}
      defaultValue={['backup']}
      disabled={controlValues.disabled ?? false}
      label="Tags"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      className="w-80"
    />
  );
}

TagsInputStory.displayName = 'TagsInputStory';

const meta = {
  title: 'Mantine/TagsInput',
  component: TagsInputStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    disabled: false,
  },
  argTypes: {
    variant: Controls.selectControl(
      Controls.mantineInputVariantOptions,
      'Mantine input variant.',
    ),
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core TagsInput themed preview',
      },
    },
  },
} satisfies Meta<typeof TagsInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
