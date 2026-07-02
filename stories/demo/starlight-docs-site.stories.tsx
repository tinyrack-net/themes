import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../src/astro/starlight/theme.css';
import '../../src/showcase/showcase.css';

function StarlightDocsSite() {
  return (
    <main
      className="tinyrack-demo-page tinyrack-starlight-demo"
      data-demo-starlight="true"
    >
      <div className="tinyrack-starlight-shell">
        <aside className="tinyrack-starlight-sidebar">
          <div className="tinyrack-demo-brand">
            <span className="tinyrack-demo-brand-mark">TR</span>
            <div>
              <strong>Tinyrack Docs</strong>
              <span>Starlight theme</span>
            </div>
          </div>
          <nav className="tinyrack-starlight-nav" aria-label="Docs navigation">
            <a href="#start" aria-current="page">
              Getting started
            </a>
            <a href="#adapters">Adapters</a>
            <a href="#tokens">Tokens</a>
            <a href="#deploy">Deploy</a>
          </nav>
        </aside>

        <article className="tinyrack-starlight-content">
          <header className="tinyrack-starlight-topbar">
            <span className="tinyrack-demo-muted">Documentation</span>
            <div className="tinyrack-starlight-search">Search docs</div>
          </header>

          <section>
            <h1>Build with Tinyrack themes</h1>
            <p>
              Starlight keeps the documentation structure while the Tinyrack adapter
              applies brand color, type, neutral surfaces, and code block contrast.
            </p>
          </section>

          <aside className="tinyrack-starlight-callout">
            <strong>Recommended path</strong>
            <p>
              Install the package, wrap Starlight config with the Tinyrack helper, then
              keep site-specific overrides in local global CSS.
            </p>
          </aside>

          <section>
            <h2>Configuration</h2>
            <pre className="tinyrack-starlight-code">{`import starlight from '@astrojs/starlight';
import { withTinyrackStarlightTheme } from '@tinyrack/themes/astro/starlight';

starlight(
  withTinyrackStarlightTheme({
    title: 'Docs',
    customCss: ['./src/styles/global.css'],
  }),
);`}</pre>
          </section>

          <section className="tinyrack-demo-grid">
            <div className="tinyrack-demo-panel tinyrack-demo-panel--wide">
              <h2>Content checks</h2>
              <p>
                Long prose, inline links, code samples, and callouts should keep enough
                contrast without making the docs feel like a product dashboard.
              </p>
            </div>
            <div className="tinyrack-demo-panel tinyrack-demo-panel--side">
              <h2>Theme tokens</h2>
              <p>Accent: --sl-color-accent</p>
              <p>Surface: --sl-color-black</p>
              <p>Text: --sl-color-gray-1</p>
            </div>
          </section>
        </article>

        <aside className="tinyrack-starlight-toc">
          <h2>On this page</h2>
          <nav aria-label="Table of contents">
            <a href="#start">Build with themes</a>
            <a href="#configuration">Configuration</a>
            <a href="#checks">Content checks</a>
          </nav>
        </aside>
      </div>
    </main>
  );
}

const meta = {
  title: 'Demo/Starlight Docs Site',
  component: StarlightDocsSite,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StarlightDocsSite>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
