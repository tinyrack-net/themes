'use client';

import {
  type ButtonHTMLAttributes,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useMemo,
  useRef,
} from 'react';
import {
  type LayerMode,
  type LayerPlacement,
  layerClassName,
  overlayContract,
} from '../contract.js';
import { LayerContext, useLayerContext } from './context.js';
import {
  type AsChildProps,
  type CommandAttributes,
  mergeClassNames,
  useStableId,
} from './shared.js';
import { composeRefs, renderSlottable, type SlottableProps } from './slot.js';
import { type OpenProps, useOpenState } from './state.js';
import { useManagedOverlay } from './use-managed-overlay.js';

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
