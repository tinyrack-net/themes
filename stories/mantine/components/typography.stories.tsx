import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  color?: 'default' | 'dimmed' | 'tinyrack';
};

function TypographyStory(controlValues: ComponentStoryProps) {
  const color = controlValues.color ?? 'default';

  return (
    <Mantine.Typography className="w-96">
      <h3 className={color === 'tinyrack' ? 'text-tinyrack-primary' : undefined}>
        Typography
      </h3>
      <p
        className={color === 'dimmed' ? 'text-dimmed' : undefined}
        style={{
          fontSize: `var(--mantine-font-size-${controlValues.size ?? 'sm'})`,
        }}
      >
        Document content preview for rack operations.
      </p>
    </Mantine.Typography>
  );
}

TypographyStory.displayName = 'TypographyStory';

const meta = {
  title: 'Mantine/Typography',
  component: TypographyStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    color: 'default',
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    color: Controls.selectControl(
      ['default', 'dimmed', 'tinyrack'],
      'Typography preview color treatment.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Typography themed preview',
      },
    },
  },
} satisfies Meta<typeof TypographyStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
