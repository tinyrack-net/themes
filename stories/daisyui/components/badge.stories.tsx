import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  style?: 'default' | 'outline' | 'dash' | 'soft' | 'ghost';
  size?: (typeof Controls.daisySizeOptions)[number];
};

function BadgeStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const style = controlValues.style ?? 'default';
  const size = controlValues.size ?? 'md';

  return (
    <span
      className={Controls.cx(
        'badge',
        `badge-${tone}`,
        Controls.optionalModifier('badge', style),
        `badge-${size}`,
      )}
    >
      Healthy
    </span>
  );
}

BadgeStory.displayName = 'BadgeStory';

const meta = {
  title: 'daisyUI/Badge',
  component: BadgeStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    style: 'default',
    size: 'md',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    style: Controls.selectControl(
      ['default', 'outline', 'dash', 'soft', 'ghost'],
      'Badge treatment class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI badge themed preview',
      },
    },
  },
} satisfies Meta<typeof BadgeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
