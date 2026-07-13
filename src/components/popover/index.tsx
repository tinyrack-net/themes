import { PopoverClose } from './popover-close.js';
import { PopoverDescription } from './popover-description.js';
import { PopoverPopup } from './popover-popup.js';
import { PopoverPortal } from './popover-portal.js';
import { PopoverPositioner } from './popover-positioner.js';
import { PopoverRoot } from './popover-root.js';
import { PopoverTitle } from './popover-title.js';
import { PopoverTrigger } from './popover-trigger.js';

export const Popover: {
  Root: typeof PopoverRoot;
  Trigger: typeof PopoverTrigger;
  Portal: typeof PopoverPortal;
  Positioner: typeof PopoverPositioner;
  Popup: typeof PopoverPopup;
  Title: typeof PopoverTitle;
  Description: typeof PopoverDescription;
  Close: typeof PopoverClose;
} = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
} as const;

export type { PopoverCloseProps } from './popover-close.js';
export type { PopoverDescriptionProps } from './popover-description.js';
export type { PopoverPopupProps } from './popover-popup.js';
export type { PopoverPortalProps } from './popover-portal.js';
export type { PopoverPositionerProps } from './popover-positioner.js';
export type { PopoverRootProps } from './popover-root.js';
export type { PopoverTitleProps } from './popover-title.js';
export type { PopoverTriggerProps } from './popover-trigger.js';
export {
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
};
