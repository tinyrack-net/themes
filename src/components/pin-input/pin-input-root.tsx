'use client';

import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type PinInputRootProps = ComponentProps<typeof BaseOTPField.Root>;
export const PinInputRoot = createComponentPart(BaseOTPField.Root, 'tr-pin-input');
