import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerProps = ComponentProps<'hr'> & {
  orientation?: DividerOrientation;
};

export function Divider({
  className,
  orientation = 'horizontal',
  role = orientation === 'vertical' ? 'separator' : undefined,
  ...props
}: DividerProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={mergeClassNames('tr-divider', className)}
      data-orientation={orientation}
      role={role}
    />
  );
}
