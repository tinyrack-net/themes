import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.daisySizeOptions)[number];
  value?: number;
  half?: boolean;
};

function RatingStory(controlValues: ComponentStoryProps) {
  const value = controlValues.value ?? 4;
  const size = controlValues.size ?? 'md';
  const half = controlValues.half ?? false;

  return (
    <div
      className={Controls.cx(
        'rating',
        `rating-${size}`,
        half ? 'rating-half' : undefined,
      )}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <input
          aria-label={`${String(item)} star`}
          checked={value === item}
          className="mask mask-star-2 bg-warning"
          key={item}
          name="rating-preview"
          readOnly
          type="radio"
        />
      ))}
    </div>
  );
}

RatingStory.displayName = 'RatingStory';

const meta = {
  title: 'daisyUI/Rating',
  component: RatingStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    value: 4,
    half: false,
  },
  argTypes: {
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    value: Controls.numberControl('Selected rating value.', { min: 1, max: 5 }),
    half: Controls.booleanControl('Applies rating-half class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI rating themed preview',
      },
    },
  },
} satisfies Meta<typeof RatingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
