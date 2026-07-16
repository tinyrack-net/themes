'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { ComponentPropsWithRef } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type CheckboxUiSize = 'sm' | 'md' | 'lg';
export type CheckboxRootProps = ComponentPropsWithRef<typeof BaseCheckbox.Root> & {
  uiSize?: CheckboxUiSize;
};

export function CheckboxRoot({
  className,
  uiSize = 'md',
  ...props
}: CheckboxRootProps) {
  return (
    <BaseCheckbox.Root
      {...props}
      className={mergeComponentClassName('tr-checkbox', className)}
      data-ui-size={uiSize}
    />
  );
}
