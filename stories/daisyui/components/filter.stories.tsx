import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  active?: 'all' | 'network' | 'storage';
  size?: (typeof Controls.daisySizeOptions)[number];
};

function FilterStory(controlValues: ComponentStoryProps) {
  const active = controlValues.active ?? 'network';
  const size = controlValues.size ?? 'md';

  return (
    <div className="filter">
      {['all', 'network', 'storage'].map((item) => (
        <input
          aria-label={item}
          checked={active === item}
          className={Controls.cx(
            'btn',
            item === 'all' ? 'filter-reset' : undefined,
            `btn-${size}`,
          )}
          key={item}
          name="daisy-filter"
          readOnly
          type="radio"
        />
      ))}
    </div>
  );
}

FilterStory.displayName = 'FilterStory';

const meta = {
  title: 'daisyUI/Filter',
  component: FilterStory,
  tags: ['autodocs'],
  args: {
    active: 'network',
    size: 'md',
  },
  argTypes: {
    active: Controls.selectControl(
      ['all', 'network', 'storage'],
      'Active filter option.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI filter themed preview',
      },
    },
  },
} satisfies Meta<typeof FilterStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
