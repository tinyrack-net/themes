'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ModalCloseProps = ComponentProps<typeof BaseDialog.Close>;
export const ModalClose = createComponentPart(BaseDialog.Close, 'tr-modal-close');
