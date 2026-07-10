import type { Meta, StoryObj } from '@storybook/react-vite';
import { avatarShapes, avatarSizes } from '../../src/components/avatar/contract.js';
import { Avatar, type AvatarProps } from '../../src/components/avatar/react.js';

type ComponentStoryProps = Pick<AvatarProps, 'children' | 'shape' | 'size'>;

function AvatarStory(controlValues: ComponentStoryProps) {
  return <Avatar {...controlValues} />;
}

AvatarStory.displayName = 'AvatarStory';

const meta = {
  title: 'Components/Avatar',
  component: AvatarStory,
  args: { children: 'RA', shape: 'circle', size: 'md' },
  argTypes: {
    children: { control: 'text', description: 'Initials or child content.' },
    shape: { control: 'select', options: avatarShapes },
    size: { control: 'select', options: avatarSizes },
  },
} satisfies Meta<typeof AvatarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
