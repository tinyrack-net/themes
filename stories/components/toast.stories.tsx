import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ToastVariant } from '../../src/components/toast/contract.js';
import { ToastProvider, ToastViewport } from '../../src/components/toast/react.js';
import { ToastDemo } from '../shared/toast-demo.js';

function ToastStory({ variant }: { variant: ToastVariant }) {
  return (
    <ToastProvider>
      <ToastDemo variant={variant} />
      <ToastViewport />
    </ToastProvider>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastStory,
  args: { variant: 'info' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof ToastStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
