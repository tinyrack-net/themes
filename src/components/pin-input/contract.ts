export const pinInputClassName = 'tr-pin-input';
export const pinInputDigitClassName = 'tr-pin-input-digit';

export const pinInputChangeEventName = 'tinyrack:pin-input-change' as const;
export const pinInputCompleteEventName = 'tinyrack:pin-input-complete' as const;

export const pinInputContract = {
  defaultLength: 6,
} as const;

export type PinInputChangeDetail = {
  complete: boolean;
  value: string;
};
