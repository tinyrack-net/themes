import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  value?: number;
  controlSize?: number;
};

function RadialprogressStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const value = controlValues.value ?? 68;
  const controlSize = controlValues.controlSize ?? 6;

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className={Controls.cx('radial-progress', `text-${tone}`)}
      role="progressbar"
      style={
        {
          '--value': value,
          '--size': `${String(controlSize)}rem`,
        } as React.CSSProperties
      }
    >
      {value}%
    </div>
  );
}

RadialprogressStory.displayName = 'RadialprogressStory';

const meta = {
  title: 'daisyUI/Radialprogress',
  component: RadialprogressStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    value: 68,
    controlSize: 6,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    value: Controls.rangeControl('Radial progress value custom property.', {
      min: 0,
      max: 100,
      step: 5,
    }),
    controlSize: Controls.rangeControl('Radial progress size in rem.', {
      min: 3,
      max: 10,
      step: 1,
    }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI radialprogress themed preview',
      },
    },
  },
} satisfies Meta<typeof RadialprogressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
