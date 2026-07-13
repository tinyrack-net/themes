import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Progress,
  type ProgressSize,
  type ProgressVariant,
} from '../../src/components/progress/index.js';

type ProgressStoryArgs = {
  label: string;
  size: ProgressSize;
  value: number;
  variant: ProgressVariant;
};

const meta = {
  title: 'Components/Progress',
  parameters: { layout: 'centered' },
  args: { label: 'Deployment', size: 'md', value: 68, variant: 'success' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: ({ label, ...props }) => (
    <Progress.Root className="w-96 max-w-full" {...props}>
      <Progress.Label>{label}</Progress.Label>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
      <Progress.Value />
    </Progress.Root>
  ),
} satisfies Meta<ProgressStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
