import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  visible?: boolean;
  color?: (typeof Controls.mantineColorOptions)[number];
  blur?: number;
};

function LoadingOverlayStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Box className="relative h-32 w-80 rounded-md border border-neutral-700 p-4">
      <Mantine.LoadingOverlay
        loaderProps={{ color: controlValues.color ?? 'tinyrack' }}
        overlayProps={{ blur: controlValues.blur ?? 2 }}
        visible={controlValues.visible ?? true}
      />
      <Mantine.Text size="sm">Refreshing rack metrics...</Mantine.Text>
    </Mantine.Box>
  );
}

LoadingOverlayStory.displayName = 'LoadingOverlayStory';

const meta = {
  title: 'Mantine/LoadingOverlay',
  component: LoadingOverlayStory,
  tags: ['autodocs'],
  args: {
    visible: true,
    color: 'tinyrack',
    blur: 2,
  },
  argTypes: {
    visible: Controls.booleanControl('Shows the loading overlay.'),
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    blur: Controls.rangeControl('Overlay blur radius.', { min: 0, max: 8, step: 1 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core LoadingOverlay themed preview',
      },
    },
  },
} satisfies Meta<typeof LoadingOverlayStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
