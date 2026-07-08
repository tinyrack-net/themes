import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  appearance?: (typeof Controls.daisyFieldStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  disabled?: boolean;
};

function InputStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const appearance = controlValues.appearance ?? 'default';
  const size = controlValues.size ?? 'md';

  return (
    <label className="grid w-80 gap-2">
      <span className="label-text">Local domain</span>
      <input
        className={Controls.cx(
          'input w-full',
          `input-${tone}`,
          Controls.optionalModifier('input', appearance),
          `input-${size}`,
        )}
        disabled={controlValues.disabled ?? false}
        placeholder="rack.local"
      />
    </label>
  );
}

InputStory.displayName = 'InputStory';

const meta = {
  title: 'daisyUI/Input',
  component: InputStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    appearance: 'default',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    appearance: Controls.selectControl(
      Controls.daisyFieldStyleOptions,
      'Input appearance class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI input themed preview',
      },
    },
  },
} satisfies Meta<typeof InputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
