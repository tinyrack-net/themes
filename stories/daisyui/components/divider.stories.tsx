import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  placement?: 'default' | 'start' | 'end';
};

function DividerStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const orientation = controlValues.orientation ?? 'horizontal';
  const placement = controlValues.placement ?? 'default';

  return (
    <div className={orientation === 'vertical' ? 'flex h-40' : 'w-80'}>
      <div
        className={Controls.cx(
          'divider',
          `divider-${tone}`,
          `divider-${orientation}`,
          Controls.optionalModifier('divider', placement),
        )}
      >
        rack
      </div>
    </div>
  );
}

DividerStory.displayName = 'DividerStory';

const meta = {
  title: 'daisyUI/Divider',
  component: DividerStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    orientation: 'horizontal',
    placement: 'default',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Divider orientation class.',
    ),
    placement: Controls.selectControl(
      ['default', 'start', 'end'],
      'Divider content placement class.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI divider themed preview',
      },
    },
  },
} satisfies Meta<typeof DividerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
