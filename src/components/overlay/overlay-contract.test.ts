import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  layerModes,
  modalPlacements,
  modalSizes,
  overlayContract,
} from './contract.js';

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
    expect(domSource).toContain("from '@floating-ui/dom'");
    expect(domSource).not.toContain("from 'react'");
    expect(domSource).not.toContain('@floating-ui/react');
  });

  it('uses native dialog and popover APIs without legacy modal state hacks', () => {
    const domSource = readFileSync(
      join(repoRoot, 'src/components/overlay/dom.ts'),
      'utf8',
    );
    const cssSource = readFileSync(
      join(repoRoot, 'src/components/overlay/overlay.css'),
      'utf8',
    );

    expect(domSource).toContain('showModal()');
    expect(domSource).toContain('showPopover');
    expect(domSource).toContain('hidePopover()');
    expect(cssSource).toContain('.tr-modal-box');
    expect(cssSource).toContain('.tr-modal-action');
    expect(cssSource).toContain('.tr-modal-backdrop');
    expect(cssSource).not.toContain('z-index: 999');
    expect(cssSource).not.toContain('.tr-modal-toggle');
    expect(cssSource).not.toContain(':target');
    expect(cssSource).not.toContain('.tr-modal-open');
  });
});
