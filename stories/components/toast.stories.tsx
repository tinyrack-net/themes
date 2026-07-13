import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useRef } from 'react';
import { Button } from '../../src/components/button/index.js';
import {
  Toast,
  type ToastPosition,
  type ToastVariant,
  useToastManager,
} from '../../src/components/toast/index.js';

type ToastStoryArgs = {
  description: string;
  initiallyOpen: boolean;
  position: ToastPosition;
  title: string;
  variant: ToastVariant;
};

export function ToastDemo({
  description = 'Rack A is healthy.',
  initiallyOpen = false,
  position = 'block-end-inline-end',
  title = 'Deployment complete',
  variant = 'success',
}: Partial<ToastStoryArgs>) {
  const manager = useToastManager();
  const added = useRef(false);

  const addToast = useCallback(() => {
    manager.add({ description, timeout: 0, title, type: variant });
  }, [description, manager, title, variant]);

  useEffect(() => {
    if (!initiallyOpen || added.current) return;
    added.current = true;
    addToast();
  }, [addToast, initiallyOpen]);

  return (
    <>
      <Button onClick={addToast}>Show toast</Button>
      <Toast.Portal>
        <Toast.Viewport position={position}>
          {manager.toasts.map((toast) => (
            <Toast.Root key={toast.id} toast={toast}>
              <div>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
              </div>
              <Toast.Action>View</Toast.Action>
              <Toast.Close>Close</Toast.Close>
            </Toast.Root>
          ))}
        </Toast.Viewport>
      </Toast.Portal>
    </>
  );
}

export function ToastVariantGallery() {
  const manager = useToastManager();
  const added = useRef(false);

  useEffect(() => {
    if (added.current) return;
    added.current = true;
    for (const [type, title] of [
      ['neutral', 'Neutral update'],
      ['info', 'Maintenance scheduled'],
      ['success', 'Deployment complete'],
      ['warning', 'Storage nearing capacity'],
      ['danger', 'Deployment failed'],
    ] as const) {
      manager.add({
        description: 'Rack A status notification.',
        timeout: 0,
        title,
        type,
      });
    }
  }, [manager]);

  return (
    <Toast.Portal>
      <Toast.Viewport position="block-end-inline-end">
        {manager.toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast}>
            <div>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
            </div>
            <Toast.Close>Close</Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

const meta = {
  title: 'Components/Toast',
  parameters: { layout: 'centered' },
  args: {
    description: 'Rack A is healthy.',
    initiallyOpen: false,
    position: 'block-end-inline-end',
    title: 'Deployment complete',
    variant: 'success',
  },
  argTypes: {
    description: { control: 'text' },
    initiallyOpen: { control: 'boolean' },
    position: {
      control: 'select',
      options: [
        'block-start-inline-start',
        'block-start-center',
        'block-start-inline-end',
        'block-end-inline-start',
        'block-end-center',
        'block-end-inline-end',
      ],
    },
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: (args) => (
    <Toast.Provider>
      <ToastDemo {...args} />
    </Toast.Provider>
  ),
} satisfies Meta<ToastStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { initiallyOpen: true } };
