import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinInput } from '../../src/components/pin-input/react.js';

function PinInputStory({
  disabled,
  invalid,
  length,
}: {
  disabled: boolean;
  invalid: boolean;
  length: number;
}) {
  return <PinInput disabled={disabled} invalid={invalid} length={length} />;
}

const meta = {
  title: 'Components/PinInput',
  component: PinInputStory,
  args: { disabled: false, invalid: false, length: 6 },
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    length: { control: { min: 4, max: 8, step: 1, type: 'number' } },
  },
} satisfies Meta<typeof PinInputStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
