import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  type AvatarShape,
  type AvatarSize,
} from '../../src/components/avatar/index.js';

type AvatarStoryArgs = {
  fallback: string;
  image: boolean;
  shape: AvatarShape;
  size: AvatarSize;
};

const meta = {
  title: 'Components/Avatar',
  parameters: { layout: 'centered' },
  args: { fallback: 'TR', image: true, shape: 'circle', size: 'md' },
  argTypes: {
    fallback: { control: 'text' },
    image: { control: 'boolean' },
    shape: { control: 'select', options: ['circle', 'square'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: ({ fallback, image, ...rootProps }) => (
    <Avatar.Root {...rootProps}>
      {image ? (
        <Avatar.Image alt="Tinyrack" src="https://github.com/tinyrack-net.png" />
      ) : null}
      <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar.Root>
  ),
} satisfies Meta<AvatarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
