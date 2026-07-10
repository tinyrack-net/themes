import { type MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import type { OverlayOpenChangeReason } from '../contract.js';

export type ControlledOpenProps = {
  defaultOpen?: never;
  onOpenChange: OverlayOpenChangeCallback;
  open: boolean;
};

export type UncontrolledOpenProps = {
  defaultOpen?: boolean;
  onOpenChange?: OverlayOpenChangeCallback;
  open?: never;
};

export type OpenProps = ControlledOpenProps | UncontrolledOpenProps;

export type OverlayOpenChangeCallback = (
  open: boolean,
  detail: {
    reason: OverlayOpenChangeReason;
    source: HTMLElement | null;
  },
) => void;

export type OpenState = {
  open: boolean;
  openRef: MutableRefObject<boolean>;
  requestOpen: (
    open: boolean,
    reason: OverlayOpenChangeReason,
    source?: HTMLElement | null,
  ) => void;
};

export function useOpenState(props: OpenProps): OpenState {
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
