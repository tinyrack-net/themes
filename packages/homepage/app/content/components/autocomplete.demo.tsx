import { Autocomplete } from '@tinyrack/ui/components/autocomplete';
import { Button } from '@tinyrack/ui/components/button';
import { Field } from '@tinyrack/ui/components/field';
import { Form } from '@tinyrack/ui/components/form';
import { ChevronDown, Search, X } from 'lucide-react';
import { useId, useState } from 'react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import {
  definePlayground,
  usePlaygroundArgs as useArgs,
} from '../../playground/demo.js';

type StoryArgs = {
  autoHighlight: boolean | 'always';
  disabled: boolean;
  disabledItem: boolean;
  mode: 'list' | 'both' | 'inline' | 'none';
  open: boolean;
  openOnInputClick: boolean;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  submitOnItemClick: boolean;
  value: string;
};

type AutocompletePreviewProps = Omit<StoryArgs, 'open' | 'value'> & {
  defaultOpen?: boolean;
  defaultValue?: string;
  label?: string;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  open?: boolean;
  value?: string;
};

const autocompleteItems = ['Rack Alpha', 'Rack Beta', 'Rack Gamma', 'Staging rack'];

export function AutocompletePreview({
  defaultOpen,
  defaultValue,
  autoHighlight,
  disabled,
  disabledItem,
  label = 'Rack',
  mode,
  onOpenChange,
  onValueChange,
  open,
  openOnInputClick,
  placeholder,
  readOnly,
  required,
  submitOnItemClick,
  value,
}: AutocompletePreviewProps) {
  const inputId = useId();
  const openProps = open === undefined ? { defaultOpen } : { open };
  const valueProps = value === undefined ? { defaultValue } : { value };

  return (
    <Autocomplete.Root
      {...openProps}
      {...valueProps}
      autoHighlight={autoHighlight}
      disabled={disabled}
      items={autocompleteItems}
      mode={mode}
      name="rack-search"
      onOpenChange={onOpenChange}
      openOnInputClick={openOnInputClick}
      onValueChange={onValueChange}
      readOnly={readOnly}
      required={required}
      submitOnItemClick={submitOnItemClick}
    >
      <label className="grid w-full max-w-md gap-2" htmlFor={inputId}>
        {label}
        <Autocomplete.InputGroup>
          <Autocomplete.InputAdornment aria-hidden="true">
            <Search />
          </Autocomplete.InputAdornment>
          <Autocomplete.Input id={inputId} placeholder={placeholder} />
          <Autocomplete.Clear aria-label="Clear">
            <X aria-hidden="true" />
          </Autocomplete.Clear>
          <Autocomplete.Trigger aria-label="Show suggestions">
            <Autocomplete.Icon aria-hidden="true">
              <ChevronDown />
            </Autocomplete.Icon>
          </Autocomplete.Trigger>
        </Autocomplete.InputGroup>
      </label>
      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={8}>
          <Autocomplete.Popup>
            <Autocomplete.Arrow />
            <Autocomplete.Status />
            <Autocomplete.List>
              <Autocomplete.Group>
                <Autocomplete.GroupLabel>Production</Autocomplete.GroupLabel>
                <Autocomplete.Item value="Rack Alpha">Rack Alpha</Autocomplete.Item>
                <Autocomplete.Item value="Rack Beta">Rack Beta</Autocomplete.Item>
                <Autocomplete.Item disabled={disabledItem} value="Rack Gamma">
                  Rack Gamma
                </Autocomplete.Item>
              </Autocomplete.Group>
              <Autocomplete.Separator />
              <Autocomplete.Group>
                <Autocomplete.GroupLabel>Non-production</Autocomplete.GroupLabel>
                <Autocomplete.Item value="Staging rack">Staging rack</Autocomplete.Item>
              </Autocomplete.Group>
              <Autocomplete.Empty>No matching racks</Autocomplete.Empty>
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

export function AutocompleteStateComparison() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <AutocompletePreview
        defaultValue="Rack Alpha"
        autoHighlight={false}
        disabled={false}
        disabledItem={false}
        mode="list"
        openOnInputClick={false}
        placeholder="Search racks"
        readOnly={false}
        required={false}
        submitOnItemClick={false}
      />
      <AutocompletePreview
        defaultValue="Rack Beta"
        autoHighlight={false}
        disabled
        disabledItem={false}
        label="Disabled"
        mode="list"
        openOnInputClick={false}
        placeholder="Search racks"
        readOnly={false}
        required={false}
        submitOnItemClick={false}
      />
      <AutocompletePreview
        defaultValue="Rack Gamma"
        autoHighlight={false}
        disabled={false}
        disabledItem={false}
        label="Read only"
        mode="list"
        openOnInputClick={false}
        placeholder="Search racks"
        readOnly
        required={false}
        submitOnItemClick={false}
      />
    </div>
  );
}

export function AutocompleteBehaviorComparison() {
  return (
    <div className="grid min-w-0 gap-5 sm:grid-cols-2">
      <AutocompletePreview
        autoHighlight={false}
        defaultValue="Edge rack"
        disabled={false}
        disabledItem={false}
        label="Free-form value"
        mode="both"
        openOnInputClick
        placeholder="Known or custom rack"
        readOnly={false}
        required={false}
        submitOnItemClick={false}
      />
      <AutocompletePreview
        autoHighlight="always"
        defaultOpen
        defaultValue="No matching region"
        disabled={false}
        disabledItem
        label="Empty and disabled-item flow"
        mode="list"
        openOnInputClick
        placeholder="Search racks"
        readOnly={false}
        required={false}
        submitOnItemClick
      />
    </div>
  );
}

export function AutocompleteValidationPreview() {
  const [attempted, setAttempted] = useState(false);
  const [value, setValue] = useState('');
  const invalid = attempted && value.trim().length === 0;

  return (
    <Form
      className="grid w-full max-w-80 min-w-0 gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        event.currentTarget.checkValidity();
      }}
    >
      <Field.Root invalid={invalid}>
        <AutocompletePreview
          disabled={false}
          autoHighlight={false}
          disabledItem={false}
          label="Rack search"
          mode="list"
          onValueChange={setValue}
          openOnInputClick={false}
          placeholder="Type a rack name"
          readOnly={false}
          required
          submitOnItemClick={false}
          value={value}
        />
        {invalid ? <Field.Error match>Enter a rack name.</Field.Error> : null}
      </Field.Root>
      <Button type="submit">Continue</Button>
      <output aria-live="polite">
        {attempted && value ? `Searching for ${value}.` : ''}
      </output>
    </Form>
  );
}

const meta = {
  title: 'Components/Autocomplete',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    autoHighlight: false,
    disabled: false,
    disabledItem: false,
    mode: 'list',
    open: false,
    openOnInputClick: false,
    placeholder: 'Search racks',
    readOnly: false,
    required: false,
    submitOnItemClick: false,
    value: '',
  },
  argTypes: {
    autoHighlight: { control: 'select', options: [false, true, 'always'] },
    disabled: { control: 'boolean' },
    disabledItem: { control: 'boolean' },
    mode: { control: 'select', options: ['list', 'both', 'inline', 'none'] },
    open: { control: 'boolean' },
    openOnInputClick: { control: 'boolean' },
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    submitOnItemClick: { control: 'boolean' },
    value: { control: 'text' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>();
    return (
      <AutocompletePreview
        {...args}
        onOpenChange={(open) => updateArgs({ open })}
        onValueChange={(value) => updateArgs({ value })}
      />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };

export const playground = definePlayground(meta);
