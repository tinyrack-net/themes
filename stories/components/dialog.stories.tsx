import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Dialog,
  type DialogPlacement,
  type DialogSize,
} from '../../src/components/dialog/index.js';

type DialogStoryArgs = {
  description: string;
  open: boolean;
  placement: DialogPlacement;
  size: DialogSize;
  title: string;
};

export function DialogExample({
  description = 'This restarts the service.',
  open = false,
  placement = 'middle',
  size = 'md',
  title = 'Deploy changes',
}: Partial<DialogStoryArgs>) {
  return (
    <Dialog.Root defaultOpen={open} key={`${open}-${placement}-${size}`}>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup placement={placement} size={size}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const meta = {
  title: 'Components/Dialog',
  parameters: { layout: 'centered' },
  args: {
    description: 'This restarts the service.',
    open: false,
    placement: 'middle',
    size: 'md',
    title: 'Deploy changes',
  },
  argTypes: {
    description: { control: 'text' },
    open: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['middle', 'top', 'bottom', 'start', 'end'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    title: { control: 'text' },
  },
  render: (args) => <DialogExample {...args} />,
} satisfies Meta<DialogStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
