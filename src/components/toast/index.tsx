import { ToastAction } from './toast-action.js';
import { ToastClose } from './toast-close.js';
import { ToastDescription } from './toast-description.js';
import { ToastPortal } from './toast-portal.js';
import { ToastProvider } from './toast-provider.js';
import { ToastRoot } from './toast-root.js';
import { ToastTitle } from './toast-title.js';
import { ToastViewport } from './toast-viewport.js';

export const Toast: {
  Provider: typeof ToastProvider;
  Portal: typeof ToastPortal;
  Viewport: typeof ToastViewport;
  Root: typeof ToastRoot;
  Title: typeof ToastTitle;
  Description: typeof ToastDescription;
  Action: typeof ToastAction;
  Close: typeof ToastClose;
} = {
  Provider: ToastProvider,
  Portal: ToastPortal,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
} as const;

export type { ToastActionProps } from './toast-action.js';
export type { ToastCloseProps } from './toast-close.js';
export type { ToastDescriptionProps } from './toast-description.js';
export { createToastManager, useToastManager } from './toast-manager.js';
export type { ToastPortalProps } from './toast-portal.js';
export type { ToastProviderProps } from './toast-provider.js';
export type { ToastRootProps, ToastVariant } from './toast-root.js';
export type { ToastTitleProps } from './toast-title.js';
export type { ToastPosition, ToastViewportProps } from './toast-viewport.js';
export {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
};
