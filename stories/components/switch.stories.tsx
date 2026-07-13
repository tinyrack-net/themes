import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../../src/components/switch/index.js';

type StoryArgs = {
  label: string;
  checked: boolean;
  disabled: boolean;
};

export function SwitchPreview({ label, checked, disabled }: StoryArgs) {
  return (
    <div className="flex items-center gap-2">
      <Switch.Root aria-label={label} checked={checked} disabled={disabled}>
        <Switch.Thumb />
      </Switch.Root>
      {label}
    </div>
  );
}

const meta = {
  title: 'Components/Switch',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Automatic updates',
    checked: true,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <SwitchPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
