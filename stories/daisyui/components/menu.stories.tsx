import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  size?: (typeof Controls.daisySizeOptions)[number];
  selected?: 'status' | 'logs' | 'settings';
};

function MenuStory(controlValues: ComponentStoryProps) {
  const orientation = controlValues.orientation ?? 'vertical';
  const selected = controlValues.selected ?? 'status';
  const size = controlValues.size ?? 'md';

  return (
    <ul
      className={Controls.cx(
        'menu rounded-box bg-base-200',
        `menu-${orientation}`,
        `menu-${size}`,
        orientation === 'vertical' ? 'w-56' : undefined,
      )}
    >
      {['status', 'logs', 'settings'].map((item) => (
        <li key={item}>
          <a className={selected === item ? 'menu-active' : undefined} href="#top">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

MenuStory.displayName = 'MenuStory';

const meta = {
  title: 'daisyUI/Menu',
  component: MenuStory,
  tags: ['autodocs'],
  args: {
    orientation: 'vertical',
    size: 'md',
    selected: 'status',
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Menu orientation class.',
    ),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    selected: Controls.selectControl(
      ['status', 'logs', 'settings'],
      'Active menu item.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI menu themed preview',
      },
    },
  },
} satisfies Meta<typeof MenuStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
