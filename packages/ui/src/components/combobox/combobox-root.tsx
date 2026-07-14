'use client';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type { ReactElement } from 'react';

export type ComboboxRootProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> = BaseCombobox.Root.Props<Value, Multiple>;

export function ComboboxRoot<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxRootProps<Value, Multiple>,
): ReactElement {
  return <BaseCombobox.Root<Value, Multiple> {...props} />;
}
