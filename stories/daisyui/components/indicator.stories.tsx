import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  inline?: 'start' | 'center' | 'end';
  block?: 'top' | 'middle' | 'bottom';
};

function IndicatorStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const inline = controlValues.inline ?? 'end';
  const block = controlValues.block ?? 'top';

  return (
    <div className="indicator">
      <span
        className={Controls.cx(
          'indicator-item badge',
          `badge-${tone}`,
          `indicator-${inline}`,
          `indicator-${block}`,
        )}
      >
        3
      </span>
      <div className="grid h-24 w-32 place-content-center rounded-box bg-base-200">
        Alerts
      </div>
    </div>
  );
}

IndicatorStory.displayName = 'IndicatorStory';

const meta = {
  title: 'daisyUI/Indicator',
  component: IndicatorStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    inline: 'end',
    block: 'top',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    inline: Controls.selectControl(
      Controls.daisyInlinePlacementOptions,
      'Inline indicator placement.',
    ),
    block: Controls.selectControl(
      Controls.daisyBlockPlacementOptions,
      'Block indicator placement.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI indicator themed preview',
      },
    },
  },
} satisfies Meta<typeof IndicatorStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
