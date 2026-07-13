import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'current' | 'muted' | 'primary' | 'danger';
export type SpinnerProps = Omit<ComponentProps<'span'>, 'role'> & {
  label?: string;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
};

export function Spinner({
  className,
  label = 'Loading',
  size = 'md',
  variant = 'current',
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      aria-label={label}
      className={mergeClassNames('tr-spinner', className)}
      data-size={size}
      data-variant={variant}
      role="status"
    />
  );
}
