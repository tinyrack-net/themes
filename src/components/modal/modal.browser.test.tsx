import './modal.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Modal, ModalRoot } from './index.js';

test('uses Base UI dialog focus and dismissal behavior', async () => {
  expect(Modal.Root).toBe(ModalRoot);
  await render(
    <Modal.Root defaultOpen>
      <Modal.Trigger>Open</Modal.Trigger>
      <Modal.Portal>
        <Modal.Backdrop />
        <Modal.Popup placement="middle" size="sm">
          <Modal.Title>Confirm</Modal.Title>
          <Modal.Description>Continue?</Modal.Description>
          <Modal.Close>Close</Modal.Close>
        </Modal.Popup>
      </Modal.Portal>
    </Modal.Root>,
  );
  const popup = document.querySelector<HTMLElement>('.tr-modal');
  expect(popup?.getAttribute('role')).toBe('dialog');
  expect(popup?.dataset['size']).toBe('sm');
  document.querySelector<HTMLButtonElement>('.tr-modal-close')?.click();
  await expect.poll(() => popup?.hasAttribute('data-closed')).toBe(true);
});
