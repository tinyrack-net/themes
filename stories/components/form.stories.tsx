import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '../../src/components/form/index.js';

type FormStoryArgs = {
  disabled: boolean;
  invalid: boolean;
  label: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
};

const meta = {
  title: 'Components/Form',
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
    <Form.Field className="w-80 max-w-full" disabled={disabled} invalid={invalid}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        aria-invalid={invalid || undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type="email"
      />
      <Form.Description>Operational alerts are sent here.</Form.Description>
      <Form.Error match>
        {invalid ? 'Enter a valid email.' : 'Email is required.'}
      </Form.Error>
    </Form.Field>
  ),
} satisfies Meta<FormStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
