import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type TabsSize } from '../../src/components/tabs/index.js';

type TabsStoryArgs = {
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  selected: 'overview' | 'network';
  size: TabsSize;
};

const meta = {
  title: 'Components/Tabs',
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    orientation: 'horizontal',
    selected: 'overview',
    size: 'md',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    selected: { control: 'select', options: ['overview', 'network'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: ({ disabled, orientation, selected, size }) => (
    <Tabs.Root
      className="w-96 max-w-full"
      key={selected}
      defaultValue={selected}
      orientation={orientation}
      size={size}
    >
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="network">Network</Tabs.Trigger>
        <Tabs.Trigger disabled={disabled} value="logs">
          Logs
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview">All systems operational.</Tabs.Panel>
      <Tabs.Panel value="network">10 Gbps uplink.</Tabs.Panel>
      <Tabs.Panel value="logs">Log stream.</Tabs.Panel>
    </Tabs.Root>
  ),
} satisfies Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
