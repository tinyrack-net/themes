import { Button } from '@tinyrack/ui/components/button';
import { Field } from '@tinyrack/ui/components/field';
import { Form } from '@tinyrack/ui/components/form';
import { NumberField } from '@tinyrack/ui/components/number-field';
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
  disabled: boolean;
  label: string;
  max: number;
  min: number;
  readOnly: boolean;
  required: boolean;
  step: number;
  value: number | null;
};

type NumberFieldPreviewProps = Omit<StoryArgs, 'value'> & {
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  value?: number | null;
};

export function NumberFieldPreview({
  defaultValue,
  disabled,
  label,
  max,
  min,
  onValueChange,
  readOnly,
  required,
  step,
  value,
}: NumberFieldPreviewProps) {
  const inputId = useId();
  const labelId = useId();
  const normalizedMin = Number.isFinite(min) ? min : 0;
  const normalizedMax = Math.max(
    normalizedMin,
    Number.isFinite(max) ? max : normalizedMin,
  );
  const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
  const clampValue = (nextValue: number) =>
    Math.min(normalizedMax, Math.max(normalizedMin, nextValue));
  const stateProps =
    value === undefined
      ? {
          defaultValue:
            defaultValue === undefined ? undefined : clampValue(defaultValue),
        }
      : { value: value === null ? null : clampValue(value) };

  return (
    <NumberField.Root
      {...stateProps}
      disabled={disabled}
      max={normalizedMax}
      min={normalizedMin}
      name="replicas"
      onValueChange={onValueChange}
      readOnly={readOnly}
      required={required}
      step={normalizedStep}
    >
      <NumberField.ScrubArea>
        <label htmlFor={inputId} id={labelId}>
          {label}
        </label>
        <NumberField.ScrubAreaCursor>↕</NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>
      <NumberField.Group>
        <NumberField.Decrement aria-label="Decrease">−</NumberField.Decrement>
        <NumberField.Input aria-labelledby={labelId} id={inputId} />
        <NumberField.Increment aria-label="Increase">+</NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export function NumberFieldFormatPreview() {
  return (
    <NumberField.Root
      defaultValue={64}
      format={{ style: 'unit', unit: 'gigabyte', unitDisplay: 'short' }}
      max={256}
      min={16}
      name="storage"
      step={16}
    >
      <NumberField.ScrubArea>
        <label htmlFor="storage-capacity">Storage capacity</label>
        <NumberField.ScrubAreaCursor>↕</NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>
      <NumberField.Group>
        <NumberField.Decrement aria-label="Decrease by 16 gigabytes">
          −
        </NumberField.Decrement>
        <NumberField.Input id="storage-capacity" />
        <NumberField.Increment aria-label="Increase by 16 gigabytes">
          +
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export function NumberFieldStateComparison() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <NumberFieldPreview
        defaultValue={3}
        disabled={false}
        label="Editable replicas"
        max={20}
        min={0}
        readOnly={false}
        required={false}
        step={1}
      />
      <NumberFieldPreview
        defaultValue={8}
        disabled
        label="Disabled replicas"
        max={20}
        min={0}
        readOnly={false}
        required={false}
        step={1}
      />
      <NumberFieldPreview
        defaultValue={12}
        disabled={false}
        label="Read-only replicas"
        max={20}
        min={0}
        readOnly
        required={false}
        step={1}
      />
    </div>
  );
}

export function NumberFieldValidationPreview() {
  const [attempted, setAttempted] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const invalid = attempted && value === null;

  return (
    <Form
      className="grid w-80 max-w-full gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        event.currentTarget.checkValidity();
      }}
    >
      <Field.Root invalid={invalid}>
        <NumberFieldPreview
          disabled={false}
          label="Replica count"
          max={20}
          min={0}
          onValueChange={setValue}
          readOnly={false}
          required
          step={1}
          value={value}
        />
        {invalid ? <Field.Error match>Choose a replica count.</Field.Error> : null}
      </Field.Root>
      <Button type="submit">Create service</Button>
      <output aria-live="polite">
        {attempted && value !== null ? `Creating ${value} replicas.` : ''}
      </output>
    </Form>
  );
}

const meta = {
  title: 'Components/Number Field',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    label: 'Replicas',
    max: 20,
    min: 0,
    readOnly: false,
    required: false,
    step: 1,
    value: 3,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    max: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    step: { control: { type: 'number', min: 0.1 } },
    value: { control: { type: 'number', min: 0, max: 20 } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>();
    return (
      <NumberFieldPreview {...args} onValueChange={(value) => updateArgs({ value })} />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
