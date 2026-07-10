import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/dom';
import { type LayerPlacement, layerPlacements, overlayContract } from '../contract.js';
import { isLayerOpen } from './native.js';
import { dataBoolean, dataNumber } from './options.js';
import type { OverlayEntry } from './types.js';

function isLayerPlacement(value: string): value is LayerPlacement {
  return layerPlacements.includes(value as LayerPlacement);
}

export function createLayerPositioner(
  entry: OverlayEntry,
  resolveSource: (element: HTMLElement) => HTMLElement | null,
) {
  const source = entry.source ?? resolveSource(entry.element);
  if (source === null || !source.isConnected) {
    return null;
  }

  entry.source = source;
  entry.element.setAttribute('data-positioned', 'false');

  const update = () => {
    if (!entry.element.isConnected || !source.isConnected) {
      return;
    }

    const requestedPlacement = entry.element.getAttribute('data-placement') ?? '';
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
        offset(dataNumber(entry.element, 'offset', overlayContract.defaultLayerOffset)),
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
      entry.element.setAttribute('data-placement', resolvedPlacement);
      entry.element.setAttribute('data-positioned', 'true');
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
