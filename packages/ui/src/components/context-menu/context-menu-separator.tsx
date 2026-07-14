import { createComponentPart } from '../../internal/component-part.js';
import type { SeparatorProps } from '../separator/index.js';
import { Separator } from '../separator/index.js';

export type ContextMenuSeparatorProps = SeparatorProps;
export const ContextMenuSeparator = createComponentPart(
  Separator,
  'tr-context-menu-separator',
);
