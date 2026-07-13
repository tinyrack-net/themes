import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from '../../src/components/collapsible/index.js';

type CollapsibleStoryArgs = { disabled: boolean; open: boolean; trigger: string };

const meta = {
  title: 'Components/Collapsible',
  parameters: { layout: 'centered' },
  args: { disabled: false, open: false, trigger: 'Advanced settings' },
  argTypes: {
    disabled: { control: 'boolean' },
    open: { control: 'boolean' },
    trigger: { control: 'text' },
  },
  render: ({ disabled, open, trigger }) => (
    <Collapsible.Root
      className="w-96 max-w-full"
      defaultOpen={open}
      disabled={disabled}
      key={`${open}-${disabled}`}
    >
      <Collapsible.Trigger>{trigger}</Collapsible.Trigger>
      <Collapsible.Panel>Retry and timeout controls.</Collapsible.Panel>
    </Collapsible.Root>
  ),
} satisfies Meta<CollapsibleStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
