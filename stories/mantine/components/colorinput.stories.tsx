import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: (typeof Controls.mantineInputVariantOptions)[number];
  size?: (typeof Controls.mantineSizeOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  withPreview?: boolean;
  withEyeDropper?: boolean;
  disabled?: boolean;
};

function ColorInputStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.ColorInput
      defaultValue="#1762ae"
      disabled={controlValues.disabled ?? false}
      label="Accent color"
      radius={controlValues.radius ?? 'md'}
      size={controlValues.size ?? 'sm'}
      variant={controlValues.variant ?? 'default'}
      withEyeDropper={controlValues.withEyeDropper ?? true}
      withPreview={controlValues.withPreview ?? true}
      className="w-80"
    />
  );
}

ColorInputStory.displayName = 'ColorInputStory';

const meta = {
  title: 'Mantine/ColorInput',
  component: ColorInputStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'sm',
    radius: 'md',
    withPreview: true,
    withEyeDropper: true,
    disabled: false,
  },
  argTypes: {
    variant: Controls.selectControl(
      Controls.mantineInputVariantOptions,
      'Mantine input variant.',
    ),
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    withPreview: Controls.booleanControl('Shows the color preview swatch.'),
    withEyeDropper: Controls.booleanControl('Shows the eyedropper action.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core ColorInput themed preview',
      },
    },
  },
} satisfies Meta<typeof ColorInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
