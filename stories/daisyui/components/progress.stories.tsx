import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  value?: number;
};

function ProgressStory(controlValues: ComponentStoryProps) {
  return (
    <progress
      className={Controls.cx(
        'progress w-80',
        `progress-${controlValues.tone ?? 'primary'}`,
      )}
      max={100}
      value={controlValues.value ?? 72}
    />
  );
}

ProgressStory.displayName = 'ProgressStory';

const meta = {
  title: 'daisyUI/Progress',
  component: ProgressStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    value: 72,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    value: Controls.rangeControl('Progress value.', { min: 0, max: 100, step: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI progress themed preview',
      },
    },
  },
} satisfies Meta<typeof ProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
