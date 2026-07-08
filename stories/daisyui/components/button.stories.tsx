import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  style?: (typeof Controls.daisyButtonStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  shape?: (typeof Controls.daisyButtonShapeOptions)[number];
  loading?: boolean;
  active?: boolean;
  disabled?: boolean;
};

function ButtonStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const style = controlValues.style ?? 'default';
  const size = controlValues.size ?? 'md';
  const shape = controlValues.shape ?? 'default';
  const loading = controlValues.loading ?? false;

  return (
    <button
      className={Controls.cx(
        'btn',
        `btn-${tone}`,
        Controls.optionalModifier('btn', style),
        `btn-${size}`,
        Controls.optionalModifier('btn', shape),
        (controlValues.active ?? false) ? 'btn-active' : undefined,
      )}
      disabled={controlValues.disabled ?? false}
      type="button"
    >
      {loading ? <span className="loading loading-spinner" /> : null}
      {shape === 'circle' || shape === 'square' ? 'TR' : 'Apply config'}
    </button>
  );
}

ButtonStory.displayName = 'ButtonStory';

const meta = {
  title: 'daisyUI/Button',
  component: ButtonStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    style: 'default',
    size: 'md',
    shape: 'default',
    loading: false,
    active: false,
    disabled: false,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    style: Controls.selectControl(
      Controls.daisyButtonStyleOptions,
      'Button treatment class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    shape: Controls.selectControl(
      Controls.daisyButtonShapeOptions,
      'Button shape or width class.',
    ),
    loading: Controls.booleanControl('Shows loading-spinner inside the button.'),
    active: Controls.booleanControl('Applies btn-active state.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI button themed preview',
      },
    },
  },
} satisfies Meta<typeof ButtonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
