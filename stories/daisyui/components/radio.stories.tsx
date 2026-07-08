import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  checked?: boolean;
  disabled?: boolean;
};

function RadioStory(controlValues: ComponentStoryProps) {
  return (
    <input
      aria-label="Radio"
      checked={controlValues.checked ?? true}
      className={Controls.cx(
        'radio',
        `radio-${controlValues.tone ?? 'primary'}`,
        `radio-${controlValues.size ?? 'md'}`,
      )}
      disabled={controlValues.disabled ?? false}
      readOnly
      type="radio"
    />
  );
}

RadioStory.displayName = 'RadioStory';

const meta = {
  title: 'daisyUI/Radio',
  component: RadioStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    size: 'md',
    checked: true,
    disabled: false,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    checked: Controls.booleanControl('Checked state.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI radio themed preview',
      },
    },
  },
} satisfies Meta<typeof RadioStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
