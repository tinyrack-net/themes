import type { OverlayOpenChangeDetail, OverlayOpenChangeReason } from '../contract.js';

export function createOverlayChangeEvent(
  document: Document,
  type: string,
  detail: OverlayOpenChangeDetail,
  cancelable: boolean,
) {
  const CustomEventConstructor = document.defaultView?.CustomEvent ?? CustomEvent;

  return new CustomEventConstructor<OverlayOpenChangeDetail>(type, {
    bubbles: true,
    cancelable,
    composed: true,
    detail,
  });
}

export function createOverlayDetail(
  overlay: HTMLElement,
  open: boolean,
  reason: OverlayOpenChangeReason,
  source: HTMLElement | null,
): OverlayOpenChangeDetail {
  return { open, overlay, reason, source };
}
