import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorProps = ComponentProps<'hr'> & {
  orientation?: SeparatorOrientation;
};

export function Separator({
  className,
  orientation = 'horizontal',
  role = orientation === 'vertical' ? 'separator' : undefined,
  ...props
}: SeparatorProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={mergeClassNames('tr-separator', className)}
      data-orientation={orientation}
      role={role}
    />
  );
}
