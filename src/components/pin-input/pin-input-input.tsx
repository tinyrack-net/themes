'use client';

import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type PinInputInputProps = ComponentProps<typeof BaseOTPField.Input>;
export const PinInputInput = createComponentPart(
  BaseOTPField.Input,
  'tr-pin-input-digit',
);
