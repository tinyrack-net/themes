import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '../../src/components/radio/index.js';
import { RadioGroup } from '../../src/components/radio-group/index.js';

type StoryArgs = {
  value: string;
  disabled: boolean;
};

export function RadioGroupPreview({ value, disabled }: StoryArgs) {
  return (
    <RadioGroup aria-label="Rack" disabled={disabled} value={value}>
      <div className="flex items-center gap-2">
        <Radio.Root aria-label="Alpha" value="alpha">
          <Radio.Indicator />
        </Radio.Root>
        Alpha
      </div>
      <div className="flex items-center gap-2">
        <Radio.Root aria-label="Beta" value="beta">
          <Radio.Indicator />
        </Radio.Root>
        Beta
      </div>
    </RadioGroup>
  );
}

const meta = {
  title: 'Components/Radio Group',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    value: 'alpha',
    disabled: false,
  },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <RadioGroupPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
