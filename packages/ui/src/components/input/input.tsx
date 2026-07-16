'use client';

import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentPropsWithRef } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type InputUiSize = 'sm' | 'md' | 'lg';
export type InputProps = ComponentPropsWithRef<typeof BaseInput> & {
  uiSize?: InputUiSize;
};

export function Input({ className, uiSize = 'md', ...props }: InputProps) {
  return (
    <BaseInput
      {...props}
      className={mergeComponentClassName('tr-input', className)}
      data-ui-size={uiSize}
    />
  );
}
