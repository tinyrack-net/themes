'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type TabsUiSize = 'sm' | 'md' | 'lg';
export type TabsRootProps = ComponentProps<typeof BaseTabs.Root> & {
  uiSize?: TabsUiSize;
};

export function TabsRoot({ className, uiSize = 'md', ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root
      {...props}
      className={mergeComponentClassName('tr-tabs', className)}
      data-ui-size={uiSize}
    />
  );
}
