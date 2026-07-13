import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '../../src/components/radio/index.js';
import { RadioGroup } from '../../src/components/radio-group/index.js';

type StoryArgs = {
  label: string;
  selected: boolean;
  disabled: boolean;
};

export function RadioPreview({ label, selected, disabled }: StoryArgs) {
  return (
    <RadioGroup value={selected ? 'primary' : ''}>
      <div className="flex items-center gap-2">
        <Radio.Root aria-label={label} disabled={disabled} value="primary">
          <Radio.Indicator />
        </Radio.Root>
        {label}
      </div>
    </RadioGroup>
  );
}

const meta = {
  title: 'Components/Radio',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Primary rack',
    selected: true,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <RadioPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
