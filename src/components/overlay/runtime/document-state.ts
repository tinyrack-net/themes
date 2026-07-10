import { dataBoolean } from './options.js';
import type { OverlayEntry, ScrollLockSnapshot } from './types.js';

export function createDocumentStateController(document: Document) {
  let scrollLockSnapshot: ScrollLockSnapshot | null = null;

  function update(entries: readonly OverlayEntry[]) {
    const modalEntries = entries.filter((entry) => entry.kind === 'modal');

    for (const entry of modalEntries) {
      entry.element.removeAttribute('data-topmost');
    }
    modalEntries.at(-1)?.element.setAttribute('data-topmost', 'true');

    const shouldLockScroll = modalEntries.some((entry) =>
      dataBoolean(entry.element, 'preventScroll', true),
    );
    const root = document.documentElement;

    if (shouldLockScroll && scrollLockSnapshot === null) {
      scrollLockSnapshot = {
        overflow: root.style.overflow,
        scrollbarGutter: root.style.scrollbarGutter,
      };
      root.style.overflow = 'hidden';
      root.style.scrollbarGutter = 'stable';
      root.setAttribute('data-tr-modal-open', 'true');
    } else if (!shouldLockScroll && scrollLockSnapshot !== null) {
      root.style.overflow = scrollLockSnapshot.overflow;
      root.style.scrollbarGutter = scrollLockSnapshot.scrollbarGutter;
      root.removeAttribute('data-tr-modal-open');
      scrollLockSnapshot = null;
    }
  }

  return { update };
}
