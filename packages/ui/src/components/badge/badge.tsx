import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type BadgeUiSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeProps = ComponentProps<'span'> & {
  uiSize?: BadgeUiSize;
  variant?: BadgeVariant;
};

export function Badge({
  className,
  uiSize = 'md',
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={mergeClassNames('tr-badge', className)}
      data-ui-size={uiSize}
      data-variant={variant}
    />
  );
}
