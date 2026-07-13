'use client';

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type DisclosureTriggerProps = ComponentProps<typeof BaseCollapsible.Trigger>;
export const DisclosureTrigger = createComponentPart(
  BaseCollapsible.Trigger,
  'tr-disclosure-summary',
);
