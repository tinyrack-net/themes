import {
  layerClassName,
  modalBackdropClassName,
  modalClassName,
  type OverlayOpenChangeReason,
  overlayBeforeChangeEventName,
  overlayChangeEventName,
} from './contract.js';
import { createDocumentStateController } from './runtime/document-state.js';
import { createOverlayChangeEvent, createOverlayDetail } from './runtime/events.js';
import { createFocusController, mergeUniqueElements } from './runtime/focus.js';
import { connectOverlayLifecycle } from './runtime/lifecycle.js';
import {
  closeNativeOverlay,
  isHTMLElement,
  isLayer,
  isModal,
  isOverlayOpen,
  openNativeOverlay,
} from './runtime/native.js';
import { dataBoolean } from './runtime/options.js';
import { createLayerPositioner } from './runtime/positioning.js';
import { OverlayStack } from './runtime/stack.js';
import type { OverlayEntry } from './runtime/types.js';

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

const sharedManagers = new WeakMap<Document, SharedOverlayManager>();
const forcedCloseReasons = new Set<OverlayOpenChangeReason>([
  'ancestor-close',
  'modal-open',
]);

function closestOverlay(element: Element | null) {
  const overlay = element?.closest<HTMLElement>(
    '[data-tr-overlay="modal"], [data-tr-overlay="layer"], .tr-modal, .tr-layer',
  );

  return overlay ?? null;
}

class SharedOverlayManager {
  private readonly document: Document;
  private readonly stack = new OverlayStack();
  private readonly documentState: ReturnType<typeof createDocumentStateController>;
  private readonly focusController: ReturnType<typeof createFocusController>;
  private readonly synchronizing = new WeakSet<HTMLElement>();
  private lifecycleCleanup: (() => void) | null = null;
  private references = 0;

  constructor(document: Document) {
    this.document = document;
    this.documentState = createDocumentStateController(document);
    this.focusController = createFocusController(document, closestOverlay);
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

    const activeElement = this.document.activeElement as HTMLElement | null;
    const directParent = this.findParentEntry(source ?? (activeElement as HTMLElement));
    const parent = isModal(element)
      ? this.nearestModalParent(directParent)
      : (directParent?.element ?? null);
    const restoreCandidates = mergeUniqueElements([
      source,
      activeElement,
      ...this.stack.entries
        .slice()
        .reverse()
        .flatMap((entry) => [entry.lastFocused, entry.source]),
    ]);

    if (isModal(element)) {
      this.closeAllLayers('modal-open');
    }

    this.synchronizing.add(element);

    try {
      if (!openNativeOverlay(element, source)) {
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
    this.lifecycleCleanup = connectOverlayLifecycle(this.document, {
      cancel: this.handleCancel,
      click: this.handleClick,
      close: this.handleNativeClose,
      focusin: this.handleFocusIn,
      keydown: this.handleKeyDown,
      mutations: this.handleMutations,
      onConnected: () => {
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
      },
      toggle: this.handleToggle,
    });
  }

  private disconnect() {
    this.lifecycleCleanup?.();
    this.lifecycleCleanup = null;

    for (const entry of this.stack.snapshot().reverse()) {
      try {
        closeNativeOverlay(entry.element);
      } catch {
        // A disconnected top-layer element only needs local cleanup.
      }
      entry.cleanupPositioning?.();
    }
    this.stack.clear();
    this.documentState.update(this.stack.entries);
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
      const target = this.document.getElementById(targetId ?? '');

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
    const target = this.document.getElementById(targetId ?? '');

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
    const topEntry = this.stack.at(-1);

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

    const topEntry = this.stack.at(-1);
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
    this.focusController.track(event, this.stack.entries);
  };

  private readonly handleMutations = () => {
    for (const entry of this.stack.snapshot().reverse()) {
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
      if (!closeNativeOverlay(element)) {
        return false;
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
    const activeElement = this.document.activeElement as HTMLElement | null;
    const directParent = this.findParentEntry(source ?? (activeElement as HTMLElement));

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
        ...this.stack.entries
          .slice()
          .reverse()
          .flatMap((entry) => [entry.lastFocused, entry.source]),
      ]),
      source,
    } satisfies OverlayEntry;
  }

  private register(entry: OverlayEntry) {
    this.stack.add(entry);
    entry.element.setAttribute('data-tr-managed', 'true');

    if (entry.kind === 'layer') {
      entry.cleanupPositioning = createLayerPositioner(entry, (element) =>
        this.findSource(element),
      );
    }

    this.documentState.update(this.stack.entries);
  }

  private unregister(entry: OverlayEntry, restoreFocus = true) {
    this.stack.remove(entry);
    entry.cleanupPositioning?.();
    entry.cleanupPositioning = null;
    entry.element.removeAttribute('data-topmost');
    entry.element.removeAttribute('data-tr-managed');
    entry.element.removeAttribute('data-positioned');
    this.documentState.update(this.stack.entries);

    if (restoreFocus) {
      queueMicrotask(() => this.focusController.restore(entry, this.stack.entries));
    }
  }

  private closeAllLayers(reason: OverlayOpenChangeReason) {
    for (const entry of this.stack.snapshot().reverse()) {
      if (entry.kind === 'layer') {
        this.closeElement(entry.element, reason);
      }
    }
  }

  private descendantsOf(element: HTMLElement) {
    return this.stack.entries
      .filter((entry) => this.isDescendant(entry, element))
      .reverse();
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
    return this.stack.get(element);
  }

  private findParentEntry(source: HTMLElement) {
    return (
      this.stack.entries
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
    for (const entry of this.stack.snapshot().reverse()) {
      if (!isOverlayOpen(entry.element)) {
        this.unregister(entry);
        this.dispatchChange(entry.element, false, 'native-dismiss', entry.source);
      }
    }
  }

  private dispatchBeforeChange(
    overlay: HTMLElement,
    open: boolean,
    reason: OverlayOpenChangeReason,
    source: HTMLElement | null,
  ) {
    const event = createOverlayChangeEvent(
      this.document,
      overlayBeforeChangeEventName,
      createOverlayDetail(overlay, open, reason, source),
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
      createOverlayChangeEvent(
        this.document,
        overlayChangeEventName,
        createOverlayDetail(overlay, open, reason, source),
        false,
      ),
    );
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
