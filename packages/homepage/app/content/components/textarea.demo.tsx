import { Button } from '@tinyrack/ui/components/button';
import { Field } from '@tinyrack/ui/components/field';
import { Form } from '@tinyrack/ui/components/form';
import { Textarea } from '@tinyrack/ui/components/textarea';
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
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  value: string;
};

export function TextareaPreview({
  label,
  value,
  ...args
}: StoryArgs & { onValueChange?: (value: string) => void }) {
  const id = useId();
  const { onValueChange, ...textareaProps } = args;
  return (
    <label className="grid w-80 max-w-full gap-2" htmlFor={id}>
      {label}
      <Textarea
        {...textareaProps}
        id={id}
        onChange={(event) => onValueChange?.(event.currentTarget.value)}
        value={value}
      />
    </label>
  );
}

export function TextareaStateComparison() {
  const invalidId = useId();
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <TextareaPreview
        disabled={false}
        label="Default"
        placeholder="Operational notes"
        readOnly={false}
        required={false}
        value=""
      />
      <TextareaPreview
        disabled
        label="Disabled"
        placeholder="Unavailable"
        readOnly={false}
        required={false}
        value=""
      />
      <TextareaPreview
        disabled={false}
        label="Read only"
        placeholder=""
        readOnly
        required={false}
        value="Locked note"
      />
      <label className="grid min-w-0 gap-2" htmlFor={invalidId}>
        Invalid
        <Textarea aria-invalid="true" defaultValue="Incomplete note" id={invalidId} />
      </label>
    </div>
  );
}

export function TextareaValidationPreview() {
  const id = useId();
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState('');
  const invalid = attempted && value.trim().length === 0;
  return (
    <Form
      className="grid w-full max-w-md gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        const valid = value.trim().length > 0;
        setSubmitted(valid);
        if (!valid) document.getElementById(id)?.focus();
      }}
    >
      <Field.Root invalid={invalid}>
        <Field.Label htmlFor={id}>Change reason</Field.Label>
        <Textarea
          aria-invalid={invalid}
          id={id}
          name="reason"
          onChange={(event) => {
            setValue(event.currentTarget.value);
            setSubmitted(false);
          }}
          required
          value={value}
        />
        <Field.Error match>
          {invalid ? 'Add a reason before submitting.' : null}
        </Field.Error>
      </Field.Root>
      <Button type="submit">Submit change</Button>
      <output aria-live="polite">{submitted ? 'Change submitted.' : ''}</output>
    </Form>
  );
}

const meta = {
  title: 'Components/Textarea',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    label: 'Rack notes',
    placeholder: 'Operational notes',
    readOnly: false,
    required: false,
    value: '',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    value: { control: 'textarea' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>();
    return (
      <TextareaPreview {...args} onValueChange={(value) => updateArgs({ value })} />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const playground = definePlayground(meta);
