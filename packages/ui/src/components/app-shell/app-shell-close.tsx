'use client';

import { mergeComponentClassName } from '../../internal/component-class-name.js';
import { Drawer } from '../drawer/index.js';
import { IconButton, type IconButtonProps } from '../icon-button/index.js';
import { useAppShellContext } from './app-shell-context.js';

export type AppShellCloseProps = IconButtonProps;

export function AppShellClose({
  className,
  size = 'lg',
  ...props
}: AppShellCloseProps) {
  const { mobile } = useAppShellContext('Close');
  const button = (
    <IconButton
      {...props}
      className={mergeComponentClassName('tr-app-shell-close', className)}
      size={size}
    />
  );
  if (!mobile) return button;
  return <Drawer.Close render={button} />;
}
