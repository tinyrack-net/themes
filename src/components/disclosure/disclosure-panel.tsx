'use client';

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type DisclosurePanelProps = ComponentProps<typeof BaseCollapsible.Panel>;
export const DisclosurePanel = createComponentPart(
  BaseCollapsible.Panel,
  'tr-disclosure-content',
);
