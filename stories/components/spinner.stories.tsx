import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  type SpinnerSize,
  type SpinnerVariant,
  spinnerSizes,
  spinnerVariants,
} from '../../src/components/spinner/contract.js';
import { Spinner } from '../../src/components/spinner/react.js';

type SpinnerStoryProps = { label: string; size: SpinnerSize; variant: SpinnerVariant };

function SpinnerStory({ label, size, variant }: SpinnerStoryProps) {
  return <Spinner label={label} size={size} variant={variant} />;
}

const meta = {
  title: 'Components/Spinner',
  component: SpinnerStory,
  args: { label: 'Loading', size: 'md', variant: 'currentColor' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: spinnerSizes },
    variant: { control: 'select', options: spinnerVariants },
  },
} satisfies Meta<typeof SpinnerStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
