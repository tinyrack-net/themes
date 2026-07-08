import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  effect?: (typeof Controls.daisySwapEffectOptions)[number];
  active?: boolean;
};

function SwapStory(controlValues: ComponentStoryProps) {
  const effect = controlValues.effect ?? 'rotate';

  return (
    <label
      className={Controls.cx(
        'swap text-3xl',
        `swap-${effect}`,
        (controlValues.active ?? true) ? 'swap-active' : undefined,
      )}
    >
      <input checked={controlValues.active ?? true} readOnly type="checkbox" />
      <span className="swap-on">ON</span>
      <span className="swap-off">OFF</span>
    </label>
  );
}

SwapStory.displayName = 'SwapStory';

const meta = {
  title: 'daisyUI/Swap',
  component: SwapStory,
  tags: ['autodocs'],
  args: {
    effect: 'rotate',
    active: true,
  },
  argTypes: {
    effect: Controls.selectControl(
      Controls.daisySwapEffectOptions,
      'Swap animation class.',
    ),
    active: Controls.booleanControl('Applies swap-active state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI swap themed preview',
      },
    },
  },
} satisfies Meta<typeof SwapStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
