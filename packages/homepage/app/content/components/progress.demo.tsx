import {
  Progress,
  type ProgressSize,
  type ProgressVariant,
} from '@tinyrack/ui/components/progress';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type ProgressStoryArgs = {
  format: 'number' | 'percent';
  indeterminate: boolean;
  label: string;
  max: number;
  min: number;
  size: ProgressSize;
  value: number;
  variant: ProgressVariant;
};

const meta = {
  title: 'Components/Progress',
  parameters: { layout: 'centered' },
  args: {
    format: 'percent',
    indeterminate: false,
    label: 'Deployment',
    max: 100,
    min: 0,
    size: 'md',
    value: 68,
    variant: 'success',
  },
  argTypes: {
    format: { control: 'select', options: ['number', 'percent'] },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    max: { control: 'number' },
    min: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: ({ format, indeterminate, label, max, min, value, ...props }) => {
    const normalizedMax = Math.max(min + 1, max);
    const normalizedValue = Math.min(normalizedMax, Math.max(min, value));
    return (
      <Progress.Root
        className="w-96 max-w-full"
        format={format === 'percent' ? { style: 'unit', unit: 'percent' } : {}}
        max={normalizedMax}
        min={min}
        value={indeterminate ? null : normalizedValue}
        {...props}
      >
        <Progress.Label>{label}</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
        {indeterminate ? null : <Progress.Value />}
      </Progress.Root>
    );
  },
} satisfies Meta<ProgressStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
