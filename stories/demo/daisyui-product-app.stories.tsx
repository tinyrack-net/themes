import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../src/showcase/showcase.css';

function DaisyUiProductApp() {
  const deployments = [
    ['web-prod', 'v42.18', 'Ready', '3 min ago'],
    ['api-prod', 'v18.04', 'Rolling', '8 min ago'],
    ['docs-prod', 'v7.11', 'Ready', '21 min ago'],
  ];

  return (
    <main className="tinyrack-demo-page" data-demo-daisyui="true">
      <div className="tinyrack-demo-shell">
        <aside className="tinyrack-demo-sidebar">
          <div className="tinyrack-demo-brand">
            <span className="tinyrack-demo-brand-mark">TR</span>
            <div>
              <strong>Tinyrack</strong>
              <span>Deployments</span>
            </div>
          </div>
          <ul className="menu tinyrack-demo-nav" aria-label="daisyUI demo navigation">
            <li>
              <a href="#overview" aria-current="page">
                Overview
              </a>
            </li>
            <li>
              <a href="#deployments">Deployments</a>
            </li>
            <li>
              <a href="#traffic">Traffic</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
          </ul>
          <div className="tinyrack-demo-sidebar-note">
            daisyUI classes inherit Tinyrack colors from the active data-theme.
          </div>
        </aside>

        <section className="tinyrack-demo-main">
          <header className="tinyrack-demo-header">
            <div>
              <div className="badge badge-primary badge-outline">
                daisyUI product app
              </div>
              <h1>Deployment workspace</h1>
              <p>
                A Tailwind and daisyUI surface showing nav, stats, tables, alerts,
                forms, progress, and action density under Tinyrack themes.
              </p>
            </div>
            <div className="tinyrack-demo-header-actions">
              <button className="btn btn-ghost" type="button">
                Export
              </button>
              <button className="btn btn-primary" type="button">
                New deploy
              </button>
            </div>
          </header>

          <section className="tinyrack-demo-grid">
            {[
              ['Active services', '14', '+2 this week'],
              ['Build minutes', '6.8k', '82% allocated'],
              ['Open incidents', '1', 'checkout latency'],
              ['Edge regions', '9', 'all synced'],
            ].map(([label, value, note]) => (
              <article className="tinyrack-demo-kpi" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small className="tinyrack-demo-muted">{note}</small>
              </article>
            ))}

            <section className="tinyrack-demo-panel tinyrack-demo-panel--wide">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2>Recent deployments</h2>
                  <p>Table, badge, status, and row density in one product surface.</p>
                </div>
                <div className="join">
                  <button className="btn btn-xs join-item btn-active" type="button">
                    Prod
                  </button>
                  <button className="btn btn-xs join-item" type="button">
                    Preview
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deployments.map(([service, version, status, updated]) => (
                      <tr key={service}>
                        <td>{service}</td>
                        <td>
                          <code>{version}</code>
                        </td>
                        <td>
                          <span
                            className={
                              status === 'Ready'
                                ? 'badge badge-success badge-soft'
                                : 'badge badge-warning badge-soft'
                            }
                          >
                            {status}
                          </span>
                        </td>
                        <td>{updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="tinyrack-demo-panel tinyrack-demo-panel--side">
              <h2>Traffic shift</h2>
              <div role="alert" className="alert alert-warning alert-soft">
                <span>Canary is paused until latency returns below 40 ms.</span>
              </div>
              <progress className="progress progress-primary" value="64" max="100" />
              <label className="form-control w-full">
                <span className="label-text">Target service</span>
                <input
                  className="input input-bordered input-primary"
                  defaultValue="api-prod"
                />
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
                <span>Require review before 100%</span>
              </label>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: 'Demo/daisyUI Product App',
  component: DaisyUiProductApp,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DaisyUiProductApp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
