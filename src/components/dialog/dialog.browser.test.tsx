import './dialog.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Dialog, DialogRoot } from './index.js';

test('uses Base UI dialog focus and dismissal behavior', async () => {
  expect(Dialog.Root).toBe(DialogRoot);
  await render(
    <Dialog.Root defaultOpen>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup placement="middle" size="sm">
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>Continue?</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>,
  );
  const popup = document.querySelector<HTMLElement>('.tr-dialog');
  expect(popup?.getAttribute('role')).toBe('dialog');
  expect(popup?.dataset['size']).toBe('sm');
  document.querySelector<HTMLButtonElement>('.tr-dialog-close')?.click();
  await expect.poll(() => popup?.hasAttribute('data-closed')).toBe(true);
});
