'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type TabsTriggerProps = ComponentProps<typeof BaseTabs.Tab>;
export const TabsTrigger = createComponentPart(BaseTabs.Tab, 'tr-tabs-trigger');
