import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  vertical?: boolean;
  value?: number;
};

function RangeStory(controlValues: ComponentStoryProps) {
  return (
    <input
      aria-label="Range"
      className={Controls.cx(
        'range',
        `range-${controlValues.tone ?? 'primary'}`,
        `range-${controlValues.size ?? 'md'}`,
        (controlValues.vertical ?? false) ? 'range-vertical h-40' : 'w-80',
      )}
      max={100}
      min={0}
      readOnly
      type="range"
      value={controlValues.value ?? 60}
    />
  );
}

RangeStory.displayName = 'RangeStory';

const meta = {
  title: 'daisyUI/Range',
  component: RangeStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    size: 'md',
    vertical: false,
    value: 60,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    vertical: Controls.booleanControl('Applies range-vertical.'),
    value: Controls.rangeControl('Range value.', { min: 0, max: 100, step: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI range themed preview',
      },
    },
  },
} satisfies Meta<typeof RangeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
