import { modalTitleClassName } from '../contract.js';
import { isHTMLElement, isOverlayOpen } from './native.js';
import type { OverlayEntry } from './types.js';

export function mergeUniqueElements(elements: Array<HTMLElement | null>) {
  const unique = new Set<HTMLElement>();

  for (const element of elements) {
    if (element !== null) {
      unique.add(element);
    }
  }

  return Array.from(unique);
}

export function createFocusController(
  document: Document,
  closestOverlay: (element: Element | null) => HTMLElement | null,
) {
  function track(event: FocusEvent, entries: readonly OverlayEntry[]) {
    if (!isHTMLElement(event.target)) {
      return;
    }

    for (const entry of entries.slice().reverse()) {
      if (entry.element.contains(event.target)) {
        entry.lastFocused = event.target;
        return;
      }
    }
  }

  function isFocusCandidate(element: HTMLElement) {
    if (
      !element.isConnected ||
      element.hidden ||
      element.getAttribute('aria-hidden') === 'true' ||
      element.closest('[inert]') !== null ||
      element.getClientRects().length === 0
    ) {
      return false;
    }

    if (
      (element instanceof HTMLButtonElement ||
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement) &&
      element.disabled
    ) {
      return false;
    }

    const overlay = closestOverlay(element);
    return overlay === null || isOverlayOpen(overlay);
  }

  function restore(entry: OverlayEntry, entries: readonly OverlayEntry[]) {
    const activeElement = isHTMLElement(document.activeElement)
      ? document.activeElement
      : null;

    if (
      activeElement !== null &&
      activeElement !== document.body &&
      !entry.element.contains(activeElement) &&
      isFocusCandidate(activeElement)
    ) {
      return;
    }

    const topModal = entries
      .slice()
      .reverse()
      .find((candidate) => candidate.kind === 'modal');
    const candidates = mergeUniqueElements([
      ...entry.restoreCandidates,
      topModal?.lastFocused ?? null,
      topModal?.element.querySelector<HTMLElement>(`.${modalTitleClassName}`) ?? null,
    ]);

    candidates
      .find((candidate) => isFocusCandidate(candidate))
      ?.focus({ preventScroll: true });
  }

  return { isFocusCandidate, restore, track };
}
