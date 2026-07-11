export const comboboxClassName = 'tr-combobox';
export const comboboxInputClassName = 'tr-combobox-input';
export const comboboxContentClassName = 'tr-combobox-content';
export const comboboxListClassName = 'tr-combobox-list';
export const comboboxOptionClassName = 'tr-combobox-option';
export const comboboxEmptyClassName = 'tr-combobox-empty';

export const comboboxModes = ['select', 'freeform'] as const;
export type ComboboxMode = (typeof comboboxModes)[number];

export const comboboxValueChangeEventName = 'tinyrack:combobox-change' as const;
export const comboboxInputChangeEventName = 'tinyrack:combobox-input-change' as const;

export type ComboboxValueChangeReason = 'input' | 'option' | 'blur';

export type ComboboxValueChangeDetail = {
  inputValue: string;
  option: HTMLElement | null;
  reason: ComboboxValueChangeReason;
  value: string;
};

export type ComboboxInputChangeDetail = {
  inputValue: string;
};

export const comboboxContract = {
  defaultAutoSelectOnBlur: false,
  defaultMode: 'select' as ComboboxMode,
  defaultPlacement: 'bottom-start' as const,
} as const;
