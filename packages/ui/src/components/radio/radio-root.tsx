'use client';

import { Radio as BaseRadio } from '@base-ui/react/radio';
import type { ComponentPropsWithRef } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type RadioUiSize = 'sm' | 'md' | 'lg';
export type RadioRootProps = ComponentPropsWithRef<typeof BaseRadio.Root> & {
  uiSize?: RadioUiSize;
};

export function RadioRoot({ className, uiSize = 'md', ...props }: RadioRootProps) {
  return (
    <BaseRadio.Root
      {...props}
      className={mergeComponentClassName('tr-radio', className)}
      data-ui-size={uiSize}
    />
  );
}
