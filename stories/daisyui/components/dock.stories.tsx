import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.daisySizeOptions)[number];
  active?: 'hosts' | 'logs' | 'settings';
};

function DockStory(controlValues: ComponentStoryProps) {
  const active = controlValues.active ?? 'hosts';
  const size = controlValues.size ?? 'md';

  return (
    <nav
      className={Controls.cx(
        'dock static w-80 rounded-box border border-base-300',
        `dock-${size}`,
      )}
    >
      {['hosts', 'logs', 'settings'].map((item) => (
        <button
          className={active === item ? 'dock-active' : undefined}
          key={item}
          type="button"
        >
          <span>{item.slice(0, 2).toUpperCase()}</span>
          <span className="dock-label">{item}</span>
        </button>
      ))}
    </nav>
  );
}

DockStory.displayName = 'DockStory';

const meta = {
  title: 'daisyUI/Dock',
  component: DockStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    active: 'hosts',
  },
  argTypes: {
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    active: Controls.selectControl(['hosts', 'logs', 'settings'], 'Active dock item.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI dock themed preview',
      },
    },
  },
} satisfies Meta<typeof DockStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
