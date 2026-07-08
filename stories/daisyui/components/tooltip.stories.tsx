import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  placement?: (typeof Controls.daisyPlacementOptions)[number];
  open?: boolean;
};

function TooltipStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const placement = controlValues.placement ?? 'top';

  return (
    <div
      className={Controls.cx(
        'tooltip',
        `tooltip-${tone}`,
        `tooltip-${placement}`,
        (controlValues.open ?? true) ? 'tooltip-open' : undefined,
      )}
      data-tip="Node logs"
    >
      <button className="btn btn-primary" type="button">
        Hover
      </button>
    </div>
  );
}

TooltipStory.displayName = 'TooltipStory';

const meta = {
  title: 'daisyUI/Tooltip',
  component: TooltipStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    placement: 'top',
    open: true,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    placement: Controls.selectControl(
      Controls.daisyPlacementOptions,
      'Tooltip placement class.',
    ),
    open: Controls.booleanControl('Applies tooltip-open state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI tooltip themed preview',
      },
    },
  },
} satisfies Meta<typeof TooltipStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
