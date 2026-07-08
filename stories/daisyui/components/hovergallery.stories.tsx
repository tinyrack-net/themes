import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  active?: 'one' | 'two' | 'three';
};

function HovergalleryStory(controlValues: ComponentStoryProps) {
  const active = controlValues.active ?? 'two';

  return (
    <div className="hovergallery flex w-96 gap-2">
      {['one', 'two', 'three'].map((item) => (
        <div
          className={Controls.cx(
            'rounded-box bg-base-200 p-6 transition-all',
            active === item ? 'basis-2/3 bg-primary text-primary-content' : 'basis-1/6',
          )}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

HovergalleryStory.displayName = 'HovergalleryStory';

const meta = {
  title: 'daisyUI/Hovergallery',
  component: HovergalleryStory,
  tags: ['autodocs'],
  args: {
    active: 'two',
  },
  argTypes: {
    active: Controls.selectControl(['one', 'two', 'three'], 'Expanded gallery item.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI hovergallery themed preview',
      },
    },
  },
} satisfies Meta<typeof HovergalleryStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
