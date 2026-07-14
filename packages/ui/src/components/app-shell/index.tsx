import { AppShellClose } from './app-shell-close.js';
import { AppShellHeader } from './app-shell-header.js';
import { AppShellMain } from './app-shell-main.js';
import { AppShellRoot } from './app-shell-root.js';
import { AppShellSidebar } from './app-shell-sidebar.js';
import { AppShellTrigger } from './app-shell-trigger.js';

export const AppShell = {
  Close: AppShellClose,
  Header: AppShellHeader,
  Main: AppShellMain,
  Root: AppShellRoot,
  Sidebar: AppShellSidebar,
  Trigger: AppShellTrigger,
} as const;

export type { AppShellCloseProps } from './app-shell-close.js';
export type {
  AppShellBreakpoint,
  AppShellLayout,
} from './app-shell-context.js';
export type { AppShellHeaderProps } from './app-shell-header.js';
export type { AppShellMainProps } from './app-shell-main.js';
export type { AppShellRootProps } from './app-shell-root.js';
export type { AppShellSidebarProps } from './app-shell-sidebar.js';
export type { AppShellTriggerProps } from './app-shell-trigger.js';
export {
  AppShellClose,
  AppShellHeader,
  AppShellMain,
  AppShellRoot,
  AppShellSidebar,
  AppShellTrigger,
};
