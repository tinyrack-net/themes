'use client';

import { Meter as BaseMeter } from '@base-ui/react/meter';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type MeterVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type MeterRootProps = ComponentProps<typeof BaseMeter.Root> & {
  variant?: MeterVariant;
};

export function MeterRoot({
  className,
  variant = 'neutral',
  ...props
}: MeterRootProps) {
  return (
    <BaseMeter.Root
      {...props}
      className={mergeComponentClassName('tr-meter', className)}
      data-variant={variant}
    />
  );
}
