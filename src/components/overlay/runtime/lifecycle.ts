type OverlayLifecycleHandlers = {
  cancel: (event: Event) => void;
  click: (event: Event) => void;
  close: (event: Event) => void;
  focusin: (event: FocusEvent) => void;
  keydown: (event: KeyboardEvent) => void;
  mutations: MutationCallback;
  onConnected: () => void;
  toggle: (event: Event) => void;
};

export function connectOverlayLifecycle(
  root: Document | ShadowRoot,
  documentOrHandlers: Document | OverlayLifecycleHandlers,
  providedHandlers?: OverlayLifecycleHandlers,
) {
  const document =
    providedHandlers === undefined
      ? (root as Document)
      : (documentOrHandlers as Document);
  const handlers = providedHandlers ?? (documentOrHandlers as OverlayLifecycleHandlers);
  root.addEventListener('click', handlers.click as EventListener, true);
  root.addEventListener('keydown', handlers.keydown as EventListener, true);
  root.addEventListener('cancel', handlers.cancel as EventListener, true);
  root.addEventListener('close', handlers.close as EventListener, true);
  root.addEventListener('toggle', handlers.toggle as EventListener, true);
  root.addEventListener('focusin', handlers.focusin as EventListener, true);

  const Observer = document.defaultView?.MutationObserver;
  const observer = Observer === undefined ? null : new Observer(handlers.mutations);
  observer?.observe(root.nodeType === 9 ? document.documentElement : root, {
    childList: true,
    subtree: true,
  });

  queueMicrotask(handlers.onConnected);

  return () => {
    root.removeEventListener('click', handlers.click as EventListener, true);
    root.removeEventListener('keydown', handlers.keydown as EventListener, true);
    root.removeEventListener('cancel', handlers.cancel as EventListener, true);
    root.removeEventListener('close', handlers.close as EventListener, true);
    root.removeEventListener('toggle', handlers.toggle as EventListener, true);
    root.removeEventListener('focusin', handlers.focusin as EventListener, true);
    observer?.disconnect();
  };
}
