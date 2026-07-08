import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  appearance?: (typeof Controls.daisyFieldStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  disabled?: boolean;
};

function TextareaStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const appearance = controlValues.appearance ?? 'default';
  const size = controlValues.size ?? 'md';

  return (
    <textarea
      className={Controls.cx(
        'textarea w-80',
        `textarea-${tone}`,
        Controls.optionalModifier('textarea', appearance),
        `textarea-${size}`,
      )}
      disabled={controlValues.disabled ?? false}
      defaultValue="Restart service after backup."
    />
  );
}

TextareaStory.displayName = 'TextareaStory';

const meta = {
  title: 'daisyUI/Textarea',
  component: TextareaStory,
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
      'Textarea appearance class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI textarea themed preview',
      },
    },
  },
} satisfies Meta<typeof TextareaStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
