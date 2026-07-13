import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinInput } from '../../src/components/pin-input/index.js';

type PinInputStoryArgs = {
  disabled: boolean;
  length: number;
  readOnly: boolean;
  required: boolean;
};

const meta = {
  title: 'Components/Pin Input',
  parameters: { layout: 'centered' },
  args: { disabled: false, length: 4, readOnly: false, required: true },
  argTypes: {
    disabled: { control: 'boolean' },
    length: { control: { type: 'range', min: 3, max: 8, step: 1 } },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  render: ({ disabled, length, readOnly, required }) => (
    <PinInput.Root
      aria-label="Verification code"
      disabled={disabled}
      key={`${length}-${disabled}-${readOnly}`}
      length={length}
      readOnly={readOnly}
      required={required}
    >
      {Array.from({ length }, (_, index) => `slot-${index + 1}`).map((slot) => (
        <PinInput.Input key={slot} />
      ))}
    </PinInput.Root>
  ),
} satisfies Meta<PinInputStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
