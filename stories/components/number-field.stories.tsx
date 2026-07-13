import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from '../../src/components/number-field/index.js';

type StoryArgs = {
  label: string;
  value: number;
  disabled: boolean;
};

export function NumberFieldPreview({ label, value, disabled }: StoryArgs) {
  return (
    <NumberField.Root disabled={disabled} value={value}>
      <NumberField.ScrubArea>
        <label htmlFor="number-field-input" id="number-field-label">
          {label}
        </label>
      </NumberField.ScrubArea>
      <NumberField.Group>
        <NumberField.Decrement>−</NumberField.Decrement>
        <NumberField.Input
          aria-labelledby="number-field-label"
          id="number-field-input"
        />
        <NumberField.Increment>+</NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

const meta = {
  title: 'Components/Number Field',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Replicas',
    value: 3,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'number', min: 0, max: 100 } },
    disabled: { control: 'boolean' },
  },
  render: (args) => <NumberFieldPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
