'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ModalBackdropProps = ComponentProps<typeof BaseDialog.Backdrop>;
export const ModalBackdrop = createComponentPart(
  BaseDialog.Backdrop,
  'tr-modal-backdrop',
);
