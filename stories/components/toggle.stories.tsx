import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from '../../src/components/toggle/index.js';

type StoryArgs = {
  label: string;
  pressed: boolean;
  disabled: boolean;
};

export function TogglePreview({ label, pressed, disabled }: StoryArgs) {
  return (
    <Toggle disabled={disabled} pressed={pressed}>
      {label}
    </Toggle>
  );
}

const meta = {
  title: 'Components/Toggle',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Bold',
    pressed: false,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <TogglePreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
