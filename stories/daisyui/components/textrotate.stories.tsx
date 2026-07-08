import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  word?: 'secure' | 'quiet' | 'local';
};

function TextrotateStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';

  return (
    <span className={Controls.cx('text-rotate text-2xl font-semibold', `text-${tone}`)}>
      {controlValues.word ?? 'secure'}
    </span>
  );
}

TextrotateStory.displayName = 'TextrotateStory';

const meta = {
  title: 'daisyUI/Textrotate',
  component: TextrotateStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    word: 'secure',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    word: Controls.selectControl(
      ['secure', 'quiet', 'local'],
      'Visible rotating word state.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI textrotate themed preview',
      },
    },
  },
} satisfies Meta<typeof TextrotateStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
