import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  snap?: 'start' | 'center' | 'end';
};

function CarouselStory(controlValues: ComponentStoryProps) {
  const orientation = controlValues.orientation ?? 'horizontal';
  const snap = controlValues.snap ?? 'center';

  return (
    <div
      className={Controls.cx(
        'carousel w-80 rounded-box bg-base-200',
        `carousel-${orientation}`,
        orientation === 'horizontal' ? 'h-32' : 'h-56',
      )}
    >
      {['Router', 'NAS', 'UPS'].map((item) => (
        <div
          className={Controls.cx(
            'carousel-item w-full place-content-center',
            `carousel-${snap}`,
          )}
          key={item}
        >
          <div className="grid h-full w-full place-content-center bg-base-300 text-lg font-semibold">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

CarouselStory.displayName = 'CarouselStory';

const meta = {
  title: 'daisyUI/Carousel',
  component: CarouselStory,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    snap: 'center',
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Carousel direction class.',
    ),
    snap: Controls.selectControl(
      ['start', 'center', 'end'],
      'Carousel item snap alignment class.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI carousel themed preview',
      },
    },
  },
} satisfies Meta<typeof CarouselStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
