import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../../src/components/card/index.js';

type CardStoryArgs = {
  content: string;
  description: string;
  footer: boolean;
  padding: 'none' | 'sm' | 'md' | 'lg';
  title: string;
  variant: 'default' | 'outlined' | 'elevated';
};

const meta = {
  title: 'Components/Card',
  parameters: { layout: 'centered' },
  args: {
    content: 'All systems operational.',
    description: '12 nodes',
    footer: true,
    padding: 'md',
    title: 'Rack A',
    variant: 'elevated',
  },
  argTypes: {
    content: { control: 'text' },
    description: { control: 'text' },
    footer: { control: 'boolean' },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
  },
  render: ({ content, description, footer, title, ...rootProps }) => (
    <Card.Root className="w-80" {...rootProps}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
      <Card.Content>{content}</Card.Content>
      {footer ? <Card.Footer>Updated now</Card.Footer> : null}
    </Card.Root>
  ),
} satisfies Meta<CardStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
