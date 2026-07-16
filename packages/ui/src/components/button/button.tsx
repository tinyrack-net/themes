'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';
import { Spinner } from '../spinner/index.js';

export type ButtonAppearance = 'solid' | 'outline' | 'ghost';
export type ButtonUiSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'secondary' | 'primary' | 'danger';
export type ButtonProps = ComponentProps<typeof BaseButton> & {
  appearance?: ButtonAppearance;
  loading?: boolean;
  loadingLabel?: string;
  uiSize?: ButtonUiSize;
  variant?: ButtonVariant;
};

export function Button({
  appearance = 'solid',
  children,
  className,
  disabled,
  loading = false,
  loadingLabel,
  uiSize = 'md',
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      aria-busy={loading || undefined}
      aria-label={loading ? (loadingLabel ?? props['aria-label']) : props['aria-label']}
      className={mergeComponentClassName('tr-btn', className)}
      data-appearance={appearance}
      data-ui-size={uiSize}
      data-variant={variant}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <Spinner decorative uiSize="sm" /> : null}
      {children}
    </BaseButton>
  );
}
