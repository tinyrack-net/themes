import { MenuItem } from './menu-item.js';
import { MenuPopup } from './menu-popup.js';
import { MenuPortal } from './menu-portal.js';
import { MenuPositioner } from './menu-positioner.js';
import { MenuRoot } from './menu-root.js';
import { MenuSeparator } from './menu-separator.js';
import { MenuSubmenu } from './menu-submenu.js';
import { MenuTrigger } from './menu-trigger.js';

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Item: MenuItem,
  Separator: MenuSeparator,
  Submenu: MenuSubmenu,
} as const;

export type { MenuItemProps } from './menu-item.js';
export type { MenuPopupProps } from './menu-popup.js';
export type { MenuPortalProps } from './menu-portal.js';
export type { MenuPositionerProps } from './menu-positioner.js';
export type { MenuRootProps } from './menu-root.js';
export type { MenuSeparatorProps } from './menu-separator.js';
export type { MenuSubmenuProps } from './menu-submenu.js';
export type { MenuTriggerProps } from './menu-trigger.js';
export {
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuSubmenu,
  MenuTrigger,
};
