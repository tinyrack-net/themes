import { PinInputInput } from './pin-input-input.js';
import { PinInputRoot } from './pin-input-root.js';

export const PinInput = {
  Root: PinInputRoot,
  Input: PinInputInput,
} as const;

export type { PinInputInputProps } from './pin-input-input.js';
export type { PinInputRootProps } from './pin-input-root.js';
export { PinInputInput, PinInputRoot };
