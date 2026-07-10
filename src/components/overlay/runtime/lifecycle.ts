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
  document: Document,
  handlers: OverlayLifecycleHandlers,
) {
  document.addEventListener('click', handlers.click, true);
  document.addEventListener('keydown', handlers.keydown, true);
  document.addEventListener('cancel', handlers.cancel, true);
  document.addEventListener('close', handlers.close, true);
  document.addEventListener('toggle', handlers.toggle, true);
  document.addEventListener('focusin', handlers.focusin, true);

  const Observer = document.defaultView?.MutationObserver;
  const observer = Observer === undefined ? null : new Observer(handlers.mutations);
  observer?.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  queueMicrotask(handlers.onConnected);

  return () => {
    document.removeEventListener('click', handlers.click, true);
    document.removeEventListener('keydown', handlers.keydown, true);
    document.removeEventListener('cancel', handlers.cancel, true);
    document.removeEventListener('close', handlers.close, true);
    document.removeEventListener('toggle', handlers.toggle, true);
    document.removeEventListener('focusin', handlers.focusin, true);
    observer?.disconnect();
  };
}
