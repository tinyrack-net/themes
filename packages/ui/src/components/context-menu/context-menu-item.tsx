'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type ContextMenuItemVariant = 'default' | 'danger';
export type ContextMenuItemProps = ComponentProps<typeof BaseContextMenu.Item> & {
  variant?: ContextMenuItemVariant;
};

export function ContextMenuItem({
  className,
  variant = 'default',
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      {...props}
      className={mergeComponentClassName('tr-context-menu-item', className)}
      data-variant={variant}
    />
  );
}
