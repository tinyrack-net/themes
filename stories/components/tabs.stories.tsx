import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type TabsSize } from '../../src/components/tabs/index.js';

type TabsStoryArgs = {
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  selected: 'activity' | 'network' | 'overview' | 'settings' | 'storage';
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
    selected: {
      control: 'select',
      options: ['overview', 'network', 'storage', 'activity', 'settings'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: ({ disabled, orientation, selected, size }) => (
    <Tabs.Root
      className="w-[36rem] max-w-full"
      key={selected}
      defaultValue={selected}
      orientation={orientation}
      size={size}
    >
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="network">Network</Tabs.Tab>
        <Tabs.Tab value="storage">Storage</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab disabled={disabled} value="logs">
          Logs
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">All systems operational.</Tabs.Panel>
      <Tabs.Panel value="network">10 Gbps uplink.</Tabs.Panel>
      <Tabs.Panel value="storage">4.2 TB available.</Tabs.Panel>
      <Tabs.Panel value="activity">No recent alerts.</Tabs.Panel>
      <Tabs.Panel value="settings">Automatic updates enabled.</Tabs.Panel>
      <Tabs.Panel value="logs">Log stream.</Tabs.Panel>
    </Tabs.Root>
  ),
} satisfies Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
