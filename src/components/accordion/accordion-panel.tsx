'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type AccordionPanelProps = ComponentProps<typeof BaseAccordion.Panel>;
export const AccordionPanel = createComponentPart(
  BaseAccordion.Panel,
  'tr-accordion-content tr-disclosure-content',
);
