import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type AppShellHeaderProps = ComponentProps<'header'>;

export function AppShellHeader({ className, ...props }: AppShellHeaderProps) {
  return (
    <header {...props} className={mergeClassNames('tr-app-shell-header', className)} />
  );
}
