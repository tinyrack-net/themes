import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  hover?: boolean;
};

function LinkStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';

  return (
    <a
      className={Controls.cx(
        'link',
        `link-${tone}`,
        (controlValues.hover ?? false) ? 'link-hover' : undefined,
      )}
      href="#top"
    >
      Open node details
    </a>
  );
}

LinkStory.displayName = 'LinkStory';

const meta = {
  title: 'daisyUI/Link',
  component: LinkStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    hover: false,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    hover: Controls.booleanControl('Applies link-hover behavior.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI link themed preview',
      },
    },
  },
} satisfies Meta<typeof LinkStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
