import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  type ProgressSize,
  type ProgressVariant,
  progressSizes,
  progressVariants,
} from '../../src/components/progress/contract.js';
import { Progress } from '../../src/components/progress/react.js';

type ComponentStoryProps = {
  indeterminate?: boolean;
  max: number;
  size: ProgressSize;
  value: number;
  variant: ProgressVariant;
};

function ProgressStory({
  indeterminate = false,
  max = 100,
  size = 'md',
  value = 42,
  variant = 'primary',
}: ComponentStoryProps) {
  return (
    <Progress
      aria-label="Deploy progress"
      max={max}
      size={size}
      value={indeterminate ? undefined : value}
      variant={variant}
    />
  );
}

ProgressStory.displayName = 'ProgressStory';

const meta = {
  title: 'Components/Progress',
  component: ProgressStory,
  args: {
    indeterminate: false,
    max: 100,
    size: 'md',
    value: 42,
    variant: 'primary',
  },
  argTypes: {
    indeterminate: { control: 'boolean' },
    max: { control: 'number' },
    size: { control: 'select', options: progressSizes },
    value: { control: 'number' },
    variant: { control: 'select', options: progressVariants },
  },
} satisfies Meta<typeof ProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
