'use client';

import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  type ToastPosition,
  toastContract,
  toastViewportClassName,
} from './contract.js';
import { createToastManager, type ToastManager, type ToastManagerRoot } from './dom.js';

type ToastApi = Pick<ToastManager, 'dismiss' | 'show' | 'update'>;
const ToastContext = createContext<ToastApi | null>(null);

export type ToastProviderProps = {
  children?: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const managerRef = useRef<ToastManager | null>(null);

  const manager = useCallback(() => {
    if (managerRef.current === null) {
      const root = rootRef.current;
      if (root === null) {
        throw new Error('ToastProvider is not mounted.');
      }
      managerRef.current = createToastManager(root as ToastManagerRoot);
    }
    return managerRef.current;
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      dismiss(id) {
        manager().dismiss(id);
      },
      show(options) {
        return manager().show(options);
      },
      update(id, options) {
        return manager().update(id, options);
      },
    }),
    [manager],
  );

  useEffect(
    () => () => {
      managerRef.current?.destroy();
      managerRef.current = null;
    },
    [],
  );

  return (
    <ToastContext.Provider value={api}>
      <div className="tr-toast-provider" data-tr-toast-provider="true" ref={rootRef}>
        {children}
      </div>
    </ToastContext.Provider>
  );
}

export type ToastViewportProps = HTMLAttributes<HTMLElement> & {
  label?: string;
  position?: ToastPosition;
};

function mergeClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const ToastViewport = forwardRef<HTMLElement, ToastViewportProps>(
  function ToastViewport(
    {
      className,
      label = 'Notifications',
      position = toastContract.defaultPosition,
      ...props
    },
    ref,
  ) {
    return (
      <section
        {...props}
        aria-label={label}
        className={mergeClassNames(toastViewportClassName, className)}
        data-position={position}
        data-tr-toast-viewport="true"
        popover="manual"
        ref={ref}
      />
    );
  },
);

export function useToast() {
  const api = useContext(ToastContext);
  if (api === null) {
    throw new Error('useToast must be used within ToastProvider.');
  }
  return api;
}

export type { ToastPosition, ToastVariant } from './contract.js';
export type { ToastOptions, ToastUpdate } from './dom.js';
