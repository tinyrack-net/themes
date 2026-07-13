import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from '../../src/components/meter/index.js';

type StoryArgs = {
  label: string;
  value: number;
};

export function MeterPreview({ label, value }: StoryArgs) {
  return (
    <Meter.Root max={100} min={0} value={value}>
      <Meter.Label>{label}</Meter.Label>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      <Meter.Value />
    </Meter.Root>
  );
}

const meta = {
  title: 'Components/Meter',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Storage usage',
    value: 64,
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'number', min: 0, max: 100 } },
  },
  render: (args) => <MeterPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
