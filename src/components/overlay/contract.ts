export const modalClassName = 'tr-modal';
export const modalBoxClassName = 'tr-modal-box';
export const modalHeaderClassName = 'tr-modal-header';
export const modalTitleClassName = 'tr-modal-title';
export const modalDescriptionClassName = 'tr-modal-description';
export const modalBodyClassName = 'tr-modal-body';
export const modalActionClassName = 'tr-modal-action';
export const modalBackdropClassName = 'tr-modal-backdrop';
export const layerClassName = 'tr-layer';

export const modalPlacements = ['top', 'middle', 'bottom', 'start', 'end'] as const;
export const modalSizes = ['sm', 'md', 'lg', 'full'] as const;
export const layerModes = ['auto', 'manual', 'hint'] as const;
export const layerPlacements = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const;

export type ModalPlacement = (typeof modalPlacements)[number];
export type ModalSize = (typeof modalSizes)[number];
export type LayerMode = (typeof layerModes)[number];
export type LayerPlacement = (typeof layerPlacements)[number];

export type OverlayOpenChangeReason =
  | 'trigger'
  | 'escape'
  | 'backdrop'
  | 'close-button'
  | 'programmatic'
  | 'native-dismiss'
  | 'modal-open'
  | 'ancestor-close'
  | 'anchor-detached';

export type OverlayOpenChangeDetail = {
  open: boolean;
  overlay: HTMLElement;
  reason: OverlayOpenChangeReason;
  source: HTMLElement | null;
};

export const overlayBeforeChangeEventName = 'tinyrack:overlay-beforechange' as const;
export const overlayChangeEventName = 'tinyrack:overlay-change' as const;

export const overlayContract = {
  defaultLayerCollisionPadding: 8,
  defaultLayerMode: 'auto',
  defaultLayerOffset: 8,
  defaultLayerPlacement: 'bottom-start',
  defaultModalPlacement: 'middle',
  defaultModalSize: 'md',
} as const satisfies {
  defaultLayerCollisionPadding: number;
  defaultLayerMode: LayerMode;
  defaultLayerOffset: number;
  defaultLayerPlacement: LayerPlacement;
  defaultModalPlacement: ModalPlacement;
  defaultModalSize: ModalSize;
};
