import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../../src/components/field/index.js';

type FieldStoryArgs = {
  disabled: boolean;
  invalid: boolean;
  label: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
};

const meta = {
  title: 'Components/Field',
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    invalid: false,
    label: 'Email',
    placeholder: 'ops@example.com',
    readOnly: false,
    required: true,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  render: ({ disabled, invalid, label, placeholder, readOnly, required }) => (
    <Field.Root className="w-80 max-w-full" disabled={disabled} invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <Field.Control
        aria-invalid={invalid || undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type="email"
      />
      <Field.Description>Operational alerts are sent here.</Field.Description>
      <Field.Error match>
        {invalid ? 'Enter a valid email.' : 'Email is required.'}
      </Field.Error>
    </Field.Root>
  ),
} satisfies Meta<FieldStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
