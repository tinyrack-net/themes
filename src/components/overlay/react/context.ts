import { createContext, type MutableRefObject, useContext } from 'react';
import type { LayerMode, LayerPlacement } from '../contract.js';
import type { OpenState } from './state.js';

export function requireOverlayContext<T>(
  context: T | null,
  componentName: string,
  ownerName: string,
) {
  if (context === null) {
    throw new Error(`${componentName} must be used within ${ownerName}.`);
  }

  return context;
}

export type ModalContextValue = OpenState & {
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  descriptionId: string;
  descriptionPresent: boolean;
  id: string;
  preventScroll: boolean;
  setDescriptionPresent: (present: boolean) => void;
  titleId: string;
  triggerRef: MutableRefObject<HTMLElement | null>;
};

export type LayerContextValue = OpenState & {
  anchorRef: MutableRefObject<HTMLElement | null>;
  closeOnEscape: boolean;
  collisionPadding: number;
  id: string;
  matchAnchorWidth: boolean;
  mode: LayerMode;
  offset: number;
  placement: LayerPlacement;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
export const LayerContext = createContext<LayerContextValue | null>(null);

export function useModalContext(componentName: string) {
  return requireOverlayContext(useContext(ModalContext), componentName, 'Modal');
}

export function useLayerContext(componentName: string) {
  return requireOverlayContext(useContext(LayerContext), componentName, 'Layer');
}
