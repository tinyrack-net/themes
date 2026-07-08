import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  checked?: boolean;
  disabled?: boolean;
};

function CheckboxStory(controlValues: ComponentStoryProps) {
  return (
    <label className="flex items-center gap-3">
      <input
        className={Controls.cx(
          'checkbox',
          `checkbox-${controlValues.tone ?? 'primary'}`,
          `checkbox-${controlValues.size ?? 'md'}`,
        )}
        checked={controlValues.checked ?? true}
        disabled={controlValues.disabled ?? false}
        readOnly
        type="checkbox"
      />
      <span>Enable backup alerts</span>
    </label>
  );
}

CheckboxStory.displayName = 'CheckboxStory';

const meta = {
  title: 'daisyUI/Checkbox',
  component: CheckboxStory,
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
        component: 'daisyUI checkbox themed preview',
      },
    },
  },
} satisfies Meta<typeof CheckboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
