import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '../../src/components/menu/index.js';
import { Menubar } from '../../src/components/menubar/index.js';

type StoryArgs = {
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  label: string;
};

export function MenubarPreview({ disabled, orientation, label }: StoryArgs) {
  return (
    <Menubar aria-label={label} disabled={disabled} orientation={orientation}>
      <Menu.Root>
        <Menu.Trigger>File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>New</Menu.Item>
              <Menu.Item>Open</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Menubar>
  );
}

const meta = {
  title: 'Components/Menubar',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    orientation: 'horizontal',
    label: 'Application menu',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    orientation: { options: ['horizontal', 'vertical'], control: 'radio' },
    label: { control: 'text' },
  },
  render: (args) => <MenubarPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
