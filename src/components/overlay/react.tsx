'use client';

import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  createContext,
  type DialogHTMLAttributes,
  type FormHTMLAttributes,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type LayerMode,
  type LayerPlacement,
  layerClassName,
  type ModalPlacement,
  type ModalSize,
  modalActionClassName,
  modalBackdropClassName,
  modalBodyClassName,
  modalBoxClassName,
  modalClassName,
  modalDescriptionClassName,
  modalHeaderClassName,
  modalTitleClassName,
  type OverlayOpenChangeDetail,
  type OverlayOpenChangeReason,
  overlayChangeEventName,
  overlayContract,
} from './contract.js';
import { createOverlayManager, type OverlayManager } from './dom.js';

export type {
  LayerMode,
  LayerPlacement,
  ModalPlacement,
  ModalSize,
  OverlayOpenChangeReason,
} from './contract.js';

export type OverlayOpenChangeCallback = (
  open: boolean,
  detail: {
    reason: OverlayOpenChangeReason;
    source: HTMLElement | null;
  },
) => void;

type ControlledOpenProps = {
  defaultOpen?: never;
  onOpenChange: OverlayOpenChangeCallback;
  open: boolean;
};

type UncontrolledOpenProps = {
  defaultOpen?: boolean;
  onOpenChange?: OverlayOpenChangeCallback;
  open?: never;
};

type OpenProps = ControlledOpenProps | UncontrolledOpenProps;

type OpenState = {
  open: boolean;
  openRef: MutableRefObject<boolean>;
  requestOpen: (
    open: boolean,
    reason: OverlayOpenChangeReason,
    source?: HTMLElement | null,
  ) => void;
};

type AsChildProps = {
  asChild?: boolean;
};

type CommandAttributes = {
  command?: string;
  commandfor?: string;
  popoverTarget?: string;
  popoverTargetAction?: string;
};

type SlottableProps = Record<string, unknown>;

type ModalContextValue = OpenState & {
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  descriptionId: string;
  descriptionPresent: boolean;
  id: string;
  preventScroll: boolean;
  setDescriptionPresent: (present: boolean) => void;
  titleId: string;
  triggerRef: MutableRefObject<HTMLElement | null>;
};

type LayerContextValue = OpenState & {
  anchorRef: MutableRefObject<HTMLElement | null>;
  closeOnEscape: boolean;
  collisionPadding: number;
  id: string;
  matchAnchorWidth: boolean;
  mode: LayerMode;
  offset: number;
  placement: LayerPlacement;
};

const ModalContext = createContext<ModalContextValue | null>(null);
const LayerContext = createContext<LayerContextValue | null>(null);

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function useStableId(prefix: string, id?: string) {
  const reactId = useId().replaceAll(':', '');
  return id ?? `${prefix}-${reactId}`;
}

function useOpenState(props: OpenProps): OpenState {
  const isControlled = props.open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(props.defaultOpen ?? false);
  const open = isControlled ? props.open : uncontrolledOpen;
  const openRef = useRef(open);
  openRef.current = open;

  const requestOpen = useCallback(
    (
      nextOpen: boolean,
      reason: OverlayOpenChangeReason,
      source: HTMLElement | null = null,
    ) => {
      if (openRef.current === nextOpen) {
        return;
      }

      if (!isControlled) {
        openRef.current = nextOpen;
        setUncontrolledOpen(nextOpen);
      }

      props.onOpenChange?.(nextOpen, { reason, source });
    },
    [isControlled, props.onOpenChange],
  );

  return useMemo(() => ({ open, openRef, requestOpen }), [open, requestOpen]);
}

function useModalContext(componentName: string) {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error(`${componentName} must be used within Modal.`);
  }

  return context;
}

function useLayerContext(componentName: string) {
  const context = useContext(LayerContext);

  if (context === null) {
    throw new Error(`${componentName} must be used within Layer.`);
  }

  return context;
}

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };
}

function renderSlottable(
  asChild: boolean | undefined,
  children: ReactNode,
  slotProps: SlottableProps,
  forwardedRef: Ref<HTMLElement>,
  fallback: (props: SlottableProps, ref: Ref<HTMLElement>) => ReactElement,
) {
  if (!asChild) {
    return fallback({ ...slotProps, children }, forwardedRef);
  }

  const child = Children.only(children);
  if (typeof child !== 'object' || child === null || !('props' in child)) {
    throw new Error('asChild requires exactly one React element.');
  }

  const element = child as ReactElement<Record<string, unknown>>;
  const childProps = element.props;
  const childOnClick = childProps['onClick'] as
    | ((event: MouseEvent<HTMLElement>) => void)
    | undefined;
  const slotOnClick = slotProps['onClick'] as
    | ((event: MouseEvent<HTMLElement>) => void)
    | undefined;
  const childRef = childProps['ref'] as Ref<HTMLElement> | undefined;

  return cloneElement(element, {
    ...slotProps,
    children: childProps['children'],
    onClick(event: MouseEvent<HTMLElement>) {
      childOnClick?.(event);

      if (!event.defaultPrevented) {
        slotOnClick?.(event);
      }
    },
    ref: composeRefs(childRef, forwardedRef),
  });
}

function useManagedOverlay(
  elementRef: MutableRefObject<HTMLElement | null>,
  sourceRef: MutableRefObject<HTMLElement | null>,
  state: OpenState,
) {
  const managerRef = useRef<OverlayManager | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return;
    }

    const manager = createOverlayManager(element.ownerDocument);
    managerRef.current = manager;

    function handleChange(event: Event) {
      const detail = (event as CustomEvent<OverlayOpenChangeDetail>).detail;

      if (detail.overlay !== element) {
        return;
      }

      if (detail.open !== state.openRef.current) {
        state.requestOpen(detail.open, detail.reason, detail.source);
      }
    }

    element.addEventListener(overlayChangeEventName, handleChange);

    return () => {
      element.removeEventListener(overlayChangeEventName, handleChange);
      manager.destroy();
      managerRef.current = null;
    };
  }, [elementRef, state.openRef, state.requestOpen]);

  useEffect(() => {
    const element = elementRef.current;
    const manager = managerRef.current;

    if (element === null || manager === null) {
      return;
    }

    if (state.open) {
      manager.open(element, {
        reason: 'programmatic',
        source: sourceRef.current,
      });
    } else {
      manager.close(element, { reason: 'programmatic' });
    }
  }, [elementRef, sourceRef, state.open]);
}

export type ModalProps = OpenProps & {
  children?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  id?: string;
  preventScroll?: boolean;
};

export function Modal({
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  id: providedId,
  preventScroll = true,
  ...openProps
}: ModalProps) {
  const id = useStableId('tr-modal', providedId);
  const state = useOpenState(openProps as OpenProps);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [descriptionPresent, setDescriptionPresent] = useState(false);
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const context = useMemo(
    () => ({
      ...state,
      closeOnBackdrop,
      closeOnEscape,
      descriptionId,
      descriptionPresent,
      id,
      preventScroll,
      setDescriptionPresent,
      titleId,
      triggerRef,
    }),
    [
      closeOnBackdrop,
      closeOnEscape,
      descriptionId,
      descriptionPresent,
      id,
      preventScroll,
      state,
      titleId,
    ],
  );

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
}

export type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & AsChildProps;

export const ModalTrigger = forwardRef<HTMLElement, ModalTriggerProps>(
  function ModalTrigger(
    { asChild, children, onClick, type = 'button', ...triggerProps },
    forwardedRef,
  ) {
    const context = useModalContext('ModalTrigger');
    const ref = composeRefs<HTMLElement>(context.triggerRef, forwardedRef);
    const commandAttributes: CommandAttributes = {
      command: 'show-modal',
      commandfor: context.id,
    };
    const slotProps: SlottableProps = {
      ...triggerProps,
      ...commandAttributes,
      'aria-controls': context.id,
      'aria-expanded': context.open,
      'aria-haspopup': 'dialog',
      'data-tr-react-trigger': 'true',
      onClick(event: MouseEvent<HTMLElement>) {
        onClick?.(event as MouseEvent<HTMLButtonElement>);

        if (!event.defaultPrevented) {
          event.preventDefault();
          context.requestOpen(true, 'trigger', event.currentTarget);
        }
      },
      type,
    };

    return renderSlottable(asChild, children, slotProps, ref, (props, buttonRef) => (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={buttonRef as Ref<HTMLButtonElement>}
      />
    ));
  },
);

export type ModalContentProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'open'
> & {
  placement?: ModalPlacement;
};

export const ModalContent = forwardRef<HTMLDialogElement, ModalContentProps>(
  function ModalContent(
    {
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className,
      placement = overlayContract.defaultModalPlacement,
      ...dialogProps
    },
    forwardedRef,
  ) {
    const context = useModalContext('ModalContent');
    const elementRef = useRef<HTMLDialogElement | null>(null);
    const ref = composeRefs(elementRef, forwardedRef);
    useManagedOverlay(elementRef, context.triggerRef, context);

    const closedby = context.closeOnEscape
      ? context.closeOnBackdrop
        ? 'any'
        : 'closerequest'
      : 'none';
    const labelledBy =
      ariaLabel === undefined ? (ariaLabelledBy ?? context.titleId) : ariaLabelledBy;
    const describedBy =
      ariaDescribedBy ??
      (context.descriptionPresent ? context.descriptionId : undefined);

    const backdrop = context.closeOnBackdrop ? (
      <form className={modalBackdropClassName} method="dialog">
        <button aria-label="Close modal" type="submit">
          close
        </button>
      </form>
    ) : (
      <div aria-hidden="true" className={modalBackdropClassName} />
    );

    return (
      <dialog
        {...dialogProps}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        className={mergeClassNames(modalClassName, className)}
        closedby={closedby}
        data-close-on-backdrop={String(context.closeOnBackdrop)}
        data-close-on-escape={String(context.closeOnEscape)}
        data-default-open={context.open ? 'true' : undefined}
        data-placement={placement}
        data-prevent-scroll={String(context.preventScroll)}
        data-tr-overlay="modal"
        id={context.id}
        ref={ref}
      >
        {children}
        {backdrop}
      </dialog>
    );
  },
);

export type ModalBoxProps = HTMLAttributes<HTMLDivElement> & {
  size?: ModalSize;
};

export const ModalBox = forwardRef<HTMLDivElement, ModalBoxProps>(function ModalBox(
  { className, size = overlayContract.defaultModalSize, ...boxProps },
  ref,
) {
  return (
    <div
      {...boxProps}
      className={mergeClassNames(modalBoxClassName, className)}
      data-size={size}
      ref={ref}
    />
  );
});

export type ModalHeaderProps = HTMLAttributes<HTMLElement>;

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
  function ModalHeader({ className, ...headerProps }, ref) {
    return (
      <header
        {...headerProps}
        className={mergeClassNames(modalHeaderClassName, className)}
        ref={ref}
      />
    );
  },
);

export type ModalTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  function ModalTitle({ className, id, tabIndex = -1, ...titleProps }, ref) {
    const context = useModalContext('ModalTitle');

    return (
      <h2
        {...titleProps}
        className={mergeClassNames(modalTitleClassName, className)}
        id={id ?? context.titleId}
        ref={ref}
        tabIndex={tabIndex}
      />
    );
  },
);

export type ModalDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  function ModalDescription({ className, id, ...descriptionProps }, ref) {
    const context = useModalContext('ModalDescription');

    useEffect(() => {
      context.setDescriptionPresent(true);
      return () => context.setDescriptionPresent(false);
    }, [context.setDescriptionPresent]);

    return (
      <p
        {...descriptionProps}
        className={mergeClassNames(modalDescriptionClassName, className)}
        id={id ?? context.descriptionId}
        ref={ref}
      />
    );
  },
);

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
  { className, ...bodyProps },
  ref,
) {
  return (
    <div
      {...bodyProps}
      className={mergeClassNames(modalBodyClassName, className)}
      ref={ref}
    />
  );
});

export type ModalActionProps = HTMLAttributes<HTMLElement>;

export const ModalAction = forwardRef<HTMLElement, ModalActionProps>(
  function ModalAction({ className, ...actionProps }, ref) {
    return (
      <footer
        {...actionProps}
        className={mergeClassNames(modalActionClassName, className)}
        ref={ref}
      />
    );
  },
);

export type ModalCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & AsChildProps;

export const ModalClose = forwardRef<HTMLElement, ModalCloseProps>(function ModalClose(
  { asChild, children, onClick, type = 'button', ...closeProps },
  forwardedRef,
) {
  const context = useModalContext('ModalClose');
  const commandAttributes: CommandAttributes = {
    command: 'close',
    commandfor: context.id,
  };
  const slotProps: SlottableProps = {
    ...closeProps,
    ...commandAttributes,
    'data-tr-overlay-close': 'true',
    'data-tr-react-trigger': 'true',
    onClick(event: MouseEvent<HTMLElement>) {
      onClick?.(event as MouseEvent<HTMLButtonElement>);

      if (!event.defaultPrevented) {
        event.preventDefault();
        context.requestOpen(false, 'close-button', event.currentTarget);
      }
    },
    type,
  };

  return renderSlottable(
    asChild,
    children,
    slotProps,
    forwardedRef,
    (props, buttonRef) => (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={buttonRef as Ref<HTMLButtonElement>}
      />
    ),
  );
});

export type LayerProps = OpenProps & {
  children?: ReactNode;
  closeOnEscape?: boolean;
  collisionPadding?: number;
  id?: string;
  matchAnchorWidth?: boolean;
  mode?: LayerMode;
  offset?: number;
  placement?: LayerPlacement;
};

export function Layer({
  children,
  closeOnEscape = true,
  collisionPadding = overlayContract.defaultLayerCollisionPadding,
  id: providedId,
  matchAnchorWidth = false,
  mode = overlayContract.defaultLayerMode,
  offset = overlayContract.defaultLayerOffset,
  placement = overlayContract.defaultLayerPlacement,
  ...openProps
}: LayerProps) {
  const id = useStableId('tr-layer', providedId);
  const state = useOpenState(openProps as OpenProps);
  const anchorRef = useRef<HTMLElement | null>(null);
  const context = useMemo(
    () => ({
      ...state,
      anchorRef,
      closeOnEscape,
      collisionPadding,
      id,
      matchAnchorWidth,
      mode,
      offset,
      placement,
    }),
    [
      closeOnEscape,
      collisionPadding,
      id,
      matchAnchorWidth,
      mode,
      offset,
      placement,
      state,
    ],
  );

  return <LayerContext.Provider value={context}>{children}</LayerContext.Provider>;
}

export type LayerAnchorProps = HTMLAttributes<HTMLElement> & AsChildProps;

export const LayerAnchor = forwardRef<HTMLElement, LayerAnchorProps>(
  function LayerAnchor({ asChild, children, ...anchorProps }, forwardedRef) {
    const context = useLayerContext('LayerAnchor');
    const ref = composeRefs(context.anchorRef, forwardedRef);
    const slotProps: SlottableProps = {
      ...anchorProps,
      'aria-controls': context.id,
    };

    return renderSlottable(asChild, children, slotProps, ref, (props, spanRef) => (
      <span
        {...(props as HTMLAttributes<HTMLSpanElement>)}
        ref={spanRef as Ref<HTMLSpanElement>}
      />
    ));
  },
);

export type LayerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & AsChildProps;

export const LayerTrigger = forwardRef<HTMLElement, LayerTriggerProps>(
  function LayerTrigger(
    { asChild, children, onClick, type = 'button', ...triggerProps },
    forwardedRef,
  ) {
    const context = useLayerContext('LayerTrigger');
    const ref = composeRefs(context.anchorRef, forwardedRef);
    const commandAttributes: CommandAttributes = {
      popoverTarget: context.id,
      popoverTargetAction: 'toggle',
    };
    const slotProps: SlottableProps = {
      ...triggerProps,
      ...commandAttributes,
      'aria-controls': context.id,
      'aria-expanded': context.open,
      'data-tr-react-trigger': 'true',
      onClick(event: MouseEvent<HTMLElement>) {
        onClick?.(event as MouseEvent<HTMLButtonElement>);

        if (!event.defaultPrevented) {
          event.preventDefault();
          context.requestOpen(!context.openRef.current, 'trigger', event.currentTarget);
        }
      },
      type,
    };

    return renderSlottable(asChild, children, slotProps, ref, (props, buttonRef) => (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={buttonRef as Ref<HTMLButtonElement>}
      />
    ));
  },
);

export type LayerContentProps = HTMLAttributes<HTMLDivElement> & {
  popover?: LayerMode;
};

export const LayerContent = forwardRef<HTMLDivElement, LayerContentProps>(
  function LayerContent({ className, popover, ...contentProps }, forwardedRef) {
    const context = useLayerContext('LayerContent');
    const elementRef = useRef<HTMLDivElement | null>(null);
    const ref = composeRefs(elementRef, forwardedRef);
    useManagedOverlay(elementRef, context.anchorRef, context);

    return (
      <div
        {...contentProps}
        className={mergeClassNames(layerClassName, className)}
        data-close-on-escape={String(context.closeOnEscape)}
        data-collision-padding={context.collisionPadding}
        data-default-open={context.open ? 'true' : undefined}
        data-match-anchor-width={String(context.matchAnchorWidth)}
        data-offset={context.offset}
        data-placement={context.placement}
        data-tr-overlay="layer"
        id={context.id}
        popover={popover ?? context.mode}
        ref={ref}
      />
    );
  },
);

export type LayerCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & AsChildProps;

export const LayerClose = forwardRef<HTMLElement, LayerCloseProps>(function LayerClose(
  { asChild, children, onClick, type = 'button', ...closeProps },
  forwardedRef,
) {
  const context = useLayerContext('LayerClose');
  const commandAttributes: CommandAttributes = {
    popoverTarget: context.id,
    popoverTargetAction: 'hide',
  };
  const slotProps: SlottableProps = {
    ...closeProps,
    ...commandAttributes,
    'data-tr-overlay-close': 'true',
    'data-tr-react-trigger': 'true',
    onClick(event: MouseEvent<HTMLElement>) {
      onClick?.(event as MouseEvent<HTMLButtonElement>);

      if (!event.defaultPrevented) {
        event.preventDefault();
        context.requestOpen(false, 'close-button', event.currentTarget);
      }
    },
    type,
  };

  return renderSlottable(
    asChild,
    children,
    slotProps,
    forwardedRef,
    (props, buttonRef) => (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={buttonRef as Ref<HTMLButtonElement>}
      />
    ),
  );
});

export type ModalBackdropProps = FormHTMLAttributes<HTMLFormElement>;

export const ModalBackdrop = forwardRef<HTMLFormElement, ModalBackdropProps>(
  function ModalBackdrop({ className, ...backdropProps }, ref) {
    return (
      <form
        {...backdropProps}
        className={mergeClassNames(modalBackdropClassName, className)}
        method="dialog"
        ref={ref}
      />
    );
  },
);
