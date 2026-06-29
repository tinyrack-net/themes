import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export function StarlightEnvironmentFixture() {
  return (
    <main
      className="tinyrack-environment-page"
      data-environment="starlight"
      data-testid="environment-starlight"
    >
      <section className="tinyrack-environment-header">
        <div>
          <p className="tinyrack-environment-eyebrow">ENVIRONMENT SMOKE · Starlight</p>
          <h1 className="tinyrack-environment-title">Astro Starlight docs</h1>
          <p className="tinyrack-environment-description">
            A compact docs shell for validating Tinyrack tokens in sidebar, prose,
            links, callouts, and code examples.
          </p>
        </div>
        <div className="tinyrack-environment-pill-row">
          <span className="tinyrack-environment-pill">Astro</span>
          <span className="tinyrack-environment-pill">Starlight</span>
          <span className="tinyrack-environment-pill">Tinyrack CSS</span>
        </div>
      </section>

      <section className="tinyrack-environment-panel tinyrack-environment-starlight-layout">
        <aside className="tinyrack-environment-starlight-sidebar">
          <div className="tinyrack-environment-starlight-logo">Tinyrack Docs</div>
          <nav className="tinyrack-environment-starlight-nav" aria-label="Docs">
            <a href="#environment-smoke" aria-current="page">
              Environment smoke
            </a>
            <a href="#tokens">Tokens</a>
            <a href="#adapters">Adapters</a>
            <a href="#deployment">Deployment</a>
          </nav>
        </aside>
        <article className="tinyrack-environment-starlight-content">
          <div>
            <p className="tinyrack-environment-eyebrow">Guide</p>
            <h2 id="environment-smoke">Theme adapters without drift</h2>
          </div>
          <p>
            Use the Starlight adapter to keep documentation surfaces aligned with app
            UI. Review the <a href="#tokens">token reference</a> and adapter notes
            before publishing.
          </p>
          <div className="tinyrack-environment-callout" role="note">
            <strong>Smoke check</strong>
            <span>
              Sidebar, content rhythm, link color, and callout contrast should stay
              readable in Tinyrack light and dark themes.
            </span>
          </div>
          <h3 id="tokens">Install</h3>
          <pre className="tinyrack-environment-code">
            <code>{`import starlight from '@astrojs/starlight';
import { tinyrackStarlightTheme } from '@tinyrack/themes/astro/starlight';`}</code>
          </pre>
        </article>
      </section>
    </main>
  );
}

export function MantineTailwindEnvironmentFixture() {
  return (
    <main
      className="tinyrack-environment-page"
      data-environment="mantine-tailwind"
      data-testid="environment-mantine-tailwind"
    >
      <section className="tinyrack-environment-header">
        <div>
          <p className="tinyrack-environment-eyebrow">
            ENVIRONMENT SMOKE · Mantine + Tailwind
          </p>
          <h1 className="tinyrack-environment-title">Product surface</h1>
          <p className="tinyrack-environment-description">
            Real Mantine components nested in Tailwind-friendly layout classes for
            validating provider, theme variables, and utility composition.
          </p>
        </div>
        <div className="tinyrack-environment-pill-row">
          <span className="tinyrack-environment-pill">@mantine/core</span>
          <span className="tinyrack-environment-pill">Tailwind</span>
        </div>
      </section>

      <section className="tinyrack-environment-panel tinyrack-environment-mantine-grid">
        <Stack gap="md" className="tinyrack-environment-preview-stack">
          <Alert color="tinyrack" title="Adapter online">
            Mantine colors, radii, focus states, and typography are available in this
            smoke page.
          </Alert>
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group justify="space-between" align="start" mb="md">
              <div>
                <Title order={2}>Workspace provisioning</Title>
                <Text c="dimmed" size="sm">
                  Tailwind utilities frame the page while Mantine renders the controls.
                </Text>
              </div>
              <Badge color="tinyrack" variant="light">
                Healthy
              </Badge>
            </Group>
            <Stack gap="sm">
              <TextInput
                label="Environment name"
                placeholder="production-eu"
                defaultValue="tinyrack-preview"
              />
              <Group justify="flex-end">
                <Button variant="default">Cancel</Button>
                <Button color="tinyrack">Create environment</Button>
              </Group>
            </Stack>
          </Card>
        </Stack>

        <aside className="tinyrack-environment-mantine-note">
          <h2>Mantine smoke targets</h2>
          <p>
            Button, TextInput, Card, Alert, Badge, Group, and Stack render from
            @mantine/core while the surrounding shell uses Tinyrack CSS tokens.
          </p>
        </aside>
      </section>
    </main>
  );
}

export function DaisyUiTailwindEnvironmentFixture() {
  return (
    <main
      className="tinyrack-environment-page"
      data-environment="daisyui-tailwind"
      data-testid="environment-daisyui-tailwind"
    >
      <section className="tinyrack-environment-header">
        <div>
          <p className="tinyrack-environment-eyebrow">
            ENVIRONMENT SMOKE · daisyUI + Tailwind
          </p>
          <h1 className="tinyrack-environment-title">Operations console</h1>
          <p className="tinyrack-environment-description">
            daisyUI components and Tailwind utilities share Tinyrack theme variables for
            action, card, alert, input, and badge surfaces.
          </p>
        </div>
        <div className="tinyrack-environment-pill-row">
          <span className="tinyrack-environment-pill">daisyUI</span>
          <span className="tinyrack-environment-pill">Tailwind</span>
        </div>
      </section>

      <section className="tinyrack-environment-panel tinyrack-environment-daisy-grid">
        <div className="tinyrack-environment-preview-stack">
          <div className="alert alert-info shadow-sm">
            <span>Theme variables loaded across daisyUI primitives.</span>
          </div>

          <div className="card tinyrack-environment-daisy-preview shadow-xl">
            <div className="card-body gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="card-title">Release channel</h2>
                  <p className="text-sm opacity-70">
                    Tailwind utilities compose around daisyUI classes.
                  </p>
                </div>
                <span className="badge badge-primary">stable</span>
              </div>
              <label className="form-control w-full">
                <span className="label-text mb-2">Endpoint</span>
                <input
                  className="input input-bordered w-full"
                  defaultValue="api.tinyrack.local"
                  aria-label="Endpoint"
                />
              </label>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" type="button">
                  Deploy worker
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="tinyrack-environment-daisy-note">
          <h2>daisyUI smoke targets</h2>
          <p>
            This fixture keeps btn btn-primary, card, alert, input, badge, and Tailwind
            utility classes visible to Storybook environment audits.
          </p>
        </aside>
      </section>
    </main>
  );
}
