import type { ReactNode } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';
import { ShikiCodeBlock } from '../../src/components/code-block/shiki-react.js';
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from '../../src/components/tabs/react.js';
import { mergeClassNames } from '../../src/mdx/shared.js';

export type ComponentExampleSource = {
  code: string;
  label: string;
  language: BundledLanguage;
};

export type ComponentExampleTabsProps = {
  ariaLabel?: string;
  description?: ReactNode;
  preview: ReactNode;
  previewClassName?: string;
  sources: readonly ComponentExampleSource[];
  title: string;
};

const sourceOrder = new Map([
  ['React', 0],
  ['HTML', 1],
]);
const formattableSourceLanguages = new Set<BundledLanguage>(['html', 'jsx', 'tsx']);

function sourceValue(label: string) {
  return `source-${label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;
}

function orderedSources(sources: readonly ComponentExampleSource[]) {
  return [...sources].sort((firstSource, secondSource) => {
    const firstOrder = sourceOrder.get(firstSource.label) ?? Number.MAX_SAFE_INTEGER;
    const secondOrder = sourceOrder.get(secondSource.label) ?? Number.MAX_SAFE_INTEGER;

    return firstOrder - secondOrder;
  });
}

function closesBlock(line: string) {
  return line.startsWith('</') || /^\)+\}?;?$/.test(line);
}

function opensExpressionBlock(line: string) {
  return /\bmap\([^)]*\)\s*=>\s*\($/.test(line) || /=>\s*\($/.test(line);
}

function opensMarkupBlock(line: string) {
  if (!line.startsWith('<') || line.startsWith('</') || line.startsWith('<!')) {
    return false;
  }

  if (/\/>\s*;?$/.test(line)) {
    return false;
  }

  const tagName = line.match(/^<([A-Za-z][\w.:]*)\b/)?.[1];

  if (tagName === undefined) {
    return false;
  }

  return !line.includes(`</${tagName}>`);
}

function formatNestedMarkupSource(code: string) {
  let depth = 0;

  return code
    .split('\n')
    .map((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine.length === 0) {
        return '';
      }

      if (closesBlock(trimmedLine)) {
        depth = Math.max(0, depth - 1);
      }

      const formattedLine = `${'  '.repeat(depth)}${trimmedLine}`;

      if (opensExpressionBlock(trimmedLine) || opensMarkupBlock(trimmedLine)) {
        depth += 1;
      }

      return formattedLine;
    })
    .join('\n');
}

function normalizeCode(code: string, language: BundledLanguage) {
  const trimmedCode = code.replace(/^\n+|\n+$/g, '');

  if (!formattableSourceLanguages.has(language)) {
    return trimmedCode;
  }

  return formatNestedMarkupSource(trimmedCode);
}

export function ComponentExampleTabs({
  ariaLabel,
  description,
  preview,
  previewClassName,
  sources,
  title,
}: ComponentExampleTabsProps) {
  const sortedSources = orderedSources(sources);

  return (
    <section className="my-6 grid min-w-0 gap-3" data-component-example="">
      <div className="grid gap-1">
        <h3 className="m-0 text-tinyrack-lg font-semibold leading-tinyrack-sm">
          {title}
        </h3>
        {description === undefined ? null : (
          <p className="m-0 text-tinyrack-sm leading-tinyrack-md text-tinyrack-text-muted">
            {description}
          </p>
        )}
      </div>
      <Tabs
        aria-label={ariaLabel ?? `${title} example`}
        className="min-w-0"
        data-component-example-tabs=""
        defaultValue="preview"
        size="sm"
      >
        <TabsList aria-label={ariaLabel ?? `${title} example tabs`}>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {sortedSources.map((source) => (
            <TabsTrigger key={source.label} value={sourceValue(source.label)}>
              {source.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsPanel value="preview">
          <div
            className={mergeClassNames(
              'grid min-w-0 gap-4 overflow-x-auto',
              previewClassName,
            )}
          >
            {preview}
          </div>
        </TabsPanel>
        {sortedSources.map((source) => (
          <TabsPanel key={source.label} value={sourceValue(source.label)}>
            <ShikiCodeBlock
              code={normalizeCode(source.code, source.language)}
              language={source.language}
            />
          </TabsPanel>
        ))}
      </Tabs>
    </section>
  );
}
