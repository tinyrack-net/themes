import { Alert } from '@tinyrack/ui/components/alert';
import { Button } from '@tinyrack/ui/components/button';
import { createElement } from 'react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
type AlertStoryArgs = {
  actionMode: 'none' | 'single' | 'multiple';
  description: string;
  headingElement: 'div' | 'h2' | 'h3';
  role: 'none' | 'status' | 'alert';
  title: string;
  variant: AlertVariant;
};

const meta = {
  title: 'Components/Alert',
  parameters: { layout: 'centered' },
  args: {
    actionMode: 'single',
    description: 'The rollout will start shortly.',
    headingElement: 'h3',
    role: 'status',
    title: 'Deployment queued',
    variant: 'info',
  },
  argTypes: {
    actionMode: { control: 'select', options: ['none', 'single', 'multiple'] },
    description: { control: 'text' },
    headingElement: { control: 'select', options: ['div', 'h2', 'h3'] },
    role: { control: 'select', options: ['none', 'status', 'alert'] },
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: ({ actionMode, description, headingElement, role, title, variant }) => (
    <Alert.Root
      className="max-w-md"
      role={role === 'none' ? undefined : role}
      variant={variant}
    >
      <Alert.Title
        render={headingElement === 'div' ? undefined : createElement(headingElement)}
      >
        {title}
      </Alert.Title>
      <Alert.Description>{description}</Alert.Description>
      {actionMode === 'none' ? null : (
        <Alert.Actions>
          <Button appearance="outline" size="sm">
            View details
          </Button>
          {actionMode === 'multiple' ? (
            <Button appearance="ghost" size="sm">
              Dismiss
            </Button>
          ) : null}
        </Alert.Actions>
      )}
    </Alert.Root>
  ),
} satisfies Meta<AlertStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
