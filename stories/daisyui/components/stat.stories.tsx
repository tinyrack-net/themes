import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  tone?: (typeof Controls.daisyToneOptions)[number];
};

function StatStory(controlValues: ComponentStoryProps) {
  const orientation = controlValues.orientation ?? 'horizontal';
  const tone = controlValues.tone ?? 'primary';

  return (
    <div
      className={Controls.cx(
        'stats rounded-box bg-base-200 shadow',
        orientation === 'vertical' ? 'stats-vertical' : 'stats-horizontal',
      )}
    >
      <div className="stat">
        <div className={Controls.cx('stat-title', `text-${tone}`)}>Services</div>
        <div className="stat-value">12</div>
        <div className="stat-desc">all healthy</div>
      </div>
    </div>
  );
}

StatStory.displayName = 'StatStory';

const meta = {
  title: 'daisyUI/Stat',
  component: StatStory,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    tone: 'primary',
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Stats orientation class.',
    ),
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI stat themed preview',
      },
    },
  },
} satisfies Meta<typeof StatStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
