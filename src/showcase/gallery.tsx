import { daisyUiShowcaseEntries } from './daisyui-showcase.js';
import { mantineShowcaseEntries } from './mantine-showcase.js';
import type { ShowcaseEntry, ShowcaseLibrary } from './types.js';

function ShowcaseCard({
  entry,
  library,
}: {
  entry: ShowcaseEntry;
  library: ShowcaseLibrary;
}) {
  return (
    <article
      className="tinyrack-showcase-card"
      data-showcase-component={entry.name}
      data-showcase-library={library}
    >
      <header className="tinyrack-showcase-card__header">
        <div>
          <p className="tinyrack-showcase-card__category">{entry.category}</p>
          <h3>{entry.name}</h3>
        </div>
        <code>{entry.id}</code>
      </header>
      <div className="tinyrack-showcase-card__preview">{entry.render()}</div>
      <p className="tinyrack-showcase-card__description">{entry.description}</p>
    </article>
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
