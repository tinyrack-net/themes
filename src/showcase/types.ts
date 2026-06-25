import type { ReactElement } from 'react';

export type ShowcaseLibrary = 'mantine' | 'daisyui';

export type ShowcaseEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  render: () => ReactElement;
};
