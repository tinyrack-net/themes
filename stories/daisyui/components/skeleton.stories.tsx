import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  text?: boolean;
  rows?: number;
};

function SkeletonStory(controlValues: ComponentStoryProps) {
  const rows = controlValues.rows ?? 3;

  return (
    <div className="grid w-80 gap-3">
      {Array.from({ length: rows }, (_, index) => `skeleton-${index}`).map((row) => (
        <div
          className={Controls.cx(
            'skeleton',
            (controlValues.text ?? false) ? 'skeleton-text h-4' : 'h-8',
          )}
          key={row}
        />
      ))}
    </div>
  );
}

SkeletonStory.displayName = 'SkeletonStory';

const meta = {
  title: 'daisyUI/Skeleton',
  component: SkeletonStory,
  tags: ['autodocs'],
  args: {
    text: false,
    rows: 3,
  },
  argTypes: {
    text: Controls.booleanControl('Applies skeleton-text styling.'),
    rows: Controls.numberControl('Number of skeleton rows.', { min: 1, max: 5 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI skeleton themed preview',
      },
    },
  },
} satisfies Meta<typeof SkeletonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
