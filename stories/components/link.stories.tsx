import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Link,
  type LinkUnderline,
  type LinkVariant,
} from '../../src/components/link/index.js';

type LinkStoryArgs = {
  children: string;
  newTab: boolean;
  underline: LinkUnderline;
  variant: LinkVariant;
};

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  args: {
    children: 'Open Tinyrack',
    newTab: false,
    underline: 'always',
    variant: 'primary',
  },
  argTypes: {
    children: { control: 'text' },
    newTab: { control: 'boolean' },
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'danger'],
    },
  },
  render: ({ children, newTab, ...props }) => (
    <Link
      {...props}
      href="https://tinyrack.net"
      rel={newTab ? 'noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  ),
} satisfies Meta<LinkStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
