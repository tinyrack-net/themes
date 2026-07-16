'use client';

import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import type { ComponentProps } from 'react';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type AvatarShape = 'circle' | 'square';
export type AvatarUiSize = 'sm' | 'md' | 'lg';
export type AvatarRootProps = ComponentProps<typeof BaseAvatar.Root> & {
  shape?: AvatarShape;
  uiSize?: AvatarUiSize;
};

export function AvatarRoot({
  className,
  shape = 'circle',
  uiSize = 'md',
  ...props
}: AvatarRootProps) {
  return (
    <BaseAvatar.Root
      {...props}
      className={mergeComponentClassName('tr-avatar', className)}
      data-shape={shape}
      data-ui-size={uiSize}
    />
  );
}
