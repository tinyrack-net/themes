import './alert-dialog.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { AlertDialog, AlertDialogRoot } from './index.js';

test('renders the Tinyrack AlertDialog wrapper', async () => {
  expect(AlertDialog.Root).toBe(AlertDialogRoot);
  await render(
    <AlertDialog.Root>
      <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
    </AlertDialog.Root>,
  );
  expect(document.querySelector('.tr-alert-dialog-trigger')).not.toBeNull();
});
