import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  type BadgeSize,
  type BadgeVariant,
} from '../../src/components/badge/index.js';

type BadgeStoryArgs = { children: string; size: BadgeSize; variant: BadgeVariant };

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  args: { children: 'Healthy', size: 'md', variant: 'success' },
  argTypes: {
    children: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: (args) => <Badge {...args} />,
} satisfies Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
