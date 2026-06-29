import type { ReactElement } from 'react';

export type ShowcaseLibrary = 'mantine' | 'daisyui';

export type ShowcaseStoryKind =
  | 'default'
  | 'variants'
  | 'sizes'
  | 'states'
  | 'examples';

export type ShowcaseStoryDefinition = {
  id: ShowcaseStoryKind;
  exportName: string;
  name: string;
  description: string;
  render: () => ReactElement;
};

/** @deprecated Use ShowcaseStoryKind instead. */
export type ShowcaseScenarioId =
  | ShowcaseStoryKind
  | 'preview'
  | 'composition'
  | 'tokens'
  | 'accessibility'
  | 'playground';

/** @deprecated Use ShowcaseStoryDefinition instead. */
export type ShowcaseScenario = ShowcaseStoryDefinition;

export type ShowcaseEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  render: () => ReactElement;
  storyKinds?: ShowcaseStoryKind[];
};
