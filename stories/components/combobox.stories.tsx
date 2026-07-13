import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from '../../src/components/combobox/index.js';

type ComboboxStoryArgs = {
  disabled: boolean;
  disabledOption: boolean;
  open: boolean;
  placeholder: string;
  selected: 'none' | 'Rack A' | 'Rack B';
};

export function ComboboxExample({
  disabled = false,
  disabledOption = false,
  open = false,
  placeholder = 'Choose a rack',
  selected = 'none',
}: Partial<ComboboxStoryArgs>) {
  const selectionProps = selected === 'none' ? {} : { defaultValue: selected };

  return (
    <Combobox.Root
      {...selectionProps}
      defaultOpen={open}
      disabled={disabled}
      items={['Rack A', 'Rack B']}
      key={`${open}-${selected}`}
    >
      <div className="tinyrack-combobox-story-layout flex w-full max-w-md items-stretch gap-2">
        <Combobox.Input
          aria-label="Rack"
          className="min-w-0 flex-1"
          placeholder={placeholder}
        />
        <Combobox.Trigger>Open</Combobox.Trigger>
      </div>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              <Combobox.Item value="Rack A">Rack A</Combobox.Item>
              <Combobox.Item disabled={disabledOption} value="Rack B">
                Rack B
              </Combobox.Item>
              <Combobox.Empty>No racks</Combobox.Empty>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

const meta = {
  title: 'Components/Combobox',
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    disabledOption: false,
    open: false,
    placeholder: 'Choose a rack',
    selected: 'none',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    disabledOption: { control: 'boolean' },
    open: { control: 'boolean' },
    placeholder: { control: 'text' },
    selected: { control: 'select', options: ['none', 'Rack A', 'Rack B'] },
  },
  render: (args) => <ComboboxExample {...args} />,
} satisfies Meta<ComboboxStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
