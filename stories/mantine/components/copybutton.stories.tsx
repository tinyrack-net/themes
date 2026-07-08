import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  variant?: (typeof Controls.mantineButtonVariantOptions)[number];
  copied?: boolean;
};

function CopyButtonStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.CopyButton value="tinyrack.local">
      {({ copy }) => (
        <Mantine.Button
          color={
            (controlValues.copied ?? false)
              ? 'green'
              : (controlValues.color ?? 'tinyrack')
          }
          onClick={copy}
          size="xs"
          variant={controlValues.variant ?? 'filled'}
        >
          {(controlValues.copied ?? false) ? 'Copied' : 'Copy host'}
        </Mantine.Button>
      )}
    </Mantine.CopyButton>
  );
}

CopyButtonStory.displayName = 'CopyButtonStory';

const meta = {
  title: 'Mantine/CopyButton',
  component: CopyButtonStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    variant: 'filled',
    copied: false,
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    variant: Controls.selectControl(
      Controls.mantineButtonVariantOptions,
      'Mantine visual variant.',
    ),
    copied: Controls.booleanControl('Shows copied visual state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core CopyButton themed preview',
      },
    },
  },
} satisfies Meta<typeof CopyButtonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
