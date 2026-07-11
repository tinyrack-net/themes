export const menuClassName = 'tr-menu';
export const menuContentClassName = 'tr-menu-content';
export const menuItemClassName = 'tr-menu-item';
export const menuLabelClassName = 'tr-menu-label';
export const menuSeparatorClassName = 'tr-menu-separator';
export const menuLeadingClassName = 'tr-menu-leading';

export const menuSelectEventName = 'tinyrack:menu-select' as const;

export type MenuSelectDetail = {
  item: HTMLElement;
  value: string | null;
};
