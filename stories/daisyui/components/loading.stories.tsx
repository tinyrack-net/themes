import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  style?: (typeof Controls.daisyLoadingStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
};

function LoadingStory(controlValues: ComponentStoryProps) {
  const style = controlValues.style ?? 'spinner';
  const size = controlValues.size ?? 'md';

  return (
    <span className={Controls.cx('loading', `loading-${style}`, `loading-${size}`)} />
  );
}

LoadingStory.displayName = 'LoadingStory';

const meta = {
  title: 'daisyUI/Loading',
  component: LoadingStory,
  tags: ['autodocs'],
  args: {
    style: 'spinner',
    size: 'md',
  },
  argTypes: {
    style: Controls.selectControl(
      Controls.daisyLoadingStyleOptions,
      'Loading animation class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI loading themed preview',
      },
    },
  },
} satisfies Meta<typeof LoadingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
