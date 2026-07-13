import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Modal,
  type ModalPlacement,
  type ModalSize,
} from '../../src/components/modal/index.js';

type ModalStoryArgs = {
  description: string;
  open: boolean;
  placement: ModalPlacement;
  size: ModalSize;
  title: string;
};

export function ModalExample({
  description = 'This restarts the service.',
  open = false,
  placement = 'middle',
  size = 'md',
  title = 'Deploy changes',
}: Partial<ModalStoryArgs>) {
  return (
    <Modal.Root defaultOpen={open} key={`${open}-${placement}-${size}`}>
      <Modal.Trigger>Open modal</Modal.Trigger>
      <Modal.Portal>
        <Modal.Backdrop />
        <Modal.Popup placement={placement} size={size}>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Description>{description}</Modal.Description>
          <Modal.Close>Cancel</Modal.Close>
        </Modal.Popup>
      </Modal.Portal>
    </Modal.Root>
  );
}

const meta = {
  title: 'Components/Modal',
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
  render: (args) => <ModalExample {...args} />,
} satisfies Meta<ModalStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
