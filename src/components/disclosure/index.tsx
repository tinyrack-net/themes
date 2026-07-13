import { DisclosurePanel } from './disclosure-panel.js';
import { DisclosureRoot } from './disclosure-root.js';
import { DisclosureTrigger } from './disclosure-trigger.js';

export const Disclosure = {
  Root: DisclosureRoot,
  Trigger: DisclosureTrigger,
  Panel: DisclosurePanel,
} as const;

export type { DisclosurePanelProps } from './disclosure-panel.js';
export type { DisclosureRootProps } from './disclosure-root.js';
export type { DisclosureTriggerProps } from './disclosure-trigger.js';
export { DisclosurePanel, DisclosureRoot, DisclosureTrigger };
