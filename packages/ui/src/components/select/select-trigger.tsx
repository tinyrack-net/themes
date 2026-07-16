'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import type { ComponentPropsWithRef } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type SelectTriggerUiSize = 'sm' | 'md' | 'lg';
export type SelectTriggerProps = ComponentPropsWithRef<typeof BaseSelect.Trigger> & {
  uiSize?: SelectTriggerUiSize;
};

const SelectTriggerPart = createComponentPart(BaseSelect.Trigger, 'tr-select-trigger');

export function SelectTrigger({
  className,
  uiSize = 'md',
  ...props
}: SelectTriggerProps) {
  return <SelectTriggerPart {...props} className={className} data-ui-size={uiSize} />;
}
