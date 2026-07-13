import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../src/components/input/index.js';

type StoryArgs = {
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
};

export function InputPreview({ placeholder, disabled, readOnly, required }: StoryArgs) {
  return (
    <Input
      aria-label="Rack name"
      disabled={disabled}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
    />
  );
}

const meta = {
  title: 'Components/Input',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'rack-alpha',
    disabled: false,
    readOnly: false,
    required: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  render: (args) => <InputPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
