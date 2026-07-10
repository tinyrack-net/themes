import { type LayerPlacement, layerPlacements } from '../contract.js';

export function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement;
}

export function isModal(element: HTMLElement): element is HTMLDialogElement {
  return element.tagName === 'DIALOG';
}

export function isLayer(element: HTMLElement) {
  return element.hasAttribute('popover');
}

export function isLayerPlacement(value: string): value is LayerPlacement {
  return layerPlacements.includes(value as LayerPlacement);
}

export function isModalOpen(element: HTMLDialogElement) {
  return element.open && element.matches(':modal');
}

export function isLayerOpen(element: HTMLElement) {
  return element.matches(':popover-open');
}

export function isOverlayOpen(element: HTMLElement) {
  return isModal(element) ? isModalOpen(element) : isLayerOpen(element);
}

export function openNativeOverlay(element: HTMLElement, source: HTMLElement | null) {
  if (isModal(element)) {
    if (element.open && !isModalOpen(element)) {
      element.close();
    }
    element.showModal();
    return true;
  }

  if (isLayer(element)) {
    element.showPopover(source === null ? undefined : { source });
    return true;
  }

  return false;
}

export function closeNativeOverlay(element: HTMLElement) {
  if (isModal(element)) {
    if (element.open) {
      element.close();
    }
    return true;
  }

  if (isLayer(element)) {
    if (isLayerOpen(element)) {
      element.hidePopover();
    }
    return true;
  }

  return false;
}
