'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ModalDescriptionProps = ComponentProps<typeof BaseDialog.Description>;
export const ModalDescription = createComponentPart(
  BaseDialog.Description,
  'tr-modal-description',
);
