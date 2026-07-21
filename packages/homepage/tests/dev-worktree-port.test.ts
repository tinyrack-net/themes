import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import {
  assignWorktreePorts,
  buildDevCommandArgs,
  parseWorktreePaths,
  selectWorktreePort,
} from '../scripts/dev-worktree.js';

const homepageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(homepageRoot, '../..');
const temporaryDirectories: string[] = [];

function temporaryDirectory() {
  const directory = mkdtempSync(join(tmpdir(), 'tinyrack-dev-port-'));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

describe('worktree development ports', () => {
  it('routes root and homepage development through the worktree-aware entrypoint', () => {
    const rootPackageJson = JSON.parse(
      readFileSync(join(workspaceRoot, 'package.json'), 'utf8'),
    ) as {
      scripts: Record<string, string>;
    };
    const homepagePackageJson = JSON.parse(
      readFileSync(join(homepageRoot, 'package.json'), 'utf8'),
    ) as {
      scripts: Record<string, string>;
    };

    expect(rootPackageJson.scripts['dev']).toBe('pnpm --filter @tinyrack/homepage dev');
    expect(homepagePackageJson.scripts['dev']).toBe('node scripts/dev-worktree.ts');
    expect(homepagePackageJson.scripts['dev:app']).toBe(
      'cross-env NODE_OPTIONS=--conditions=@tinyrack/source react-router dev',
    );
  });

  it('parses only worktree paths from porcelain output', () => {
    const firstOutput = [
      'worktree /workspace/main',
      'HEAD abc123',
      'branch refs/heads/main',
      '',
      'worktree /workspace/nested/feature',
      'HEAD def456',
      'branch refs/heads/feature',
      '',
    ].join('\0');
    const renamedOutput = firstOutput.replaceAll(
      'refs/heads/feature',
      'refs/heads/renamed',
    );

    expect(parseWorktreePaths(firstOutput)).toEqual([
      '/workspace/main',
      '/workspace/nested/feature',
    ]);
    expect(parseWorktreePaths(renamedOutput)).toEqual(parseWorktreePaths(firstOutput));
  });

  it('assigns stable unique ports regardless of worktree-list order', () => {
    const paths = ['/workspace/main', '/workspace/feature', '/workspace/nested/docs'];
    const forward = assignWorktreePorts(paths);
    const reverse = assignWorktreePorts([...paths].reverse());
    const featurePath = paths[1];

    if (!featurePath) {
      throw new Error('Expected a feature worktree fixture');
    }

    expect(new Set(forward.values())).toHaveLength(paths.length);
    expect([...forward]).toEqual([...reverse]);
    expect(selectWorktreePort(featurePath, paths)).toBe(forward.get(featurePath));
    expect(selectWorktreePort(featurePath, paths)).toBe(
      selectWorktreePort(featurePath, paths),
    );
  });

  it('resolves hash collisions deterministically within the configured range', () => {
    const rangeSize = 3;
    const pathsByOffset = new Map<number, string[]>();

    for (let index = 0; index < 20; index += 1) {
      const path = `/workspace/collision-${index}`;
      const offset =
        createHash('sha256').update(path).digest().readUInt32BE(0) % rangeSize;
      const paths = pathsByOffset.get(offset) ?? [];
      paths.push(path);
      pathsByOffset.set(offset, paths);
    }

    const collision = [...pathsByOffset.values()].find((paths) => paths.length >= 2);
    if (!collision) {
      throw new Error('Expected the test paths to include a hash collision');
    }
    const paths = collision.slice(0, 2);
    const assignments = assignWorktreePorts(paths, {
      endPort: 40_002,
      startPort: 40_000,
    });

    expect(new Set(assignments.values())).toHaveLength(2);
    expect(assignments).toEqual(
      assignWorktreePorts([...paths].reverse(), { endPort: 40_002, startPort: 40_000 }),
    );
  });

  it('falls back to the current checkout when no worktree list is available', () => {
    expect(selectWorktreePort('/workspace/archive', [])).toBe(
      assignWorktreePorts(['/workspace/archive']).get('/workspace/archive'),
    );
  });

  it('preserves explicit port overrides and forwards other arguments', () => {
    expect(buildDevCommandArgs(['--host', '127.0.0.1'], 12_345)).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--host',
      '127.0.0.1',
      '--port',
      '12345',
    ]);
    expect(buildDevCommandArgs(['--port', '4173'], 12_345)).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--port',
      '4173',
    ]);
    expect(buildDevCommandArgs(['--port=4173'], 12_345)).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--port=4173',
    ]);
    expect(buildDevCommandArgs(['--', '--port', '4173'], 12_345)).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--port',
      '4173',
    ]);
  });

  it('invokes the existing homepage dev command with the selected port', () => {
    const directory = temporaryDirectory();
    const fakePackageManager = join(directory, 'pnpm.cjs');
    const invocationPath = join(directory, 'invocation.json');
    writeFileSync(
      fakePackageManager,
      "require('node:fs').writeFileSync(process.env.INVOCATION_PATH, JSON.stringify(process.argv.slice(2)))",
    );

    execFileSync(
      process.execPath,
      [join(homepageRoot, 'scripts/dev-worktree.ts'), '--host', '127.0.0.1'],
      {
        cwd: workspaceRoot,
        env: {
          ...process.env,
          INVOCATION_PATH: invocationPath,
          npm_execpath: fakePackageManager,
        },
      },
    );

    const args = JSON.parse(readFileSync(invocationPath, 'utf8')) as string[];
    expect(args.slice(0, 5)).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--host',
      '127.0.0.1',
    ]);
    expect(args.at(-2)).toBe('--port');
    expect(Number(args.at(-1))).toBe(
      selectWorktreePort(
        workspaceRoot,
        parseWorktreePaths(
          execFileSync('git', ['worktree', 'list', '--porcelain', '-z'], {
            cwd: workspaceRoot,
            encoding: 'utf8',
          }),
        ),
      ),
    );
  });

  it('executes a native package-manager entrypoint directly', () => {
    const directory = temporaryDirectory();
    const fakePackageManager = join(directory, 'pnpm');
    const invocationPath = join(directory, 'invocation.txt');
    writeFileSync(
      fakePackageManager,
      `#!/bin/sh\nprintf '%s\\n' "$@" > "${invocationPath}"\n`,
    );
    chmodSync(fakePackageManager, 0o755);

    execFileSync(
      process.execPath,
      [join(homepageRoot, 'scripts/dev-worktree.ts'), '--port=4173'],
      {
        cwd: workspaceRoot,
        env: { ...process.env, npm_execpath: fakePackageManager },
      },
    );

    expect(readFileSync(invocationPath, 'utf8').trim().split('\n')).toEqual([
      '--filter',
      '@tinyrack/homepage',
      'dev:app',
      '--port=4173',
    ]);
  });
});
