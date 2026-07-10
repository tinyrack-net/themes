import type { OverlayOpenChangeReason } from '../contract.js';

export type OverlayKind = 'layer' | 'modal';

export type OverlayEntry = {
  cleanupPositioning: (() => void) | null;
  element: HTMLElement;
  kind: OverlayKind;
  lastFocused: HTMLElement | null;
  parent: HTMLElement | null;
  restoreCandidates: HTMLElement[];
  source: HTMLElement | null;
};

export type ScrollLockSnapshot = {
  overflow: string;
  scrollbarGutter: string;
};

export type OverlayIntent = {
  source: HTMLElement | null;
  target: HTMLElement;
  reason: OverlayOpenChangeReason;
  type: 'close' | 'open' | 'toggle';
};
