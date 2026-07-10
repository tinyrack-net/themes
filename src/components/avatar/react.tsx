import { forwardRef, type HTMLAttributes } from 'react';
import {
  type AvatarShape,
  type AvatarSize,
  avatarClassName,
  avatarContract,
} from './contract.js';

export type { AvatarShape, AvatarSize } from './contract.js';

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  shape?: AvatarShape;
  size?: AvatarSize;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    className,
    shape = avatarContract.defaultShape,
    size = avatarContract.defaultSize,
    ...avatarProps
  },
  ref,
) {
  return (
    <span
      {...avatarProps}
      className={mergeClassNames(avatarClassName, className)}
      data-shape={shape}
      data-size={size}
      ref={ref}
    />
  );
});
