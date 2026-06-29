import type { ReactElement } from 'react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TinyrackMantineProvider } from '../../mantine/index.js';
import { daisyUiShowcaseEntries } from '../daisyui-showcase.js';
import { mantineShowcaseEntries } from '../mantine-showcase.js';
import { getShowcaseStories, getShowcaseStory } from '../scenarios.js';
import type { ShowcaseLibrary, ShowcaseStoryKind } from '../types.js';

const oldUniversalScenarioIds = [
  'preview',
  'composition',
  'tokens',
  'accessibility',
  'playground',
] as const;

const storyKinds: ShowcaseStoryKind[] = [
  'default',
  'variants',
  'sizes',
  'states',
  'examples',
];

const allEntries = [
  ...mantineShowcaseEntries.map((entry) => ({ entry, library: 'mantine' as const })),
  ...daisyUiShowcaseEntries.map((entry) => ({ entry, library: 'daisyui' as const })),
];

function renderStory(library: ShowcaseLibrary, render: () => ReactElement) {
  function StoryRender() {
    return render();
  }

  return renderToStaticMarkup(
    library === 'mantine'
      ? createElement(TinyrackMantineProvider, null, createElement(StoryRender))
      : createElement(StoryRender),
  );
}

function getEntryStoryIds(entryId: string, library: ShowcaseLibrary) {
  const entries =
    library === 'mantine' ? mantineShowcaseEntries : daisyUiShowcaseEntries;
  const entry = entries.find((entry) => entry.id === entryId);

  if (!entry) {
    throw new Error(`Expected ${entryId} showcase entry to exist`);
  }

  return getShowcaseStories({ entry, library }).map((story) => story.id);
}

describe('component showcase stories', () => {
  it('returns a default story for every component entry', () => {
    for (const { entry, library } of allEntries) {
      const stories = getShowcaseStories({ entry, library });

      expect(stories.map((story) => story.id)).toContain('default');
    }
  });

  it('does not return old universal scenario ids', () => {
    for (const { entry, library } of allEntries) {
      const storyIds = getShowcaseStories({ entry, library }).map((story) => story.id);

      for (const oldScenarioId of oldUniversalScenarioIds) {
        expect(storyIds).not.toContain(oldScenarioId);
      }

      for (const storyId of storyIds) {
        expect(storyKinds).toContain(storyId);
      }
    }
  });

  it('includes curated story kinds for selected core components', () => {
    const expectedStories: Array<{
      entryId: string;
      library: ShowcaseLibrary;
      storyIds: ShowcaseStoryKind[];
    }> = [
      {
        entryId: 'mantine-button',
        library: 'mantine',
        storyIds: ['default', 'variants', 'sizes', 'states'],
      },
      {
        entryId: 'mantine-textinput',
        library: 'mantine',
        storyIds: ['default', 'states', 'sizes'],
      },
      {
        entryId: 'mantine-alert',
        library: 'mantine',
        storyIds: ['default', 'variants', 'states'],
      },
      {
        entryId: 'mantine-card',
        library: 'mantine',
        storyIds: ['default', 'examples'],
      },
      {
        entryId: 'mantine-table',
        library: 'mantine',
        storyIds: ['default', 'examples'],
      },
      {
        entryId: 'daisyui-button',
        library: 'daisyui',
        storyIds: ['default', 'variants', 'sizes', 'states'],
      },
      {
        entryId: 'daisyui-input',
        library: 'daisyui',
        storyIds: ['default', 'states', 'sizes'],
      },
      {
        entryId: 'daisyui-alert',
        library: 'daisyui',
        storyIds: ['default', 'variants', 'states'],
      },
      {
        entryId: 'daisyui-card',
        library: 'daisyui',
        storyIds: ['default', 'examples'],
      },
      {
        entryId: 'daisyui-navbar',
        library: 'daisyui',
        storyIds: ['default', 'examples'],
      },
    ];

    for (const { entryId, library, storyIds } of expectedStories) {
      expect(getEntryStoryIds(entryId, library)).toEqual(storyIds);
    }
  });

  it('keeps every component within the generated story budget', () => {
    for (const { entry, library } of allEntries) {
      expect(getShowcaseStories({ entry, library }).length).toBeLessThanOrEqual(4);
    }
  });

  it('keeps at least half of entries on low-noise default or variants stories', () => {
    const lowNoiseEntryCount = allEntries.filter(({ entry, library }) => {
      const storyIds = getShowcaseStories({ entry, library }).map((story) => story.id);

      return (
        storyIds.length <= 2 &&
        storyIds.every((storyId) => storyId === 'default' || storyId === 'variants')
      );
    }).length;

    expect(lowNoiseEntryCount).toBeGreaterThanOrEqual(Math.ceil(allEntries.length / 2));
  });

  it('renders meaningful button variants and states stories', () => {
    const entries = [
      {
        entry: mantineShowcaseEntries.find((entry) => entry.id === 'mantine-button'),
        library: 'mantine' as const,
      },
      {
        entry: daisyUiShowcaseEntries.find((entry) => entry.id === 'daisyui-button'),
        library: 'daisyui' as const,
      },
    ];

    for (const { entry, library } of entries) {
      if (!entry) {
        throw new Error(`Expected ${library} button showcase entry to exist`);
      }

      const variants = getShowcaseStory({ entry, library, storyKind: 'variants' });
      const states = getShowcaseStory({ entry, library, storyKind: 'states' });
      const variantsContent = renderStory(library, variants.render).toLowerCase();
      const statesContent = renderStory(library, states.render).toLowerCase();

      expect(variantsContent).toContain('button');
      expect(variantsContent).toContain('variants');
      expect(statesContent).toContain('button');
      expect(statesContent).toContain('states');
    }
  });

  it('renders non-empty content for every returned story', () => {
    for (const { entry, library } of allEntries) {
      for (const story of getShowcaseStories({ entry, library })) {
        const content = renderStory(library, story.render);

        expect(story.name.length).toBeGreaterThan(0);
        expect(story.description.length).toBeGreaterThan(0);
        expect(content.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
