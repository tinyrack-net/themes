'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type TooltipTriggerProps = ComponentProps<typeof BaseTooltip.Trigger>;
export const TooltipTrigger = createComponentPart(BaseTooltip.Trigger, 'tr-tooltip');
