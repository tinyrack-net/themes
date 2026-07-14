import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ContextMenuSeparatorProps = ComponentProps<
  typeof BaseContextMenu.Separator
>;
export const ContextMenuSeparator = createComponentPart(
  BaseContextMenu.Separator,
  'tr-separator tr-context-menu-separator',
);
