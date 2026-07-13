import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from '../../src/components/context-menu/index.js';

type StoryArgs = {
  label: string;
  open: boolean;
  disabledItem: boolean;
};

export function ContextMenuPreview({ label, open, disabledItem }: StoryArgs) {
  return (
    <ContextMenu.Root open={open}>
      <ContextMenu.Trigger className="block rounded border border-tinyrack-border p-6">
        {label}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item disabled={disabledItem}>Restart</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Inspect</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

const meta = {
  title: 'Components/Context Menu',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Right-click target',
    open: false,
    disabledItem: false,
  },
  argTypes: {
    label: { control: 'text' },
    open: { control: 'boolean' },
    disabledItem: { control: 'boolean' },
  },
  render: (args) => <ContextMenuPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
