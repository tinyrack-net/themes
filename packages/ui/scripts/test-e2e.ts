import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const pnpm = process.platform === 'win32' ? 'pnpm.exe' : 'pnpm';

function run(command: string, args: string[]) {
  execFileSync(command, args, { cwd: packageRoot, stdio: 'inherit' });
}

function usesPrebuiltOutput() {
  if (process.env['TINYRACK_TEST_PREBUILT'] !== 'true') return false;
  if (!existsSync(resolve(packageRoot, 'dist/core.css'))) {
    throw new Error('Prebuilt UI output is missing core.css');
  }
  return true;
}

if (!usesPrebuiltOutput()) run(pnpm, ['build']);
run(pnpm, [
  'exec',
  'vitest',
  'run',
  '--mode',
  'component-coverage',
  '--project',
  'browser',
  '--coverage',
]);
run(pnpm, [
  'exec',
  'vitest',
  'run',
  '--mode',
  'component-firefox',
  '--project',
  'browser',
]);
run(process.execPath, ['e2e/dist-package-smoke.ts']);
