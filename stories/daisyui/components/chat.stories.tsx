import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  side?: 'start' | 'end';
  tone?: (typeof Controls.daisyToneOptions)[number];
};

function ChatStory(controlValues: ComponentStoryProps) {
  const side = controlValues.side ?? 'start';
  const tone = controlValues.tone ?? 'primary';

  return (
    <div className={Controls.cx('chat', `chat-${side}`)}>
      <div className="chat-header">rack-agent</div>
      <div className={Controls.cx('chat-bubble', `chat-bubble-${tone}`)}>
        nas-01 backup finished.
      </div>
      <div className="chat-footer opacity-70">now</div>
    </div>
  );
}

ChatStory.displayName = 'ChatStory';

const meta = {
  title: 'daisyUI/Chat',
  component: ChatStory,
  tags: ['autodocs'],
  args: {
    side: 'start',
    tone: 'primary',
  },
  argTypes: {
    side: Controls.selectControl(['start', 'end'], 'Chat alignment class.'),
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI chat themed preview',
      },
    },
  },
} satisfies Meta<typeof ChatStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
