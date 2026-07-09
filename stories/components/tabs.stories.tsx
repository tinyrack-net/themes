import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  type TabsActivationMode,
  type TabsOrientation,
  type TabsSize,
  tabsActivationModes,
  tabsOrientations,
  tabsSizes,
} from '../../src/components/tabs/contract.js';
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from '../../src/components/tabs/react.js';

const tabValues = ['overview', 'metrics', 'logs'] as const;

type ComponentStoryProps = {
  activationMode: TabsActivationMode;
  defaultValue: (typeof tabValues)[number];
  orientation: TabsOrientation;
  size: TabsSize;
};

function TabsStory({
  activationMode,
  defaultValue,
  orientation,
  size,
}: ComponentStoryProps) {
  return (
    <Tabs
      activationMode={activationMode}
      defaultValue={defaultValue}
      key={`${activationMode}-${defaultValue}-${orientation}-${size}`}
      orientation={orientation}
      size={size}
    >
      <TabsList aria-label="Rack sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsPanel value="overview">
        Rack A is healthy with deployments enabled and backup checks passing.
      </TabsPanel>
      <TabsPanel value="metrics">
        CPU 41%, memory 62%, and request latency holding at 48 ms p95.
      </TabsPanel>
      <TabsPanel value="logs">
        03:18 backup completed, 03:22 health probe passed, 03:30 deploy queued.
      </TabsPanel>
    </Tabs>
  );
}

TabsStory.displayName = 'TabsStory';

const meta = {
  title: 'Components/Tabs',
  component: TabsStory,
  args: {
    activationMode: 'automatic',
    defaultValue: 'overview',
    orientation: 'horizontal',
    size: 'md',
  },
  argTypes: {
    activationMode: {
      control: 'select',
      options: tabsActivationModes,
      description: 'Keyboard activation behavior after roving focus changes.',
    },
    defaultValue: {
      control: 'select',
      options: tabValues,
      description: 'Initially selected tab for the uncontrolled example.',
    },
    orientation: {
      control: 'select',
      options: tabsOrientations,
      description: 'Tab list direction and arrow-key mapping.',
    },
    size: {
      control: 'select',
      options: tabsSizes,
      description: 'Tailwind scale-backed tab control size.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CSS-first Tinyrack Tabs rendered through React compound components.',
      },
    },
  },
} satisfies Meta<typeof TabsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
