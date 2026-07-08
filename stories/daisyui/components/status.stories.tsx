import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
};

function StatusStory(controlValues: ComponentStoryProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={Controls.cx(
          'status',
          `status-${controlValues.tone ?? 'primary'}`,
          `status-${controlValues.size ?? 'md'}`,
        )}
      />
      Healthy
    </span>
  );
}

StatusStory.displayName = 'StatusStory';

const meta = {
  title: 'daisyUI/Status',
  component: StatusStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    size: 'md',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI status themed preview',
      },
    },
  },
} satisfies Meta<typeof StatusStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
