import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  count?: number;
};

function StackStory(controlValues: ComponentStoryProps) {
  const count = controlValues.count ?? 3;

  return (
    <div className="stack">
      {Array.from({ length: count }, (_, index) => `layer-${index + 1}`).map(
        (layer) => (
          <div
            className="grid h-24 w-36 place-content-center rounded-box bg-base-200 shadow"
            key={layer}
          >
            {layer}
          </div>
        ),
      )}
    </div>
  );
}

StackStory.displayName = 'StackStory';

const meta = {
  title: 'daisyUI/Stack',
  component: StackStory,
  tags: ['autodocs'],
  args: {
    count: 3,
  },
  argTypes: {
    count: Controls.numberControl('Number of stacked cards.', { min: 2, max: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI stack themed preview',
      },
    },
  },
} satisfies Meta<typeof StackStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
