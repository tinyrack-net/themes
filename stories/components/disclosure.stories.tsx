import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclosure } from '../../src/components/disclosure/index.js';

type DisclosureStoryArgs = { disabled: boolean; open: boolean; trigger: string };

const meta = {
  title: 'Components/Disclosure',
  parameters: { layout: 'centered' },
  args: { disabled: false, open: false, trigger: 'Advanced settings' },
  argTypes: {
    disabled: { control: 'boolean' },
    open: { control: 'boolean' },
    trigger: { control: 'text' },
  },
  render: ({ disabled, open, trigger }) => (
    <Disclosure.Root
      className="w-96 max-w-full"
      defaultOpen={open}
      disabled={disabled}
      key={`${open}-${disabled}`}
    >
      <Disclosure.Trigger>{trigger}</Disclosure.Trigger>
      <Disclosure.Panel>Retry and timeout controls.</Disclosure.Panel>
    </Disclosure.Root>
  ),
} satisfies Meta<DisclosureStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
