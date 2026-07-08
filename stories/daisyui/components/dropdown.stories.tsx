import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  placement?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  open?: boolean;
};

function DropdownStory(controlValues: ComponentStoryProps) {
  const placement = controlValues.placement ?? 'bottom';
  const align = controlValues.align ?? 'start';

  return (
    <div
      className={Controls.cx(
        'dropdown',
        `dropdown-${placement}`,
        `dropdown-${align}`,
        (controlValues.open ?? true) ? 'dropdown-open' : undefined,
      )}
    >
      <button tabIndex={0} className="btn btn-primary" type="button">
        Actions
      </button>
      <ul className="dropdown-content menu z-1 w-52 rounded-box bg-base-200 p-2 shadow">
        <li>
          <a href="#top">Restart service</a>
        </li>
        <li>
          <a href="#top">View logs</a>
        </li>
      </ul>
    </div>
  );
}

DropdownStory.displayName = 'DropdownStory';

const meta = {
  title: 'daisyUI/Dropdown',
  component: DropdownStory,
  tags: ['autodocs'],
  args: {
    placement: 'bottom',
    align: 'start',
    open: true,
  },
  argTypes: {
    placement: Controls.selectControl(
      ['bottom', 'top', 'left', 'right'],
      'Dropdown placement class.',
    ),
    align: Controls.selectControl(
      ['start', 'center', 'end'],
      'Dropdown alignment class.',
    ),
    open: Controls.booleanControl('Applies dropdown-open state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI dropdown themed preview',
      },
    },
  },
} satisfies Meta<typeof DropdownStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
