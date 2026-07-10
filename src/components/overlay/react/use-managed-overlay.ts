import { type MutableRefObject, useEffect, useRef } from 'react';
import { type OverlayOpenChangeDetail, overlayChangeEventName } from '../contract.js';
import { createOverlayManager, type OverlayManager } from '../dom.js';
import type { OpenState } from './state.js';

export function useManagedOverlay(
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
