import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.daisySizeOptions)[number];
};

function KbdStory(controlValues: ComponentStoryProps) {
  return (
    <kbd className={Controls.cx('kbd', `kbd-${controlValues.size ?? 'md'}`)}>
      Ctrl K
    </kbd>
  );
}

KbdStory.displayName = 'KbdStory';

const meta = {
  title: 'daisyUI/Kbd',
  component: KbdStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
  },
  argTypes: {
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI kbd themed preview',
      },
    },
  },
} satisfies Meta<typeof KbdStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
