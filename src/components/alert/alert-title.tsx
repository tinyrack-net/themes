import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type AlertTitleProps = ComponentProps<'h2'>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <h2 {...props} className={mergeClassNames('tr-alert-title', className)} />;
}
