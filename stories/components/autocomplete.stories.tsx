import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from '../../src/components/autocomplete/index.js';

type StoryArgs = {
  placeholder: string;
  open: boolean;
  disabled: boolean;
};

export function AutocompletePreview({ placeholder, open, disabled }: StoryArgs) {
  return (
    <Autocomplete.Root items={['Rack Alpha', 'Rack Beta']} open={open}>
      <Autocomplete.InputGroup>
        <Autocomplete.Input
          aria-label="Rack"
          disabled={disabled}
          placeholder={placeholder}
        />
        <Autocomplete.Trigger>Suggestions</Autocomplete.Trigger>
      </Autocomplete.InputGroup>
      <Autocomplete.Portal>
        <Autocomplete.Positioner>
          <Autocomplete.Popup>
            <Autocomplete.List>
              <Autocomplete.Item value="Rack Alpha">Rack Alpha</Autocomplete.Item>
              <Autocomplete.Item value="Rack Beta">Rack Beta</Autocomplete.Item>
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

const meta = {
  title: 'Components/Autocomplete',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'Search racks',
    open: false,
    disabled: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <AutocompletePreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
