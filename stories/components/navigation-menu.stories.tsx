import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu } from '../../src/components/navigation-menu/index.js';

type StoryArgs = {
  label: string;
  disabled: boolean;
};

export function NavigationMenuPreview({ label, disabled }: StoryArgs) {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link aria-disabled={disabled || undefined} href="#docs">
            {label}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#status">Status</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

const meta = {
  title: 'Components/Navigation Menu',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Documentation',
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <NavigationMenuPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
