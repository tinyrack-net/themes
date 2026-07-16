'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type FieldUiSize = 'sm' | 'md' | 'lg';
export type FieldRootProps = ComponentProps<typeof BaseField.Root> & {
  uiSize?: FieldUiSize;
};

export function FieldRoot({ className, uiSize = 'md', ...props }: FieldRootProps) {
  return (
    <BaseField.Root
      {...props}
      className={mergeComponentClassName('tr-field', className)}
      data-ui-size={uiSize}
    />
  );
}
