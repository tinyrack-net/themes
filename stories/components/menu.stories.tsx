import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '../../src/components/menu/index.js';

type MenuStoryArgs = { disabledItem: boolean; label: string; open: boolean };

export function MenuExample({
  disabledItem = false,
  label = 'Actions',
  open = false,
}: Partial<MenuStoryArgs>) {
  return (
    <Menu.Root defaultOpen={open} key={`${open}-${disabledItem}`}>
      <Menu.Trigger>{label}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>Restart</Menu.Item>
            <Menu.Item disabled={disabledItem}>Stop</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Delete</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

const meta = {
  title: 'Components/Menu',
  parameters: { layout: 'centered' },
  args: { disabledItem: false, label: 'Actions', open: false },
  argTypes: {
    disabledItem: { control: 'boolean' },
    label: { control: 'text' },
    open: { control: 'boolean' },
  },
  render: (args) => <MenuExample {...args} />,
} satisfies Meta<MenuStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
