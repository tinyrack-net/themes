import { ModalBackdrop } from './modal-backdrop.js';
import { ModalClose } from './modal-close.js';
import { ModalDescription } from './modal-description.js';
import { ModalPopup } from './modal-popup.js';
import { ModalPortal } from './modal-portal.js';
import { ModalRoot } from './modal-root.js';
import { ModalTitle } from './modal-title.js';
import { ModalTrigger } from './modal-trigger.js';

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Backdrop: ModalBackdrop,
  Popup: ModalPopup,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
} as const;

export type { ModalBackdropProps } from './modal-backdrop.js';
export type { ModalCloseProps } from './modal-close.js';
export type { ModalDescriptionProps } from './modal-description.js';
export type {
  ModalPlacement,
  ModalPopupProps,
  ModalSize,
} from './modal-popup.js';
export type { ModalPortalProps } from './modal-portal.js';
export type { ModalRootProps } from './modal-root.js';
export type { ModalTitleProps } from './modal-title.js';
export type { ModalTriggerProps } from './modal-trigger.js';
export {
  ModalBackdrop,
  ModalClose,
  ModalDescription,
  ModalPopup,
  ModalPortal,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
};
