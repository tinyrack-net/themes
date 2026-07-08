import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  appearance?: (typeof Controls.daisyFieldStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  disabled?: boolean;
};

function FileinputStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const appearance = controlValues.appearance ?? 'default';
  const size = controlValues.size ?? 'md';

  return (
    <input
      aria-label="Upload config"
      className={Controls.cx(
        'file-input',
        `file-input-${tone}`,
        Controls.optionalModifier('file-input', appearance),
        `file-input-${size}`,
      )}
      disabled={controlValues.disabled ?? false}
      type="file"
    />
  );
}

FileinputStory.displayName = 'FileinputStory';

const meta = {
  title: 'daisyUI/Fileinput',
  component: FileinputStory,
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
      'File input appearance class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI fileinput themed preview',
      },
    },
  },
} satisfies Meta<typeof FileinputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
