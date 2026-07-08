import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  inline?: 'start' | 'center' | 'end';
  block?: 'top' | 'middle' | 'bottom';
  tone?: (typeof Controls.daisyStateToneOptions)[number];
};

function ToastStory(controlValues: ComponentStoryProps) {
  const inline = controlValues.inline ?? 'end';
  const block = controlValues.block ?? 'top';
  const tone = controlValues.tone ?? 'info';

  return (
    <div className={Controls.cx('toast static', `toast-${inline}`, `toast-${block}`)}>
      <div className={Controls.cx('alert', `alert-${tone}`)}>Backup finished.</div>
    </div>
  );
}

ToastStory.displayName = 'ToastStory';

const meta = {
  title: 'daisyUI/Toast',
  component: ToastStory,
  tags: ['autodocs'],
  args: {
    inline: 'end',
    block: 'top',
    tone: 'info',
  },
  argTypes: {
    inline: Controls.selectControl(
      Controls.daisyInlinePlacementOptions,
      'Toast inline placement.',
    ),
    block: Controls.selectControl(
      Controls.daisyBlockPlacementOptions,
      'Toast block placement.',
    ),
    tone: Controls.selectControl(
      Controls.daisyStateToneOptions,
      'Status color modifier class.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI toast themed preview',
      },
    },
  },
} satisfies Meta<typeof ToastStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
