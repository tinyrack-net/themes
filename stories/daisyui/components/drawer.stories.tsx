import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  side?: 'start' | 'end';
  open?: boolean;
};

function DrawerStory(controlValues: ComponentStoryProps) {
  const side = controlValues.side ?? 'start';

  return (
    <div
      className={Controls.cx(
        'drawer h-44 w-80 rounded-box bg-base-200',
        side === 'end' ? 'drawer-end' : undefined,
        (controlValues.open ?? true) ? 'drawer-open' : undefined,
      )}
    >
      <input
        className="drawer-toggle"
        readOnly
        type="checkbox"
        checked={controlValues.open ?? true}
      />
      <div className="drawer-content grid place-content-center">
        <button className="btn btn-primary" type="button">
          Content
        </button>
      </div>
      <div className="drawer-side absolute">
        <div className="min-h-full w-36 bg-base-300 p-4">Drawer</div>
      </div>
    </div>
  );
}

DrawerStory.displayName = 'DrawerStory';

const meta = {
  title: 'daisyUI/Drawer',
  component: DrawerStory,
  tags: ['autodocs'],
  args: {
    side: 'start',
    open: true,
  },
  argTypes: {
    side: Controls.selectControl(['start', 'end'], 'Drawer side class.'),
    open: Controls.booleanControl('Applies drawer-open state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI drawer themed preview',
      },
    },
  },
} satisfies Meta<typeof DrawerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
