import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  checked?: boolean;
  disabled?: boolean;
};

function ToggleStory(controlValues: ComponentStoryProps) {
  return (
    <input
      aria-label="Toggle"
      checked={controlValues.checked ?? true}
      className={Controls.cx(
        'toggle',
        `toggle-${controlValues.tone ?? 'primary'}`,
        `toggle-${controlValues.size ?? 'md'}`,
      )}
      disabled={controlValues.disabled ?? false}
      readOnly
      type="checkbox"
    />
  );
}

ToggleStory.displayName = 'ToggleStory';

const meta = {
  title: 'daisyUI/Toggle',
  component: ToggleStory,
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
        component: 'daisyUI toggle themed preview',
      },
    },
  },
} satisfies Meta<typeof ToggleStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
