import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/dom';
import {
  type LayerPlacement,
  layerClassName,
  layerPlacements,
  modalBackdropClassName,
  modalClassName,
  type OverlayOpenChangeDetail,
  type OverlayOpenChangeReason,
  overlayBeforeChangeEventName,
  overlayChangeEventName,
  overlayContract,
} from './contract.js';

export type OverlayTarget = string | HTMLElement;

export type OverlayOpenOptions = {
  reason?: OverlayOpenChangeReason;
  source?: HTMLElement | null;
};

export type OverlayCloseOptions = {
  reason?: OverlayOpenChangeReason;
};

export type OverlayManager = {
  close: (target: OverlayTarget, options?: OverlayCloseOptions) => boolean;
  destroy: () => void;
  open: (target: OverlayTarget, options?: OverlayOpenOptions) => boolean;
  toggle: (target: OverlayTarget, options?: OverlayOpenOptions) => boolean;
};

type OverlayKind = 'layer' | 'modal';

type OverlayEntry = {
  cleanupPositioning: (() => void) | null;
  element: HTMLElement;
  kind: OverlayKind;
  lastFocused: HTMLElement | null;
  parent: HTMLElement | null;
  restoreCandidates: HTMLElement[];
  source: HTMLElement | null;
};

type ScrollLockSnapshot = {
  overflow: string;
  scrollbarGutter: string;
};

const sharedManagers = new WeakMap<Document, SharedOverlayManager>();
const forcedCloseReasons = new Set<OverlayOpenChangeReason>([
  'ancestor-close',
  'modal-open',
]);

function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

function isModal(element: HTMLElement): element is HTMLDialogElement {
  return element.tagName === 'DIALOG';
}

function isLayer(element: HTMLElement) {
  return element.hasAttribute('popover');
}

function isLayerPlacement(value: string): value is LayerPlacement {
  return layerPlacements.includes(value as LayerPlacement);
}

function mergeUniqueElements(elements: Array<HTMLElement | null>) {
  const unique = new Set<HTMLElement>();

  for (const element of elements) {
    if (element !== null) {
      unique.add(element);
    }
  }

  return Array.from(unique);
}

function dataBoolean(element: HTMLElement, name: string, fallback: boolean) {
  const value = element.dataset[name];

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return fallback;
}

function dataNumber(element: HTMLElement, name: string, fallback: number) {
  const value = Number(element.dataset[name]);

  return Number.isFinite(value) ? value : fallback;
}

function isModalOpen(element: HTMLDialogElement) {
  return element.open && element.matches(':modal');
}

function isLayerOpen(element: HTMLElement) {
  return element.matches(':popover-open');
}

function isOverlayOpen(element: HTMLElement) {
  return isModal(element) ? isModalOpen(element) : isLayerOpen(element);
}

function closestOverlay(element: Element | null) {
  const overlay = element?.closest<HTMLElement>(
    '[data-tr-overlay="modal"], [data-tr-overlay="layer"], .tr-modal, .tr-layer',
  );

  return overlay ?? null;
}

class SharedOverlayManager {
  private readonly document: Document;
  private readonly entries: OverlayEntry[] = [];
  private readonly synchronizing = new WeakSet<HTMLElement>();
  private observer: MutationObserver | null = null;
  private references = 0;
  private scrollLockSnapshot: ScrollLockSnapshot | null = null;

  constructor(document: Document) {
    this.document = document;
  }

  acquire() {
    this.references += 1;

    if (this.references === 1) {
      this.connect();
    }
  }

  release() {
    this.references = Math.max(0, this.references - 1);

    if (this.references === 0) {
      this.disconnect();
    }
  }

  open(target: OverlayTarget, options: OverlayOpenOptions = {}) {
    const element = this.resolveTarget(target);

    if (element === null || isOverlayOpen(element)) {
      return element !== null;
    }

    const reason = options.reason ?? 'programmatic';
    const source = options.source ?? this.findSource(element);

    if (!this.dispatchBeforeChange(element, true, reason, source)) {
      return false;
    }

    const activeElement = isHTMLElement(this.document.activeElement)
      ? this.document.activeElement
      : null;
    const directParent = this.findParentEntry(source ?? activeElement);
    const parent = isModal(element)
      ? this.nearestModalParent(directParent)
      : (directParent?.element ?? null);
    const restoreCandidates = mergeUniqueElements([
      source,
      activeElement,
      ...this.entries
        .slice()
        .reverse()
        .flatMap((entry) => [entry.lastFocused, entry.source]),
    ]);

    if (isModal(element)) {
      this.closeAllLayers('modal-open');
    }

    this.synchronizing.add(element);

    try {
      if (isModal(element)) {
        if (element.open && !isModalOpen(element)) {
          element.close();
        }
        element.showModal();
      } else if (isLayer(element)) {
        element.showPopover(source === null ? undefined : { source });
      } else {
        return false;
      }
    } catch {
      return false;
    } finally {
      queueMicrotask(() => this.synchronizing.delete(element));
    }

    this.register({
      cleanupPositioning: null,
      element,
      kind: isModal(element) ? 'modal' : 'layer',
      lastFocused: null,
      parent,
      restoreCandidates,
      source,
    });
    this.pruneClosedEntries();
    this.dispatchChange(element, true, reason, source);

    return true;
  }

  close(target: OverlayTarget, options: OverlayCloseOptions = {}) {
    const element = this.resolveTarget(target);

    if (element === null) {
      return false;
    }

    return this.closeElement(element, options.reason ?? 'programmatic');
  }

  toggle(target: OverlayTarget, options: OverlayOpenOptions = {}) {
    const element = this.resolveTarget(target);

    if (element === null) {
      return false;
    }

    if (isOverlayOpen(element)) {
      return this.closeElement(element, options.reason ?? 'trigger');
    }

    return this.open(
      element,
      options.source === undefined
        ? { reason: options.reason ?? 'trigger' }
        : {
            reason: options.reason ?? 'trigger',
            source: options.source,
          },
    );
  }

  private connect() {
    this.document.addEventListener('click', this.handleClick, true);
    this.document.addEventListener('keydown', this.handleKeyDown, true);
    this.document.addEventListener('cancel', this.handleCancel, true);
    this.document.addEventListener('close', this.handleNativeClose, true);
    this.document.addEventListener('toggle', this.handleToggle, true);
    this.document.addEventListener('focusin', this.handleFocusIn, true);

    const Observer = this.document.defaultView?.MutationObserver;
    if (Observer !== undefined) {
      this.observer = new Observer(this.handleMutations);
      this.observer.observe(this.document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    queueMicrotask(() => {
      for (const element of this.document.querySelectorAll<HTMLElement>(
        `dialog.${modalClassName}:modal, .${layerClassName}:popover-open`,
      )) {
        if (this.findEntry(element) === null) {
          this.register(this.createEntry(element, this.findSource(element)));
        }
      }

      for (const element of this.document.querySelectorAll<HTMLElement>(
        '[data-default-open="true"]',
      )) {
        this.open(element, {
          reason: 'programmatic',
          source: this.findSource(element),
        });
      }
    });
  }

  private disconnect() {
    this.document.removeEventListener('click', this.handleClick, true);
    this.document.removeEventListener('keydown', this.handleKeyDown, true);
    this.document.removeEventListener('cancel', this.handleCancel, true);
    this.document.removeEventListener('close', this.handleNativeClose, true);
    this.document.removeEventListener('toggle', this.handleToggle, true);
    this.document.removeEventListener('focusin', this.handleFocusIn, true);
    this.observer?.disconnect();
    this.observer = null;

    for (const entry of this.entries.slice().reverse()) {
      try {
        if (isModal(entry.element) && entry.element.open) {
          entry.element.close();
        } else if (entry.kind === 'layer' && isLayerOpen(entry.element)) {
          entry.element.hidePopover();
        }
      } catch {
        // A disconnected top-layer element only needs local cleanup.
      }
      entry.cleanupPositioning?.();
    }
    this.entries.length = 0;

    this.updateDocumentState();
  }

  private readonly handleClick = (event: Event) => {
    if (event.defaultPrevented || !(event.target instanceof Element)) {
      return;
    }

    const backdrop = event.target.closest<HTMLElement>(`.${modalBackdropClassName}`);
    if (backdrop !== null) {
      const modal = backdrop.closest<HTMLDialogElement>(`dialog.${modalClassName}`);
      if (modal !== null) {
        event.preventDefault();
        if (dataBoolean(modal, 'closeOnBackdrop', true)) {
          this.closeElement(modal, 'backdrop');
        }
        return;
      }
    }

    if (event.target.closest<HTMLElement>('[data-tr-react-trigger="true"]') !== null) {
      return;
    }

    const closeTrigger = event.target.closest<HTMLElement>('[data-tr-overlay-close]');
    if (closeTrigger !== null) {
      const overlay = closestOverlay(closeTrigger);
      if (overlay !== null) {
        event.preventDefault();
        this.closeElement(overlay, 'close-button');
        return;
      }
    }

    const commandTrigger = event.target.closest<HTMLElement>('[commandfor]');
    if (commandTrigger !== null) {
      const targetId = commandTrigger.getAttribute('commandfor');
      const action = commandTrigger.getAttribute('command') ?? 'show-modal';
      const target = targetId === null ? null : this.document.getElementById(targetId);

      if (isHTMLElement(target)) {
        event.preventDefault();

        if (action === 'close' || action === 'request-close') {
          this.closeElement(target, 'close-button');
        } else if (action === 'show-modal') {
          this.open(target, { reason: 'trigger', source: commandTrigger });
        }
        return;
      }
    }

    const popoverTrigger = event.target.closest<HTMLElement>('[popovertarget]');
    if (popoverTrigger === null) {
      return;
    }

    const targetId = popoverTrigger.getAttribute('popovertarget');
    const target = targetId === null ? null : this.document.getElementById(targetId);

    if (!isHTMLElement(target)) {
      return;
    }

    event.preventDefault();

    const action = popoverTrigger.getAttribute('popovertargetaction') ?? 'toggle';
    if (action === 'show') {
      this.open(target, { reason: 'trigger', source: popoverTrigger });
    } else if (action === 'hide') {
      this.closeElement(target, 'close-button');
    } else {
      this.toggle(target, { reason: 'trigger', source: popoverTrigger });
    }
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }

    this.pruneClosedEntries();
    const topEntry = this.entries.at(-1);

    if (topEntry?.kind !== 'layer') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (dataBoolean(topEntry.element, 'closeOnEscape', true)) {
      this.closeElement(topEntry.element, 'escape');
    }
  };

  private readonly handleCancel = (event: Event) => {
    if (!(event.target instanceof HTMLDialogElement)) {
      return;
    }

    event.preventDefault();
    this.pruneClosedEntries();

    const topEntry = this.entries.at(-1);
    if (topEntry?.element !== event.target) {
      return;
    }

    if (dataBoolean(event.target, 'closeOnEscape', true)) {
      this.closeElement(event.target, 'escape');
    }
  };

  private readonly handleNativeClose = (event: Event) => {
    if (!(event.target instanceof HTMLDialogElement)) {
      return;
    }

    const element = event.target;
    if (this.synchronizing.has(element)) {
      return;
    }

    const entry = this.findEntry(element);
    if (entry !== null) {
      this.unregister(entry);
      this.dispatchChange(element, false, 'native-dismiss', entry.source);
    }
  };

  private readonly handleToggle = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const element = event.target;
    if (!isModal(element) && !isLayer(element)) {
      return;
    }

    const open = isOverlayOpen(element);
    const existing = this.findEntry(element);

    if (open && existing === null) {
      const toggleSource = event instanceof ToggleEvent ? event.source : null;
      const source = isHTMLElement(toggleSource) ? toggleSource : null;
      if (isModal(element)) {
        this.closeAllLayers('modal-open');
      }
      this.register(this.createEntry(element, source));
      this.dispatchChange(
        element,
        true,
        source === null ? 'native-dismiss' : 'trigger',
        source,
      );
    } else if (!open && existing !== null) {
      this.unregister(existing);
      if (!this.synchronizing.has(element)) {
        this.dispatchChange(element, false, 'native-dismiss', existing.source);
      }
    }
  };

  private readonly handleFocusIn = (event: FocusEvent) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    for (const entry of this.entries.slice().reverse()) {
      if (entry.element.contains(event.target)) {
        entry.lastFocused = event.target;
        return;
      }
    }
  };

  private readonly handleMutations = () => {
    for (const entry of this.entries.slice().reverse()) {
      if (!entry.element.isConnected) {
        this.unregister(entry, false);
        continue;
      }

      if (
        entry.kind === 'layer' &&
        entry.source !== null &&
        !entry.source.isConnected
      ) {
        this.closeElement(entry.element, 'anchor-detached');
      }
    }
  };

  private closeElement(element: HTMLElement, reason: OverlayOpenChangeReason) {
    const entry = this.findEntry(element);

    if (entry === null && !isOverlayOpen(element)) {
      return true;
    }

    for (const descendant of this.descendantsOf(element)) {
      this.closeElement(descendant.element, 'ancestor-close');
    }

    const source = entry?.source ?? null;
    if (!this.dispatchBeforeChange(element, false, reason, source)) {
      return false;
    }

    this.synchronizing.add(element);

    try {
      if (isModal(element)) {
        if (element.open) {
          element.close();
        }
      } else if (isLayer(element) && isLayerOpen(element)) {
        element.hidePopover();
      }
    } catch {
      return false;
    } finally {
      queueMicrotask(() => this.synchronizing.delete(element));
    }

    if (entry !== null) {
      this.unregister(entry);
    }
    this.dispatchChange(element, false, reason, source);

    return true;
  }

  private createEntry(element: HTMLElement, source: HTMLElement | null) {
    const activeElement = isHTMLElement(this.document.activeElement)
      ? this.document.activeElement
      : null;
    const directParent = this.findParentEntry(source ?? activeElement);

    return {
      cleanupPositioning: null,
      element,
      kind: isModal(element) ? 'modal' : 'layer',
      lastFocused: null,
      parent: isModal(element)
        ? this.nearestModalParent(directParent)
        : (directParent?.element ?? null),
      restoreCandidates: mergeUniqueElements([
        source,
        activeElement,
        ...this.entries
          .slice()
          .reverse()
          .flatMap((entry) => [entry.lastFocused, entry.source]),
      ]),
      source,
    } satisfies OverlayEntry;
  }

  private register(entry: OverlayEntry) {
    if (this.findEntry(entry.element) !== null) {
      return;
    }

    this.entries.push(entry);
    entry.element.dataset['trManaged'] = 'true';

    if (entry.kind === 'layer') {
      entry.cleanupPositioning = this.startPositioning(entry);
    }

    this.updateDocumentState();
  }

  private unregister(entry: OverlayEntry, restoreFocus = true) {
    const index = this.entries.indexOf(entry);
    if (index === -1) {
      return;
    }

    this.entries.splice(index, 1);
    entry.cleanupPositioning?.();
    entry.cleanupPositioning = null;
    entry.element.removeAttribute('data-topmost');
    entry.element.removeAttribute('data-tr-managed');
    entry.element.removeAttribute('data-positioned');
    this.updateDocumentState();

    if (restoreFocus) {
      queueMicrotask(() => this.restoreFocus(entry));
    }
  }

  private updateDocumentState() {
    const modalEntries = this.entries.filter((entry) => entry.kind === 'modal');

    for (const entry of modalEntries) {
      entry.element.removeAttribute('data-topmost');
    }
    modalEntries.at(-1)?.element.setAttribute('data-topmost', 'true');

    const shouldLockScroll = modalEntries.some((entry) =>
      dataBoolean(entry.element, 'preventScroll', true),
    );
    const root = this.document.documentElement;

    if (shouldLockScroll && this.scrollLockSnapshot === null) {
      this.scrollLockSnapshot = {
        overflow: root.style.overflow,
        scrollbarGutter: root.style.scrollbarGutter,
      };
      root.style.overflow = 'hidden';
      root.style.scrollbarGutter = 'stable';
      root.dataset['trModalOpen'] = 'true';
    } else if (!shouldLockScroll && this.scrollLockSnapshot !== null) {
      root.style.overflow = this.scrollLockSnapshot.overflow;
      root.style.scrollbarGutter = this.scrollLockSnapshot.scrollbarGutter;
      root.removeAttribute('data-tr-modal-open');
      this.scrollLockSnapshot = null;
    }
  }

  private startPositioning(entry: OverlayEntry) {
    const source = entry.source ?? this.findSource(entry.element);
    if (source === null || !source.isConnected) {
      return null;
    }

    entry.source = source;
    entry.element.dataset['positioned'] = 'false';

    const update = () => {
      if (!entry.element.isConnected || !source.isConnected) {
        return;
      }

      const requestedPlacement = entry.element.dataset['placement'] ?? '';
      const placement = isLayerPlacement(requestedPlacement)
        ? requestedPlacement
        : overlayContract.defaultLayerPlacement;
      const collisionPadding = dataNumber(
        entry.element,
        'collisionPadding',
        overlayContract.defaultLayerCollisionPadding,
      );

      void computePosition(source, entry.element, {
        middleware: [
          offset(
            dataNumber(entry.element, 'offset', overlayContract.defaultLayerOffset),
          ),
          flip({ padding: collisionPadding }),
          shift({ padding: collisionPadding }),
          size({
            padding: collisionPadding,
            apply({ availableHeight, availableWidth, rects }) {
              entry.element.style.setProperty(
                '--tr-layer-available-height',
                `${Math.max(0, availableHeight)}px`,
              );
              entry.element.style.setProperty(
                '--tr-layer-available-width',
                `${Math.max(0, availableWidth)}px`,
              );

              if (dataBoolean(entry.element, 'matchAnchorWidth', false)) {
                entry.element.style.minWidth = `${rects.reference.width}px`;
              }
            },
          }),
        ],
        placement,
        strategy: 'fixed',
      }).then(({ placement: resolvedPlacement, strategy, x, y }) => {
        if (!isLayerOpen(entry.element)) {
          return;
        }

        entry.element.style.left = `${x}px`;
        entry.element.style.position = strategy;
        entry.element.style.top = `${y}px`;
        entry.element.dataset['placement'] = resolvedPlacement;
        entry.element.dataset['positioned'] = 'true';
      });
    };

    const cleanup = autoUpdate(source, entry.element, update);
    update();

    return () => {
      cleanup();
      entry.element.style.removeProperty('--tr-layer-available-height');
      entry.element.style.removeProperty('--tr-layer-available-width');
      entry.element.style.removeProperty('min-width');
    };
  }

  private closeAllLayers(reason: OverlayOpenChangeReason) {
    for (const entry of this.entries.slice().reverse()) {
      if (entry.kind === 'layer') {
        this.closeElement(entry.element, reason);
      }
    }
  }

  private descendantsOf(element: HTMLElement) {
    return this.entries.filter((entry) => this.isDescendant(entry, element)).reverse();
  }

  private isDescendant(entry: OverlayEntry, ancestor: HTMLElement) {
    let parent = entry.parent;

    while (parent !== null) {
      if (parent === ancestor) {
        return true;
      }

      parent = this.findEntry(parent)?.parent ?? null;
    }

    return false;
  }

  private findEntry(element: HTMLElement) {
    return this.entries.find((entry) => entry.element === element) ?? null;
  }

  private findParentEntry(source: HTMLElement | null) {
    if (source === null) {
      return null;
    }

    return (
      this.entries
        .slice()
        .reverse()
        .find((entry) => entry.element.contains(source)) ?? null
    );
  }

  private nearestModalParent(entry: OverlayEntry | null) {
    let current = entry;

    while (current !== null) {
      if (current.kind === 'modal') {
        return current.element;
      }

      current = current.parent === null ? null : this.findEntry(current.parent);
    }

    return null;
  }

  private findSource(element: HTMLElement) {
    if (element.id.length === 0) {
      return null;
    }

    for (const trigger of this.document.querySelectorAll<HTMLElement>(
      '[commandfor], [popovertarget]',
    )) {
      if (
        trigger.getAttribute('commandfor') === element.id ||
        trigger.getAttribute('popovertarget') === element.id
      ) {
        return trigger;
      }
    }

    return null;
  }

  private resolveTarget(target: OverlayTarget) {
    const element =
      typeof target === 'string' ? this.document.getElementById(target) : target;

    return isHTMLElement(element) ? element : null;
  }

  private pruneClosedEntries() {
    for (const entry of this.entries.slice().reverse()) {
      if (!isOverlayOpen(entry.element)) {
        this.unregister(entry);
        this.dispatchChange(entry.element, false, 'native-dismiss', entry.source);
      }
    }
  }

  private restoreFocus(entry: OverlayEntry) {
    const activeElement = isHTMLElement(this.document.activeElement)
      ? this.document.activeElement
      : null;

    if (
      activeElement !== null &&
      activeElement !== this.document.body &&
      !entry.element.contains(activeElement) &&
      this.isFocusCandidate(activeElement)
    ) {
      return;
    }

    const topModal = this.entries
      .slice()
      .reverse()
      .find((candidate) => candidate.kind === 'modal');
    const candidates = mergeUniqueElements([
      ...entry.restoreCandidates,
      topModal?.lastFocused ?? null,
      topModal?.element.querySelector<HTMLElement>(`.tr-modal-title`) ?? null,
    ]);

    candidates
      .find((candidate) => this.isFocusCandidate(candidate))
      ?.focus({
        preventScroll: true,
      });
  }

  private isFocusCandidate(element: HTMLElement) {
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

  private dispatchBeforeChange(
    overlay: HTMLElement,
    open: boolean,
    reason: OverlayOpenChangeReason,
    source: HTMLElement | null,
  ) {
    const event = this.createChangeEvent(
      overlayBeforeChangeEventName,
      { open, overlay, reason, source },
      true,
    );
    const allowed = overlay.dispatchEvent(event);

    return allowed || forcedCloseReasons.has(reason);
  }

  private dispatchChange(
    overlay: HTMLElement,
    open: boolean,
    reason: OverlayOpenChangeReason,
    source: HTMLElement | null,
  ) {
    overlay.dispatchEvent(
      this.createChangeEvent(
        overlayChangeEventName,
        { open, overlay, reason, source },
        false,
      ),
    );
  }

  private createChangeEvent(
    type: string,
    detail: OverlayOpenChangeDetail,
    cancelable: boolean,
  ) {
    const CustomEventConstructor =
      this.document.defaultView?.CustomEvent ?? CustomEvent;

    return new CustomEventConstructor<OverlayOpenChangeDetail>(type, {
      bubbles: true,
      cancelable,
      composed: true,
      detail,
    });
  }
}

export function createOverlayManager(document: Document): OverlayManager {
  let shared = sharedManagers.get(document);

  if (shared === undefined) {
    shared = new SharedOverlayManager(document);
    sharedManagers.set(document, shared);
  }

  shared.acquire();
  let destroyed = false;

  return {
    close(target, options) {
      return shared.close(target, options);
    },
    destroy() {
      if (!destroyed) {
        destroyed = true;
        shared.release();
      }
    },
    open(target, options) {
      return shared.open(target, options);
    },
    toggle(target, options) {
      return shared.toggle(target, options);
    },
  };
}

export type {
  LayerMode,
  LayerPlacement,
  ModalPlacement,
  ModalSize,
  OverlayOpenChangeDetail,
  OverlayOpenChangeReason,
} from './contract.js';
