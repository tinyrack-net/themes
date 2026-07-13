import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from '../../src/components/fieldset/index.js';

type StoryArgs = {
  legend: string;
  disabled: boolean;
};

export function FieldsetPreview({ legend, disabled }: StoryArgs) {
  return (
    <Fieldset.Root disabled={disabled}>
      <Fieldset.Legend>{legend}</Fieldset.Legend>
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Email alerts
      </label>
    </Fieldset.Root>
  );
}

const meta = {
  title: 'Components/Fieldset',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    legend: 'Notifications',
    disabled: false,
  },
  argTypes: {
    legend: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <FieldsetPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
