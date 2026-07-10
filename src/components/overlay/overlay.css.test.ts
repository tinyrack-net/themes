import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { layerPlacements, modalPlacements, modalSizes } from './contract.js';

const css = readFileSync(
  join(process.cwd(), 'src/components/overlay/overlay.css'),
  'utf8',
);

describe('overlay.css source contract', () => {
  it('provides standalone Modal parts and all placement contracts', () => {
    for (const className of [
      'tr-modal',
      'tr-modal-box',
      'tr-modal-header',
      'tr-modal-title',
      'tr-modal-description',
      'tr-modal-body',
      'tr-modal-action',
      'tr-modal-backdrop',
    ]) {
      expect(css).toContain(`.${className}`);
    }

    for (const placement of modalPlacements) {
      if (placement !== 'middle') {
        expect(css).toContain(`data-placement="${placement}"`);
      }
    }

    for (const size of modalSizes) {
      expect(css).toContain(`data-size="${size}"`);
    }

    expect(css).toContain('.tr-modal::backdrop');
    expect(css).toContain('data-topmost="true"');
    expect(css).toContain('scrollbar');
    expect(css).not.toContain('@theme static');
    expect(css).not.toContain('[data-theme="tinyrack-light"]');
  });

  it('provides positioned Layer styling without a public z-index scale', () => {
    expect(css).toContain('.tr-layer:popover-open');
    expect(css).toContain('data-positioned="false"');

    for (const side of new Set(
      layerPlacements.map((placement) => placement.split('-')[0]),
    )) {
      expect(css).toContain(`data-placement^="${side}"`);
    }

    expect(css).not.toContain('--tr-z-');
    expect(css).not.toContain('z-index: 999');
  });
});
