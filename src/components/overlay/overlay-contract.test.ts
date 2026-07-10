import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  layerModes,
  modalPlacements,
  modalSizes,
  overlayContract,
} from './contract.js';
import { requireOverlayContext } from './react/context.js';
import { isLayerPlacement } from './runtime/native.js';
import { dataBoolean, dataNumber } from './runtime/options.js';
import { OverlayStack } from './runtime/stack.js';

const repoRoot = process.cwd();

describe('Overlay contract', () => {
  it('keeps the framework-neutral contract outside the React adapter', () => {
    const contractSource = readFileSync(
      join(repoRoot, 'src/components/overlay/contract.ts'),
      'utf8',
    );
    const domSource = readFileSync(
      join(repoRoot, 'src/components/overlay/dom.ts'),
      'utf8',
    );

    expect(modalPlacements).toEqual(['top', 'middle', 'bottom', 'start', 'end']);
    expect(modalSizes).toEqual(['sm', 'md', 'lg', 'full']);
    expect(layerModes).toEqual(['auto', 'manual', 'hint']);
    expect(overlayContract.defaultModalPlacement).toBe('middle');
    expect(overlayContract.defaultLayerPlacement).toBe('bottom-start');
    expect(contractSource).not.toContain("from 'react'");
    expect(domSource).not.toContain("from 'react'");
    expect(domSource).not.toContain('@floating-ui/react');

    const runtimeFiles = [
      'events.ts',
      'focus.ts',
      'lifecycle.ts',
      'native.ts',
      'options.ts',
      'positioning.ts',
      'stack.ts',
      'types.ts',
    ];
    for (const file of runtimeFiles) {
      expect(
        readFileSync(join(repoRoot, `src/components/overlay/runtime/${file}`), 'utf8'),
      ).not.toContain("from 'react'");
    }
  });

  it('keeps native APIs and state helpers behind the framework-neutral boundary', () => {
    const cssSource = readFileSync(
      join(repoRoot, 'src/components/overlay/overlay.css'),
      'utf8',
    );

    expect(cssSource).toContain('.tr-modal-box');
    expect(cssSource).toContain('.tr-modal-action');
    expect(cssSource).toContain('.tr-modal-backdrop');
    expect(cssSource).not.toContain('z-index: 999');
    expect(cssSource).not.toContain('.tr-modal-toggle');
    expect(cssSource).not.toContain(':target');
    expect(cssSource).not.toContain('.tr-modal-open');
  });

  it('exhausts public literal unions and deterministic option fallbacks', () => {
    expect(modalPlacements).toHaveLength(5);
    expect(modalSizes).toHaveLength(4);
    expect(layerModes).toHaveLength(3);
    expect(isLayerPlacement('bottom-start')).toBe(true);
    expect(isLayerPlacement('invalid')).toBe(false);

    const element = {
      dataset: {
        enabled: 'true',
        disabled: 'false',
        number: '12',
        invalidNumber: 'NaN',
      },
    } as unknown as HTMLElement;
    expect(dataBoolean(element, 'enabled', false)).toBe(true);
    expect(dataBoolean(element, 'disabled', true)).toBe(false);
    expect(dataBoolean(element, 'missing', true)).toBe(true);
    expect(dataNumber(element, 'number', 0)).toBe(12);
    expect(dataNumber(element, 'invalidNumber', 8)).toBe(8);
  });

  it('keeps stack membership unique and ordered', () => {
    const stack = new OverlayStack();
    const first = {
      cleanupPositioning: null,
      element: {} as HTMLElement,
      kind: 'layer' as const,
      lastFocused: null,
      parent: null,
      restoreCandidates: [],
      source: null,
    };

    expect(stack.add(first)).toBe(true);
    expect(stack.add(first)).toBe(false);
    expect(stack.get(first.element)).toBe(first);
    expect(stack.at(-1)).toBe(first);
    expect(stack.at(99)).toBeNull();
    expect(stack.remove(first)).toBe(true);
    expect(stack.remove(first)).toBe(false);
    expect(stack.entries).toHaveLength(0);
  });

  it('guards React compound context ownership', () => {
    expect(requireOverlayContext({ value: true }, 'Part', 'Root')).toEqual({
      value: true,
    });
    expect(() => requireOverlayContext(null, 'Part', 'Root')).toThrow(
      'Part must be used within Root.',
    );
  });
});
