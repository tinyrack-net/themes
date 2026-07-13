'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type ModalPortalProps = ComponentProps<typeof BaseDialog.Portal>;
export const ModalPortal = createComponentPart(BaseDialog.Portal);
