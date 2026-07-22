import type { ComponentPropsWithRef } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';
import type { TRControlUiSize } from '../../core/tokens/control-metrics.js';

export type TRTextareaUiSize = TRControlUiSize;
export type TRTextareaProps = ComponentPropsWithRef<'textarea'> & {
  uiSize?: TRTextareaUiSize;
};

export function TRTextarea({ className, uiSize = 'md', ...props }: TRTextareaProps) {
  return (
    <textarea
      {...props}
      className={mergeClassNames('tr-textarea', className)}
      data-ui-size={uiSize}
    />
  );
}
