import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  Layer,
  LayerContent,
  LayerTrigger,
  Modal,
  ModalBox,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from './react.js';

describe('Overlay SSR output', () => {
  it('renders a closed native dialog contract and defers default open', () => {
    const html = renderToString(
      createElement(
        Modal,
        { defaultOpen: true, id: 'settings' },
        createElement(ModalTrigger, null, 'Open'),
        createElement(
          ModalContent,
          null,
          createElement(ModalBox, null, createElement(ModalTitle, null, 'Settings')),
        ),
      ),
    );

    expect(html).toContain('<dialog');
    expect(html).toContain('class="tr-modal"');
    expect(html).toContain('data-default-open="true"');
    expect(html).toContain('data-placement="middle"');
    expect(html).toContain('closedby="any"');
    expect(html).toContain('class="tr-modal-box"');
    expect(html).toContain('class="tr-modal-backdrop"');
    expect(html).toContain('commandfor="settings"');
    expect(html).not.toMatch(/<dialog[^>]*\sopen(?:=|\s|>)/);
  });

  it('renders Layer popover markup without browser globals', () => {
    const html = renderToString(
      createElement(
        Layer,
        { defaultOpen: true, id: 'actions', mode: 'manual' },
        createElement(LayerTrigger, null, 'Actions'),
        createElement(LayerContent, { role: 'dialog' }, 'Layer content'),
      ),
    );

    expect(html).toMatch(/popovertarget="actions"/i);
    expect(html).toContain('class="tr-layer"');
    expect(html).toContain('popover="manual"');
    expect(html).toContain('data-default-open="true"');
    expect(html).toContain('data-placement="bottom-start"');
  });
});
