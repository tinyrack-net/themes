import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  swatchColor?: 'tinyrack' | 'blue' | 'green' | 'yellow' | 'red';
  controlSize?: number;
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  withShadow?: boolean;
};

function ColorSwatchStory(controlValues: ComponentStoryProps) {
  const colorMap = {
    tinyrack: '#1762ae',
    blue: '#228be6',
    green: '#2f9e44',
    yellow: '#f59f00',
    red: '#e03131',
  } as const;
  const swatchColor = controlValues.swatchColor ?? 'tinyrack';

  return (
    <Mantine.ColorSwatch
      color={colorMap[swatchColor]}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.controlSize ?? 40}
      withShadow={controlValues.withShadow ?? true}
    />
  );
}

ColorSwatchStory.displayName = 'ColorSwatchStory';

const meta = {
  title: 'Mantine/ColorSwatch',
  component: ColorSwatchStory,
  tags: ['autodocs'],
  args: {
    swatchColor: 'tinyrack',
    controlSize: 40,
    radius: 'xl',
    withShadow: true,
  },
  argTypes: {
    swatchColor: Controls.selectControl(
      ['tinyrack', 'blue', 'green', 'yellow', 'red'],
      'Displayed swatch color.',
    ),
    controlSize: Controls.rangeControl('Swatch size in pixels.', {
      min: 24,
      max: 80,
      step: 4,
    }),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    withShadow: Controls.booleanControl('Shows the ColorSwatch shadow.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core ColorSwatch themed preview',
      },
    },
  },
} satisfies Meta<typeof ColorSwatchStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
