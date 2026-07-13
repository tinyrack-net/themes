import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../src/components/button/index.js';
import { Form } from '../../src/components/form/index.js';
import { Input } from '../../src/components/input/index.js';

type StoryArgs = {
  label: string;
  required: boolean;
  submitLabel: string;
};

export function FormPreview({ label, required, submitLabel }: StoryArgs) {
  return (
    <Form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
      <label className="grid gap-2" htmlFor="form-rack-name">
        {label}
        <Input id="form-rack-name" name="rack" required={required} />
      </label>
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}

const meta = {
  title: 'Components/Form',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Rack name',
    required: true,
    submitLabel: 'Save',
  },
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    submitLabel: { control: 'text' },
  },
  render: (args) => <FormPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
