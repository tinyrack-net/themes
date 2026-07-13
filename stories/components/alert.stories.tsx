import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../../src/components/alert/index.js';
import { Button } from '../../src/components/button/index.js';

type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
type AlertStoryArgs = {
  action: boolean;
  description: string;
  title: string;
  variant: AlertVariant;
};

const meta = {
  title: 'Components/Alert',
  parameters: { layout: 'centered' },
  args: {
    action: true,
    description: 'The rollout will start shortly.',
    title: 'Deployment queued',
    variant: 'info',
  },
  argTypes: {
    action: { control: 'boolean' },
    description: { control: 'text' },
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: ({ action, description, title, variant }) => (
    <Alert.Root className="max-w-md" variant={variant}>
      <Alert.Title>{title}</Alert.Title>
      <Alert.Description>{description}</Alert.Description>
      {action ? (
        <Alert.Actions>
          <Button appearance="outline" size="sm">
            View details
          </Button>
        </Alert.Actions>
      ) : null}
    </Alert.Root>
  ),
} satisfies Meta<AlertStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
