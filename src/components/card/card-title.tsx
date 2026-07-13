import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type CardTitleProps = ComponentProps<'h2'>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h2 {...props} className={mergeClassNames('tr-card-title', className)} />;
}
