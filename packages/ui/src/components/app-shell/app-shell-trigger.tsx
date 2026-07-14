'use client';

import { mergeComponentClassName } from '../../internal/component-class-name.js';
import { Drawer } from '../drawer/index.js';
import { IconButton, type IconButtonProps } from '../icon-button/index.js';
import { useAppShellContext } from './app-shell-context.js';

export type AppShellTriggerProps = IconButtonProps;

export function AppShellTrigger(props: AppShellTriggerProps) {
  const { drawerHandle } = useAppShellContext('Trigger');
  return (
    <Drawer.Trigger
      handle={drawerHandle}
      render={
        <IconButton
          {...props}
          className={mergeComponentClassName('tr-app-shell-trigger', props.className)}
        />
      }
    />
  );
}
