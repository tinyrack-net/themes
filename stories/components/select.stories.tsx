import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../../src/components/select/index.js';

type StoryArgs = {
  open: boolean;
  disabled: boolean;
  value: string;
};

export function SelectPreview({ open, disabled, value }: StoryArgs) {
  return (
    <Select.Root disabled={disabled} open={open} value={value}>
      <Select.Trigger aria-label="Rack">
        <Select.Value />
        <Select.Icon>⌄</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="alpha">
                <Select.ItemText>Alpha</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="beta">
                <Select.ItemText>Beta</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

const meta = {
  title: 'Components/Select',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    open: false,
    disabled: false,
    value: 'alpha',
  },
  argTypes: {
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
  render: (args) => <SelectPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
