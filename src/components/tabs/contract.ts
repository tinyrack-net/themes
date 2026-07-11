export const tabsClassName = 'tr-tabs';
export const tabsListClassName = 'tr-tabs-list';
export const tabsTriggerClassName = 'tr-tabs-trigger';
export const tabsPanelClassName = 'tr-tabs-panel';

export const tabsSizes = ['sm', 'md', 'lg'] as const;
export const tabsOrientations = ['horizontal', 'vertical'] as const;
export const tabsActivationModes = ['automatic', 'manual'] as const;

export type TabsSize = (typeof tabsSizes)[number];
export type TabsOrientation = (typeof tabsOrientations)[number];
export type TabsActivationMode = (typeof tabsActivationModes)[number];

export const tabsContract = {
  defaultActivationMode: 'automatic',
  defaultOrientation: 'horizontal',
  defaultSize: 'md',
} as const satisfies {
  defaultActivationMode: TabsActivationMode;
  defaultOrientation: TabsOrientation;
  defaultSize: TabsSize;
};

export const tabsChangeEventName = 'tinyrack:tabs-change' as const;

export type TabsChangeDetail = {
  root: HTMLElement;
  trigger: HTMLElement;
  value: string;
};
