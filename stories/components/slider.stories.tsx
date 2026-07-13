import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../../src/components/slider/index.js';

type StoryArgs = {
  label: string;
  value: number;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
};

export function SliderPreview({ label, value, disabled, orientation }: StoryArgs) {
  return (
    <Slider.Root disabled={disabled} orientation={orientation} value={[value]}>
      <Slider.Label>{label}</Slider.Label>
      <Slider.Value />
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  );
}

const meta = {
  title: 'Components/Slider',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Volume',
    value: 48,
    disabled: false,
    orientation: 'horizontal',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'number', min: 0, max: 100 } },
    disabled: { control: 'boolean' },
    orientation: { options: ['horizontal', 'vertical'], control: 'radio' },
  },
  render: (args) => <SliderPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
