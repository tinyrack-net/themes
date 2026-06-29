import { daisyUiShowcaseEntries } from './daisyui-showcase.js';
import { mantineShowcaseEntries } from './mantine-showcase.js';
import { getShowcaseStory } from './scenarios.js';
import type {
  ShowcaseEntry,
  ShowcaseLibrary,
  ShowcaseScenarioId,
  ShowcaseStoryKind,
} from './types.js';

function ShowcaseCard({
  entry,
  library,
  scenarioId,
  storyKind,
}: {
  entry: ShowcaseEntry;
  library: ShowcaseLibrary;
  scenarioId?: ShowcaseScenarioId;
  storyKind?: ShowcaseStoryKind;
}) {
  const story = getShowcaseStory({
    entry,
    library,
    storyKind: storyKind ?? scenarioId,
  });

  return (
    <article
      className="tinyrack-showcase-card"
      data-showcase-component={entry.name}
      data-showcase-entry-id={entry.id}
      data-showcase-library={library}
      data-showcase-scenario={story.id}
      data-showcase-story-kind={story.id}
    >
      <header className="tinyrack-showcase-card__header">
        <div>
          <p className="tinyrack-showcase-card__category">
            {entry.category} · {story.name}
          </p>
          <h3>{entry.name}</h3>
        </div>
        <code>
          {entry.id}#{story.id}
        </code>
      </header>
      <div className="tinyrack-showcase-card__preview">{story.render()}</div>
      <p className="tinyrack-showcase-card__description">{story.description}</p>
    </article>
  );
}

export function SingleShowcaseStory({
  entry,
  library,
  scenarioId,
  storyKind,
}: {
  entry: ShowcaseEntry;
  library: ShowcaseLibrary;
  scenarioId?: ShowcaseScenarioId;
  storyKind?: ShowcaseStoryKind;
}) {
  return (
    <section className="tinyrack-showcase-single">
      <ShowcaseCard
        entry={entry}
        library={library}
        scenarioId={scenarioId}
        storyKind={storyKind}
      />
    </section>
  );
}

export function ShowcaseGallery({
  entries,
  library,
  title,
  description,
}: {
  entries: ShowcaseEntry[];
  library: ShowcaseLibrary;
  title: string;
  description: string;
}) {
  return (
    <section className="tinyrack-showcase">
      <header className="tinyrack-showcase__header">
        <p className="tinyrack-showcase__eyebrow">{library}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <strong>{entries.length} previews</strong>
      </header>
      <div className="tinyrack-showcase__grid">
        {entries.map((entry) => (
          <ShowcaseCard key={entry.id} entry={entry} library={library} />
        ))}
      </div>
    </section>
  );
}

export function MantineShowcaseGallery() {
  return (
    <ShowcaseGallery
      description="Every Mantine Core component selected for Tinyrack theme review is rendered below and covered by browser-mode tests."
      entries={mantineShowcaseEntries}
      library="mantine"
      title="Mantine components"
    />
  );
}

export function DaisyUiShowcaseGallery() {
  return (
    <ShowcaseGallery
      description="Every daisyUI component shipped in daisyUI 5.5 is rendered below and covered by browser-mode tests."
      entries={daisyUiShowcaseEntries}
      library="daisyui"
      title="daisyUI components"
    />
  );
}
