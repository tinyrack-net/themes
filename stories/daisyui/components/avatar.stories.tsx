import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  status?: 'none' | 'online' | 'offline';
  placeholder?: boolean;
  grouped?: boolean;
};

function AvatarStory(controlValues: ComponentStoryProps) {
  const status = controlValues.status ?? 'online';
  const avatarClass = Controls.cx(
    'avatar',
    status === 'none' ? undefined : `avatar-${status}`,
    (controlValues.placeholder ?? false) ? 'avatar-placeholder' : undefined,
  );
  const avatar = (
    <div className={avatarClass}>
      <div className="w-16 rounded-full bg-neutral text-neutral-content">
        <span className="text-xl">TR</span>
      </div>
    </div>
  );

  if (!(controlValues.grouped ?? false)) {
    return avatar;
  }

  return (
    <div className="avatar-group -space-x-4">
      {avatar}
      <div className="avatar placeholder">
        <div className="w-16 rounded-full bg-base-300 text-base-content">
          <span>+2</span>
        </div>
      </div>
    </div>
  );
}

AvatarStory.displayName = 'AvatarStory';

const meta = {
  title: 'daisyUI/Avatar',
  component: AvatarStory,
  tags: ['autodocs'],
  args: {
    status: 'online',
    placeholder: false,
    grouped: false,
  },
  argTypes: {
    status: Controls.selectControl(
      ['none', 'online', 'offline'],
      'Avatar presence state.',
    ),
    placeholder: Controls.booleanControl('Uses avatar-placeholder styling.'),
    grouped: Controls.booleanControl('Shows avatar-group composition.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI avatar themed preview',
      },
    },
  },
} satisfies Meta<typeof AvatarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
