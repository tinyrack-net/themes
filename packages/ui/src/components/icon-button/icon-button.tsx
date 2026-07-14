'use client';

import type { ReactNode } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';
import { Button, type ButtonProps } from '../button/index.js';

type IconButtonAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string };

export type IconButtonProps = Omit<
  ButtonProps,
  'aria-label' | 'aria-labelledby' | 'children'
> &
  IconButtonAccessibleName & {
    children: ReactNode;
  };

export function IconButton({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  loading,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      {...(!loading && ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {})}
      {...(loading === undefined ? {} : { loading })}
      className={mergeComponentClassName('tr-icon-btn', className)}
    >
      {loading ? null : children}
    </Button>
  );
}
