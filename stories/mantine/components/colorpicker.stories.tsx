import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  format?: 'hex' | 'rgba' | 'hsla';
  withPicker?: boolean;
  fullWidth?: boolean;
};

function ColorPickerStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.ColorPicker
      defaultValue="#1762ae"
      format={controlValues.format ?? 'hex'}
      fullWidth={controlValues.fullWidth ?? false}
      size={controlValues.size ?? 'sm'}
      withPicker={controlValues.withPicker ?? true}
      className="w-80"
    />
  );
}

ColorPickerStory.displayName = 'ColorPickerStory';

const meta = {
  title: 'Mantine/ColorPicker',
  component: ColorPickerStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    format: 'hex',
    withPicker: true,
    fullWidth: false,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    format: Controls.selectControl(['hex', 'rgba', 'hsla'], 'Color output format.'),
    withPicker: Controls.booleanControl('Shows the color area picker.'),
    fullWidth: Controls.booleanControl('Expands the picker to full width.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core ColorPicker themed preview',
      },
    },
  },
} satisfies Meta<typeof ColorPickerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
