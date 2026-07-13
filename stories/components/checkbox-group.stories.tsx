import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../src/components/checkbox/index.js';
import { CheckboxGroup } from '../../src/components/checkbox-group/index.js';

type StoryArgs = {
  disabled: boolean;
  selected: boolean;
  label: string;
};

export function CheckboxGroupPreview({ disabled, selected, label }: StoryArgs) {
  return (
    <CheckboxGroup
      aria-label={label}
      disabled={disabled}
      value={selected ? ['metrics'] : []}
    >
      <div className="flex items-center gap-2">
        <Checkbox.Root aria-label="Metrics" value="metrics">
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Root>
        Metrics
      </div>
    </CheckboxGroup>
  );
}

const meta = {
  title: 'Components/Checkbox Group',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    selected: true,
    label: 'Rack features',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => <CheckboxGroupPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
