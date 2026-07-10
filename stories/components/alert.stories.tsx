import type { Meta, StoryObj } from '@storybook/react-vite';
import { alertVariants } from '../../src/components/alert/contract.js';
import { Alert, type AlertProps } from '../../src/components/alert/react.js';

type ComponentStoryProps = Pick<AlertProps, 'children' | 'role' | 'variant'>;

function AlertStory(controlValues: ComponentStoryProps) {
  return <Alert {...controlValues} />;
}

AlertStory.displayName = 'AlertStory';

const meta = {
  title: 'Components/Alert',
  component: AlertStory,
  args: {
    children: 'Backup is scheduled.',
    variant: 'neutral',
  },
  argTypes: {
    children: { control: 'text', description: 'Alert message.' },
    role: { control: 'select', options: ['', 'status', 'alert'] },
    variant: { control: 'select', options: alertVariants },
  },
} satisfies Meta<typeof AlertStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
