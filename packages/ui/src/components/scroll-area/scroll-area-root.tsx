'use client';

import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type ScrollAreaVariant = 'surface' | 'plain';
export type ScrollAreaRootProps = ComponentProps<typeof BaseScrollArea.Root> & {
  variant?: ScrollAreaVariant;
};

export function ScrollAreaRoot({
  className,
  variant = 'surface',
  ...props
}: ScrollAreaRootProps) {
  return (
    <BaseScrollArea.Root
      {...props}
      className={mergeComponentClassName('tr-scroll-area', className)}
      data-variant={variant}
    />
  );
}
