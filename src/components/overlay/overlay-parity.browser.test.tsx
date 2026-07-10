import '../../core/core.css';
import './overlay.css';
import { afterEach, expect, test } from 'vitest';
import { cleanup, render } from 'vitest-browser-react';
import { createOverlayManager } from './dom.js';
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

function waitForBrowser() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

const managers = new Set<ReturnType<typeof createOverlayManager>>();

afterEach(() => {
  cleanup();
  for (const manager of managers) {
    manager.destroy();
  }
  managers.clear();
  document.body.replaceChildren();
});

test('raw HTML and React Modal produce the same native contract', async () => {
  const rawTrigger = document.createElement('button');
  rawTrigger.setAttribute('commandfor', 'parity-modal');
  rawTrigger.setAttribute('command', 'show-modal');
  rawTrigger.setAttribute('aria-controls', 'parity-modal');
  rawTrigger.setAttribute('aria-haspopup', 'dialog');
  const rawModal = document.createElement('dialog');
  rawModal.id = 'parity-modal';
  rawModal.className = 'tr-modal';
  rawModal.dataset.trOverlay = 'modal';
  rawModal.dataset.placement = 'bottom';
  rawModal.dataset.closeOnBackdrop = 'true';
  rawModal.dataset.closeOnEscape = 'true';
  rawModal.innerHTML =
    '<div class="tr-modal-box"><h2 class="tr-modal-title">Title</h2></div>';
  document.body.append(rawTrigger, rawModal);
  const rawManager = createOverlayManager(document);
  managers.add(rawManager);
  rawTrigger.click();
  await waitForBrowser();
  const rawSnapshot = {
    className: rawModal.className,
    placement: rawModal.dataset.placement,
    role: rawModal.tagName,
    overlay: rawModal.dataset.trOverlay,
    state: rawModal.matches(':modal'),
  };
  rawManager.close(rawModal);
  await waitForBrowser();

  cleanup();
  document.body.replaceChildren();
  await render(
    <Modal closeOnBackdrop id="parity-modal" closeOnEscape>
      <ModalTrigger>Open</ModalTrigger>
      <ModalContent placement="bottom">
        <ModalBox>
          <ModalTitle>Title</ModalTitle>
        </ModalBox>
      </ModalContent>
    </Modal>,
  );
  document.querySelector<HTMLButtonElement>('button')?.click();
  await waitForBrowser();
  const reactModal = document.querySelector<HTMLDialogElement>('#parity-modal');
  if (reactModal === null) {
    throw new Error('React modal not rendered.');
  }
  expect({
    className: reactModal.className,
    placement: reactModal.dataset.placement,
    role: reactModal.tagName,
    overlay: reactModal.dataset.trOverlay,
    state: reactModal.matches(':modal'),
  }).toEqual(rawSnapshot);
});

test('raw HTML and React Layer produce the same popover contract', async () => {
  const rawTrigger = document.createElement('button');
  rawTrigger.setAttribute('popovertarget', 'parity-layer');
  rawTrigger.setAttribute('popovertargetaction', 'toggle');
  const rawLayer = document.createElement('div');
  rawLayer.id = 'parity-layer';
  rawLayer.className = 'tr-layer';
  rawLayer.popover = 'manual';
  rawLayer.dataset.trOverlay = 'layer';
  rawLayer.dataset.placement = 'top-end';
  const rawRequestedPlacement = rawLayer.dataset.placement;
  document.body.append(rawTrigger, rawLayer);
  const rawManager = createOverlayManager(document);
  managers.add(rawManager);
  rawTrigger.click();
  await waitForBrowser();
  const rawSnapshot = {
    className: rawLayer.className,
    mode: rawLayer.getAttribute('popover'),
    placement: rawRequestedPlacement,
    overlay: rawLayer.dataset.trOverlay,
    state: rawLayer.matches(':popover-open'),
  };
  rawManager.close(rawLayer);
  await waitForBrowser();

  cleanup();
  document.body.replaceChildren();
  await render(
    <Layer mode="manual" placement="top-end" id="parity-layer">
      <LayerTrigger>Open</LayerTrigger>
      <LayerContent />
    </Layer>,
  );
  const reactLayerBeforeOpen = document.querySelector<HTMLElement>('#parity-layer');
  const reactRequestedPlacement = reactLayerBeforeOpen?.dataset.placement;
  document.querySelector<HTMLButtonElement>('button')?.click();
  await waitForBrowser();
  const reactLayer = document.querySelector<HTMLElement>('#parity-layer');
  if (reactLayer === null) {
    throw new Error('React layer not rendered.');
  }
  expect({
    className: reactLayer.className,
    mode: reactLayer.getAttribute('popover'),
    placement: reactRequestedPlacement,
    overlay: reactLayer.dataset.trOverlay,
    state: reactLayer.matches(':popover-open'),
  }).toEqual(rawSnapshot);
});
