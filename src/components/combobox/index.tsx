import { ComboboxEmpty } from './combobox-empty.js';
import { ComboboxInput } from './combobox-input.js';
import { ComboboxItem } from './combobox-item.js';
import { ComboboxList } from './combobox-list.js';
import { ComboboxPopup } from './combobox-popup.js';
import { ComboboxPortal } from './combobox-portal.js';
import { ComboboxPositioner } from './combobox-positioner.js';
import { ComboboxRoot } from './combobox-root.js';
import { ComboboxTrigger } from './combobox-trigger.js';

export const Combobox: {
  Root: typeof ComboboxRoot;
  Input: typeof ComboboxInput;
  Trigger: typeof ComboboxTrigger;
  Portal: typeof ComboboxPortal;
  Positioner: typeof ComboboxPositioner;
  Popup: typeof ComboboxPopup;
  List: typeof ComboboxList;
  Item: typeof ComboboxItem;
  Empty: typeof ComboboxEmpty;
} = {
  Root: ComboboxRoot,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  Portal: ComboboxPortal,
  Positioner: ComboboxPositioner,
  Popup: ComboboxPopup,
  List: ComboboxList,
  Item: ComboboxItem,
  Empty: ComboboxEmpty,
} as const;

export type { ComboboxEmptyProps } from './combobox-empty.js';
export type { ComboboxInputProps } from './combobox-input.js';
export type { ComboboxItemProps } from './combobox-item.js';
export type { ComboboxListProps } from './combobox-list.js';
export type { ComboboxPopupProps } from './combobox-popup.js';
export type { ComboboxPortalProps } from './combobox-portal.js';
export type { ComboboxPositionerProps } from './combobox-positioner.js';
export type { ComboboxRootProps } from './combobox-root.js';
export type { ComboboxTriggerProps } from './combobox-trigger.js';
export {
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
};
