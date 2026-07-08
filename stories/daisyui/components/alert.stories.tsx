import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyStateToneOptions)[number];
  style?: (typeof Controls.daisyAlertStyleOptions)[number];
  layout?: (typeof Controls.daisyOrientationOptions)[number];
};

function AlertStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'info';
  const style = controlValues.style ?? 'default';
  const layout = controlValues.layout ?? 'horizontal';

  return (
    <div
      role="alert"
      className={Controls.cx(
        'alert',
        `alert-${tone}`,
        Controls.optionalModifier('alert', style),
        `alert-${layout}`,
      )}
    >
      <span>{tone} rack alert: backup-sync needs review.</span>
    </div>
  );
}

AlertStory.displayName = 'AlertStory';

const meta = {
  title: 'daisyUI/Alert',
  component: AlertStory,
  tags: ['autodocs'],
  args: {
    tone: 'info',
    style: 'default',
    layout: 'horizontal',
  },
  argTypes: {
    tone: Controls.selectControl(
      Controls.daisyStateToneOptions,
      'Status color modifier class.',
    ),
    style: Controls.selectControl(
      Controls.daisyAlertStyleOptions,
      'Alert treatment class.',
    ),
    layout: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Alert layout class.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI alert themed preview',
      },
    },
  },
} satisfies Meta<typeof AlertStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
