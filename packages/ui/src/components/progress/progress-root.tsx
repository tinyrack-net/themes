'use client';

import { Progress as BaseProgress } from '@base-ui/react/progress';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type ProgressUiSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type ProgressRootProps = ComponentProps<typeof BaseProgress.Root> & {
  uiSize?: ProgressUiSize;
  variant?: ProgressVariant;
};

export function ProgressRoot({
  className,
  uiSize = 'md',
  variant = 'neutral',
  ...props
}: ProgressRootProps) {
  return (
    <BaseProgress.Root
      {...props}
      className={mergeComponentClassName('tr-progress', className)}
      data-ui-size={uiSize}
      data-variant={variant}
    />
  );
}
