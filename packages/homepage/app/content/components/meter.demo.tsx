import { Meter, type MeterVariant } from '@tinyrack/ui/components/meter';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type StoryArgs = {
  label: string;
  max: number;
  min: number;
  unit: 'byte' | 'gigabyte' | 'megabyte';
  value: number;
  variant: MeterVariant;
};

export function MeterPreview({ label, max, min, unit, value, variant }: StoryArgs) {
  const format = { style: 'unit' as const, unit, unitDisplay: 'short' as const };
  const normalizedMin = Number.isFinite(min) ? min : 0;
  const normalizedMax = Math.max(normalizedMin + 1, Number.isFinite(max) ? max : 100);
  const normalizedValue = Math.min(
    normalizedMax,
    Math.max(normalizedMin, Number.isFinite(value) ? value : normalizedMin),
  );

  return (
    <Meter.Root
      format={format}
      max={normalizedMax}
      min={normalizedMin}
      value={normalizedValue}
      variant={variant}
    >
      <Meter.Label>{label}</Meter.Label>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      <Meter.Value />
    </Meter.Root>
  );
}

export function MeterVariantMatrix() {
  const variants: MeterVariant[] = ['neutral', 'info', 'success', 'warning', 'danger'];
  return (
    <div className="grid w-full gap-4">
      {variants.map((variant, index) => (
        <Meter.Root key={variant} value={20 + index * 16} variant={variant}>
          <Meter.Label>{variant}</Meter.Label>
          <Meter.Value />
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      ))}
    </div>
  );
}

export function MeterCustomRangePreview() {
  return (
    <Meter.Root
      format={{ style: 'unit', unit: 'celsius', unitDisplay: 'short' }}
      getAriaValueText={(formatted) => `${formatted} within the safe temperature range`}
      max={80}
      min={20}
      value={50}
      variant="success"
    >
      <Meter.Label>Rack inlet temperature range</Meter.Label>
      <Meter.Value />
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
    </Meter.Root>
  );
}

const meta = {
  title: 'Components/Meter',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Storage usage',
    max: 128,
    min: 0,
    unit: 'gigabyte',
    value: 64,
    variant: 'info',
  },
  argTypes: {
    label: { control: 'text' },
    max: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    unit: { control: 'select', options: ['byte', 'megabyte', 'gigabyte'] },
    value: { control: { type: 'number' } },
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
  },
  render: (args) => <MeterPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
