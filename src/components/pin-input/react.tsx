'use client';

import {
  type FieldsetHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  type PinInputChangeDetail,
  pinInputChangeEventName,
  pinInputClassName,
  pinInputCompleteEventName,
  pinInputContract,
  pinInputDigitClassName,
} from './contract.js';
import { createPinInputManager, type PinInputManager } from './dom.js';

export type PinInputRef = {
  clear: () => void;
  focus: () => void;
};

export type PinInputProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'defaultValue' | 'onChange'
> & {
  autoFocus?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  getDigitLabel?: (index: number, length: number) => string;
  invalid?: boolean;
  length?: number;
  name?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  value?: string;
};

function mergeClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const PinInput = forwardRef<PinInputRef, PinInputProps>(function PinInput(
  {
    autoFocus = false,
    className,
    defaultValue = '',
    disabled = false,
    getDigitLabel = (index, length) => `Digit ${index + 1} of ${length}`,
    invalid = false,
    length = pinInputContract.defaultLength,
    name,
    onChange,
    onComplete,
    value: controlledValue,
    ...props
  },
  forwardedRef,
) {
  const rootRef = useRef<HTMLFieldSetElement | null>(null);
  const managerRef = useRef<PinInputManager | null>(null);
  const controlledRef = useRef(controlledValue);
  const onChangeRef = useRef(onChange);
  const onCompleteRef = useRef(onComplete);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = (controlledValue ?? uncontrolledValue)
    .replace(/\D/g, '')
    .slice(0, length);
  controlledRef.current = controlledValue;
  onChangeRef.current = onChange;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) {
      return;
    }
    const manager = createPinInputManager(root);
    managerRef.current = manager;

    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<PinInputChangeDetail>).detail;
      if (controlledRef.current === undefined) {
        setUncontrolledValue(detail.value);
      }
      onChangeRef.current?.(detail.value);
    };
    const handleComplete = (event: Event) => {
      onCompleteRef.current?.(
        (event as CustomEvent<PinInputChangeDetail>).detail.value,
      );
    };
    root.addEventListener(pinInputChangeEventName, handleChange);
    root.addEventListener(pinInputCompleteEventName, handleComplete);
    return () => {
      root.removeEventListener(pinInputChangeEventName, handleChange);
      root.removeEventListener(pinInputCompleteEventName, handleComplete);
      manager.destroy();
      managerRef.current = null;
    };
  }, []);

  useEffect(() => {
    managerRef.current?.setValue(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      managerRef.current?.focus();
    }
  }, [autoFocus, disabled]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      clear() {
        managerRef.current?.clear();
      },
      focus() {
        managerRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <fieldset
      {...props}
      aria-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      className={mergeClassNames(pinInputClassName, className)}
      data-invalid={invalid ? 'true' : undefined}
      data-length={length}
      data-tr-pin-input="true"
      disabled={disabled}
      ref={rootRef}
    >
      {Array.from({ length }, (_, index) => (
        <input
          aria-label={getDigitLabel(index, length)}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          className={pinInputDigitClassName}
          data-index={index}
          data-tr-pin-input-digit="true"
          disabled={disabled}
          inputMode="numeric"
          key={getDigitLabel(index, length)}
          maxLength={1}
          onChange={() => undefined}
          pattern="[0-9]*"
          type="text"
          value={value[index] ?? ''}
        />
      ))}
      {name === undefined ? null : (
        <input
          data-tr-pin-input-hidden="true"
          name={name}
          readOnly
          type="hidden"
          value={value}
        />
      )}
    </fieldset>
  );
});
