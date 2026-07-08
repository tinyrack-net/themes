import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  active?: 'status' | 'logs';
};

function NavbarStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';
  const active = controlValues.active ?? 'status';

  return (
    <div className="navbar w-96 rounded-box bg-base-200">
      <div className="navbar-start font-semibold">Tinyrack</div>
      <div className="navbar-center">
        <div className="join">
          {['status', 'logs'].map((item) => (
            <button
              className={Controls.cx(
                'btn join-item btn-sm',
                active === item ? `btn-${tone}` : 'btn-ghost',
              )}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="navbar-end">
        <button className="btn btn-square btn-ghost btn-sm" type="button">
          TR
        </button>
      </div>
    </div>
  );
}

NavbarStory.displayName = 'NavbarStory';

const meta = {
  title: 'daisyUI/Navbar',
  component: NavbarStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    active: 'status',
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    active: Controls.selectControl(['status', 'logs'], 'Active navbar action.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI navbar themed preview',
      },
    },
  },
} satisfies Meta<typeof NavbarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
