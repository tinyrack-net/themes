'use client';

import {
  type ButtonHTMLAttributes,
  createContext,
  forwardRef,
  type HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type TabsActivationMode,
  type TabsChangeDetail,
  type TabsOrientation,
  type TabsSize,
  tabsChangeEventName,
  tabsClassName,
  tabsContract,
  tabsListClassName,
  tabsPanelClassName,
  tabsTriggerClassName,
} from './contract.js';
import { createTabsManager } from './dom.js';

export type { TabsActivationMode, TabsOrientation, TabsSize } from './contract.js';

type TabsContextValue = {
  baseId: string;
  orientation: TabsOrientation;
  size: TabsSize;
  value: string;
};

type TabsBaseProps = HTMLAttributes<HTMLDivElement> & {
  activationMode?: TabsActivationMode;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  size?: TabsSize;
};

export type TabsProps =
  | (TabsBaseProps & { defaultValue?: never; value: string })
  | (TabsBaseProps & { defaultValue: string; value?: never });

export type TabsListProps = HTMLAttributes<HTMLDivElement>;
export type TabsTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  value: string;
};
export type TabsPanelProps = HTMLAttributes<HTMLDivElement> & { value: string };

const TabsContext = createContext<TabsContextValue | null>(null);
const focusableTabPanelProps = { tabIndex: 0 } as const;

function mergeClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

function normalizeIdPart(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tab'
  );
}

function idsForValue(baseId: string, value: string) {
  const idPart = normalizeIdPart(value);
  return { panelId: `${baseId}-panel-${idPart}`, tabId: `${baseId}-tab-${idPart}` };
}

function useTabsContext(name: string) {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error(`${name} must be used within Tabs.`);
  }
  return context;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    activationMode = tabsContract.defaultActivationMode,
    className,
    defaultValue,
    onValueChange,
    orientation = tabsContract.defaultOrientation,
    size = tabsContract.defaultSize,
    value,
    ...props
  },
  forwardedRef,
) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? value ?? '',
  );
  const currentValue = controlled ? value : uncontrolledValue;
  const setRootRef = useCallback(
    (element: HTMLDivElement | null) => {
      rootRef.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef !== null) {
        forwardedRef.current = element;
      }
    },
    [forwardedRef],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) {
      return;
    }
    const manager = createTabsManager(root);
    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<TabsChangeDetail>).detail;
      if (detail.root !== root) {
        return;
      }
      if (!controlled) {
        setUncontrolledValue(detail.value);
      }
      onValueChange?.(detail.value);
    };
    root.addEventListener(tabsChangeEventName, handleChange);
    return () => {
      root.removeEventListener(tabsChangeEventName, handleChange);
      manager.destroy();
    };
  }, [controlled, onValueChange]);

  const context = useMemo(
    () => ({ baseId, orientation, size, value: currentValue }),
    [baseId, currentValue, orientation, size],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        {...props}
        className={mergeClassNames(tabsClassName, className)}
        data-activation-mode={activationMode}
        data-orientation={orientation}
        data-size={size}
        data-tr-tabs="true"
        data-value={currentValue}
        ref={setRootRef}
      />
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, ...props },
  ref,
) {
  const { orientation, size } = useTabsContext('TabsList');
  return (
    <div
      {...props}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={mergeClassNames(tabsListClassName, className)}
      data-orientation={orientation}
      data-size={size}
      ref={ref}
      role="tablist"
    />
  );
});

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ className, disabled, type = 'button', value, ...props }, ref) {
    const context = useTabsContext('TabsTrigger');
    const selected = context.value === value;
    const { panelId, tabId } = idsForValue(context.baseId, value);
    const disabledState =
      disabled || props['aria-disabled'] === true || props['aria-disabled'] === 'true';
    return (
      <button
        {...props}
        aria-controls={panelId}
        aria-selected={selected}
        className={mergeClassNames(tabsTriggerClassName, className)}
        data-active={selected ? 'true' : 'false'}
        data-value={value}
        disabled={disabled}
        id={tabId}
        ref={ref}
        role="tab"
        tabIndex={selected && !disabledState ? 0 : -1}
        type={type}
      />
    );
  },
);

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { className, value, ...props },
  ref,
) {
  const context = useTabsContext('TabsPanel');
  const selected = context.value === value;
  const { panelId, tabId } = idsForValue(context.baseId, value);
  return (
    <div
      {...props}
      {...focusableTabPanelProps}
      aria-labelledby={tabId}
      className={mergeClassNames(tabsPanelClassName, className)}
      data-active={selected ? 'true' : 'false'}
      data-value={value}
      hidden={!selected}
      id={panelId}
      ref={ref}
      role="tabpanel"
    />
  );
});
