import type { ComponentPropsWithRef } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type TextareaUiSize = 'sm' | 'md' | 'lg';
export type TextareaProps = ComponentPropsWithRef<'textarea'> & {
  uiSize?: TextareaUiSize;
};

export function Textarea({ className, uiSize = 'md', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={mergeClassNames('tr-textarea', className)}
      data-ui-size={uiSize}
    />
  );
}
