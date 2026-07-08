import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  shape?: (typeof Controls.daisyMaskShapeOptions)[number];
  half?: 'none' | 'half-1' | 'half-2';
};

function MaskStory(controlValues: ComponentStoryProps) {
  const shape = controlValues.shape ?? 'squircle';
  const half = controlValues.half ?? 'none';

  return (
    <div
      className={Controls.cx(
        'mask h-28 w-28 bg-primary',
        `mask-${shape}`,
        half === 'none' ? undefined : `mask-${half}`,
      )}
    />
  );
}

MaskStory.displayName = 'MaskStory';

const meta = {
  title: 'daisyUI/Mask',
  component: MaskStory,
  tags: ['autodocs'],
  args: {
    shape: 'squircle',
    half: 'none',
  },
  argTypes: {
    shape: Controls.selectControl(Controls.daisyMaskShapeOptions, 'Mask shape class.'),
    half: Controls.selectControl(
      ['none', 'half-1', 'half-2'],
      'Mask half clipping class.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI mask themed preview',
      },
    },
  },
} satisfies Meta<typeof MaskStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
