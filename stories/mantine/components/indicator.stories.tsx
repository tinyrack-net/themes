import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  controlSize?: number;
  position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  withBorder?: boolean;
  disabled?: boolean;
};

function IndicatorStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Indicator
      color={controlValues.color ?? 'tinyrack'}
      disabled={controlValues.disabled ?? false}
      position={controlValues.position ?? 'top-end'}
      radius={controlValues.radius ?? 'xl'}
      size={controlValues.controlSize ?? 12}
      withBorder={controlValues.withBorder ?? true}
    >
      <Mantine.Avatar radius="md">TR</Mantine.Avatar>
    </Mantine.Indicator>
  );
}

IndicatorStory.displayName = 'IndicatorStory';

const meta = {
  title: 'Mantine/Indicator',
  component: IndicatorStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    radius: 'xl',
    controlSize: 12,
    position: 'top-end',
    withBorder: true,
    disabled: false,
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    controlSize: Controls.rangeControl('Indicator size in pixels.', {
      min: 6,
      max: 24,
      step: 2,
    }),
    position: Controls.selectControl(
      ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      'Indicator position.',
    ),
    withBorder: Controls.booleanControl('Shows the contrast border.'),
    disabled: Controls.booleanControl('Hides the indicator.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Indicator themed preview',
      },
    },
  },
} satisfies Meta<typeof IndicatorStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
