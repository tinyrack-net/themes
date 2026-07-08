import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  appearance?: (typeof Controls.daisyFieldStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  disabled?: boolean;
};

function SelectStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const appearance = controlValues.appearance ?? 'default';
  const size = controlValues.size ?? 'md';

  return (
    <select
      className={Controls.cx(
        'select w-80',
        `select-${tone}`,
        Controls.optionalModifier('select', appearance),
        `select-${size}`,
      )}
      defaultValue="theme"
      disabled={controlValues.disabled ?? false}
    >
      <option value="theme">Theme</option>
      <option value="tokens">Tokens</option>
    </select>
  );
}

SelectStory.displayName = 'SelectStory';

const meta = {
  title: 'daisyUI/Select',
  component: SelectStory,
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
      'Select appearance class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI select themed preview',
      },
    },
  },
} satisfies Meta<typeof SelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
