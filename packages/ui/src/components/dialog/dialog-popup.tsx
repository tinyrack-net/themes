'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type DialogPlacement = 'middle' | 'top' | 'bottom' | 'start' | 'end';
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';
type BaseDialogPopupProps = Omit<ComponentProps<typeof BaseDialog.Popup>, 'size'>;
type SizedDialogPopupProps = BaseDialogPopupProps & {
  placement?: Exclude<DialogPlacement, 'top' | 'bottom'>;
  size?: DialogSize;
};
type EdgeDialogPopupProps = BaseDialogPopupProps & {
  placement: 'top' | 'bottom';
  size?: never;
};
export type DialogPopupProps = SizedDialogPopupProps | EdgeDialogPopupProps;

export function DialogPopup({
  className,
  placement = 'middle',
  size = 'md',
  ...props
}: DialogPopupProps) {
  return (
    <BaseDialog.Popup
      {...props}
      className={mergeComponentClassName('tr-dialog tr-dialog-box', className)}
      data-placement={placement}
      data-size={placement === 'top' || placement === 'bottom' ? undefined : size}
    />
  );
}
