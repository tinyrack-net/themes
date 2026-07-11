import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../src/components/button/react.js';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from '../../src/components/menu/react.js';

function MenuStory({ disabled }: { disabled: boolean }) {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>Actions</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>Rack</MenuLabel>
        <MenuItem value="refresh">Refresh</MenuItem>
        <MenuItem disabled={disabled} value="restart">
          Restart
        </MenuItem>
        <MenuSeparator />
        <MenuItem asChild value="docs">
          <a href="#menu-docs">Open docs</a>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

const meta = {
  title: 'Components/Menu',
  component: MenuStory,
  args: { disabled: true },
  argTypes: { disabled: { control: 'boolean' } },
} satisfies Meta<typeof MenuStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
