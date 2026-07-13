import { TooltipArrow } from './tooltip-arrow.js';
import { TooltipPopup } from './tooltip-popup.js';
import { TooltipPortal } from './tooltip-portal.js';
import { TooltipPositioner } from './tooltip-positioner.js';
import { TooltipProvider } from './tooltip-provider.js';
import { TooltipRoot } from './tooltip-root.js';
import { TooltipTrigger } from './tooltip-trigger.js';

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
} as const;

export type { TooltipArrowProps } from './tooltip-arrow.js';
export type { TooltipPopupProps } from './tooltip-popup.js';
export type { TooltipPortalProps } from './tooltip-portal.js';
export type { TooltipPositionerProps } from './tooltip-positioner.js';
export type { TooltipProviderProps } from './tooltip-provider.js';
export type { TooltipRootProps } from './tooltip-root.js';
export type { TooltipTriggerProps } from './tooltip-trigger.js';
export {
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
};
