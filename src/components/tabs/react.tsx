import {
  type ButtonHTMLAttributes,
  createContext,
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';
import {
  type TabsActivationMode,
  type TabsOrientation,
  type TabsSize,
  tabsClassName,
  tabsContract,
  tabsListClassName,
  tabsPanelClassName,
  tabsTriggerClassName,
} from './contract.js';

export type {
  TabsActivationMode,
  TabsOrientation,
  TabsSize,
} from './contract.js';

type TabsContextValue = {
  activationMode: TabsActivationMode;
  baseId: string;
  orientation: TabsOrientation;
  setValue: (value: string) => void;
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
  | (TabsBaseProps & {
      defaultValue?: never;
      value: string;
    })
  | (TabsBaseProps & {
      defaultValue: string;
      value?: never;
    });

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export type TabsTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  value: string;
};

export type TabsPanelProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);
const focusableTabPanelProps = { tabIndex: 0 } as const;

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function normalizeIdPart(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'tab';
}

function idsForValue(baseId: string, value: string) {
  const idPart = normalizeIdPart(value);

  return {
    panelId: `${baseId}-panel-${idPart}`,
    tabId: `${baseId}-tab-${idPart}`,
  };
}

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error(`${componentName} must be used within Tabs.`);
  }

  return context;
}

function enabledTabsFrom(tab: HTMLButtonElement) {
  const tabList = tab.closest('[role="tablist"]');

  if (tabList === null) {
    return [];
  }

  return Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]')).filter(
    (candidate) =>
      !candidate.disabled && candidate.getAttribute('aria-disabled') !== 'true',
  );
}

function focusTabByOffset(
  event: KeyboardEvent<HTMLButtonElement>,
  offset: number,
  activateOnFocus: boolean,
  setValue: (value: string) => void,
) {
  const tabs = enabledTabsFrom(event.currentTarget);
  const currentIndex = tabs.indexOf(event.currentTarget);

  if (currentIndex === -1 || tabs.length === 0) {
    return;
  }

  event.preventDefault();

  const nextIndex = (currentIndex + offset + tabs.length) % tabs.length;
  const nextTab = tabs[nextIndex];

  nextTab?.focus();

  if (activateOnFocus) {
    const nextValue = nextTab?.getAttribute('data-value') ?? undefined;

    if (nextValue !== undefined) {
      setValue(nextValue);
    }
  }
}

function focusTabAtEdge(
  event: KeyboardEvent<HTMLButtonElement>,
  edge: 'first' | 'last',
  activateOnFocus: boolean,
  setValue: (value: string) => void,
) {
  const tabs = enabledTabsFrom(event.currentTarget);
  const nextTab = edge === 'first' ? tabs[0] : tabs.at(-1);

  if (nextTab === undefined) {
    return;
  }

  event.preventDefault();
  nextTab.focus();

  if (activateOnFocus) {
    const nextValue = nextTab.getAttribute('data-value') ?? undefined;

    if (nextValue !== undefined) {
      setValue(nextValue);
    }
  }
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
    ...tabsProps
  },
  ref,
) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? value ?? '',
  );
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const context = useMemo(
    () => ({
      activationMode,
      baseId,
      orientation,
      setValue,
      size,
      value: currentValue,
    }),
    [activationMode, baseId, currentValue, orientation, setValue, size],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        {...tabsProps}
        className={mergeClassNames(tabsClassName, className)}
        data-orientation={orientation}
        data-size={size}
        ref={ref}
      />
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, ...listProps },
  ref,
) {
  const { orientation, size } = useTabsContext('TabsList');

  return (
    <div
      {...listProps}
      aria-orientation={orientation === 'vertical' ? orientation : undefined}
      className={mergeClassNames(tabsListClassName, className)}
      data-orientation={orientation}
      data-size={size}
      ref={ref}
      role="tablist"
    />
  );
});

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      className,
      disabled,
      onClick,
      onKeyDown,
      type = 'button',
      value,
      ...triggerProps
    },
    ref,
  ) {
    const context = useTabsContext('TabsTrigger');
    const selected = context.value === value;
    const { panelId, tabId } = idsForValue(context.baseId, value);
    const ariaDisabled =
      triggerProps['aria-disabled'] === true ||
      triggerProps['aria-disabled'] === 'true';
    const disabledState = disabled === true || ariaDisabled;

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      onClick?.(event);

      if (!event.defaultPrevented && !disabledState) {
        context.setValue(value);
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented || disabledState) {
        return;
      }

      const activateOnFocus = context.activationMode === 'automatic';

      if (event.key === 'Home') {
        focusTabAtEdge(event, 'first', activateOnFocus, context.setValue);
        return;
      }

      if (event.key === 'End') {
        focusTabAtEdge(event, 'last', activateOnFocus, context.setValue);
        return;
      }

      if (
        context.orientation === 'horizontal' &&
        (event.key === 'ArrowRight' || event.key === 'ArrowLeft')
      ) {
        focusTabByOffset(
          event,
          event.key === 'ArrowRight' ? 1 : -1,
          activateOnFocus,
          context.setValue,
        );
        return;
      }

      if (
        context.orientation === 'vertical' &&
        (event.key === 'ArrowDown' || event.key === 'ArrowUp')
      ) {
        focusTabByOffset(
          event,
          event.key === 'ArrowDown' ? 1 : -1,
          activateOnFocus,
          context.setValue,
        );
        return;
      }

      if (
        context.activationMode === 'manual' &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        context.setValue(value);
      }
    }

    return (
      <button
        {...triggerProps}
        aria-controls={panelId}
        aria-selected={selected}
        className={mergeClassNames(tabsTriggerClassName, className)}
        data-active={selected ? 'true' : undefined}
        data-value={value}
        disabled={disabled}
        id={tabId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="tab"
        tabIndex={selected && !disabledState ? 0 : -1}
        type={type}
      />
    );
  },
);

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { className, value, ...panelProps },
  ref,
) {
  const context = useTabsContext('TabsPanel');
  const selected = context.value === value;
  const { panelId, tabId } = idsForValue(context.baseId, value);

  return (
    <div
      {...panelProps}
      {...focusableTabPanelProps}
      aria-labelledby={tabId}
      className={mergeClassNames(tabsPanelClassName, className)}
      data-active={selected ? 'true' : undefined}
      hidden={!selected}
      id={panelId}
      ref={ref}
      role="tabpanel"
    />
  );
});
