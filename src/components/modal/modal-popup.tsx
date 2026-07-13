'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type ModalPlacement = 'middle' | 'top' | 'bottom' | 'start' | 'end';
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';
export type ModalPopupProps = ComponentProps<typeof BaseDialog.Popup> & {
  placement?: ModalPlacement;
  size?: ModalSize;
};

export function ModalPopup({
  className,
  placement = 'middle',
  size = 'md',
  ...props
}: ModalPopupProps) {
  return (
    <BaseDialog.Popup
      {...props}
      className={mergeComponentClassName('tr-modal tr-modal-box', className)}
      data-placement={placement}
      data-size={size}
    />
  );
}
