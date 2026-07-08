import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  style?: (typeof Controls.daisyTabStyleOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  placement?: 'top' | 'bottom';
  active?: 'status' | 'logs' | 'settings';
};

function TabStory(controlValues: ComponentStoryProps) {
  const style = controlValues.style ?? 'border';
  const size = controlValues.size ?? 'md';
  const placement = controlValues.placement ?? 'top';
  const active = controlValues.active ?? 'status';

  return (
    <div
      role="tablist"
      className={Controls.cx(
        'tabs',
        `tabs-${style}`,
        `tabs-${size}`,
        `tabs-${placement}`,
      )}
    >
      {['status', 'logs', 'settings'].map((item) => (
        <button
          className={Controls.cx('tab', active === item ? 'tab-active' : undefined)}
          key={item}
          role="tab"
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

TabStory.displayName = 'TabStory';

const meta = {
  title: 'daisyUI/Tab',
  component: TabStory,
  tags: ['autodocs'],
  args: {
    style: 'border',
    size: 'md',
    placement: 'top',
    active: 'status',
  },
  argTypes: {
    style: Controls.selectControl(
      Controls.daisyTabStyleOptions,
      'Tabs treatment class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    placement: Controls.selectControl(['top', 'bottom'], 'Tab placement class.'),
    active: Controls.selectControl(['status', 'logs', 'settings'], 'Active tab.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI tab themed preview',
      },
    },
  },
} satisfies Meta<typeof TabStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
