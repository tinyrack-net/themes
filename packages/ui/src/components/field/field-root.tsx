'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type FieldSize = 'sm' | 'md' | 'lg';
export type FieldRootProps = ComponentProps<typeof BaseField.Root> & {
  size?: FieldSize;
};

export function FieldRoot({ className, size = 'md', ...props }: FieldRootProps) {
  return (
    <BaseField.Root
      {...props}
      className={mergeComponentClassName('tr-field', className)}
      data-size={size}
    />
  );
}
