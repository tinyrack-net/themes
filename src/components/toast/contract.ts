export const toastViewportClassName = 'tr-toast-viewport';
export const toastClassName = 'tr-toast';
export const toastTitleClassName = 'tr-toast-title';
export const toastDescriptionClassName = 'tr-toast-description';
export const toastActionClassName = 'tr-toast-action';
export const toastCloseClassName = 'tr-toast-close';

export const toastVariants = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
] as const;
export const toastPositions = [
  'block-start-inline-start',
  'block-start-center',
  'block-start-inline-end',
  'block-end-inline-start',
  'block-end-center',
  'block-end-inline-end',
] as const;

export type ToastVariant = (typeof toastVariants)[number];
export type ToastPosition = (typeof toastPositions)[number];

export const toastContract = {
  defaultDuration: 5000,
  defaultPosition: 'block-end-inline-end' as ToastPosition,
} as const;

export const toastChangeEventName = 'tinyrack:toast-change' as const;

export type ToastChangeReason = 'show' | 'update' | 'dismiss' | 'action' | 'timeout';
export type ToastChangeDetail = {
  id: string;
  reason: ToastChangeReason;
};
