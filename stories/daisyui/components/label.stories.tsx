import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'error';
};

function LabelStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'default';

  return (
    <label className="label w-80">
      <input className="sr-only" readOnly value="Service name" />
      <span
        className={Controls.cx(
          'label-text',
          tone === 'default' ? undefined : `text-${tone}`,
        )}
      >
        Service name
      </span>
      <span className="label-text-alt">required</span>
    </label>
  );
}

LabelStory.displayName = 'LabelStory';

const meta = {
  title: 'daisyUI/Label',
  component: LabelStory,
  tags: ['autodocs'],
  args: {
    tone: 'default',
  },
  argTypes: {
    tone: Controls.selectControl(
      ['default', 'primary', 'success', 'warning', 'error'],
      'Label text tone.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI label themed preview',
      },
    },
  },
} satisfies Meta<typeof LabelStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
