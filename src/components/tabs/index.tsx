import { TabsList } from './tabs-list.js';
import { TabsPanel } from './tabs-panel.js';
import { TabsRoot } from './tabs-root.js';
import { TabsTrigger } from './tabs-trigger.js';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
} as const;

export type { TabsListProps } from './tabs-list.js';
export type { TabsPanelProps } from './tabs-panel.js';
export type { TabsRootProps, TabsSize } from './tabs-root.js';
export type { TabsTriggerProps } from './tabs-trigger.js';
export { TabsList, TabsPanel, TabsRoot, TabsTrigger };
