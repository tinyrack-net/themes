'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ContextMenuTriggerProps = ComponentProps<typeof BaseContextMenu.Trigger>;
type ContextMenuTriggerKeyDownEvent = Parameters<
  NonNullable<ContextMenuTriggerProps['onKeyDown']>
>[0];
const BaseTrigger = createComponentPart(
  BaseContextMenu.Trigger,
  'tr-context-menu-trigger',
);

export function ContextMenuTrigger({ onKeyDown, ...props }: ContextMenuTriggerProps) {
  function handleKeyDown(event: ContextMenuTriggerKeyDownEvent) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const isContextMenuKey = event.key === 'ContextMenu';
    const isShiftF10 = event.key === 'F10' && event.shiftKey;
    if (!isContextMenuKey && !isShiftF10) return;

    event.preventDefault();
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        button: 2,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      }),
    );
  }

  return <BaseTrigger {...props} onKeyDown={handleKeyDown} />;
}
