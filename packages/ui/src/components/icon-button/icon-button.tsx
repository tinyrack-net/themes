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

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <Button {...props} className={mergeComponentClassName('tr-icon-btn', className)} />
  );
}
