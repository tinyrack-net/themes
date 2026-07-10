export const avatarClassName = 'tr-avatar';
export const avatarSizes = ['sm', 'md', 'lg'] as const;
export const avatarShapes = ['circle', 'square'] as const;

export type AvatarSize = (typeof avatarSizes)[number];
export type AvatarShape = (typeof avatarShapes)[number];

export const avatarContract = {
  defaultShape: 'circle',
  defaultSize: 'md',
} as const satisfies {
  defaultShape: AvatarShape;
  defaultSize: AvatarSize;
};
