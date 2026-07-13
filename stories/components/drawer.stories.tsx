import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from '../../src/components/drawer/index.js';

type StoryArgs = {
  label: string;
  open: boolean;
  modal: boolean;
};

export function DrawerPreview({ label, open, modal }: StoryArgs) {
  return (
    <Drawer.Root modal={modal} open={open}>
      <Drawer.Trigger>{label}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <Drawer.Title>Rack settings</Drawer.Title>
              <Drawer.Description>Update deployment preferences.</Drawer.Description>
              <Drawer.Close>Close</Drawer.Close>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const meta = {
  title: 'Components/Drawer',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Open settings',
    open: false,
    modal: true,
  },
  argTypes: {
    label: { control: 'text' },
    open: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
  render: (args) => <DrawerPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
